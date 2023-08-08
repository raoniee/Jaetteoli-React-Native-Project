import {
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Location from "../../assets/images/Location";
import FillHeart from "../../assets/images/FillHeart";
import EmptyHeart from "../../assets/images/EmptyHeart";
import Color from "../../assets/colors/Color";
import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { baseUrl, jwt } from "../../utils/baseUrl";
import { useSelector } from "react-redux";

const Subscribe = () => {
  const [initData, setInitData] = useState([]);
  const navigation = useNavigation();
  const myLocation = useSelector((state) => state.mapAddress);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // 구독 가게 목록 api 호출
      // console.log("구독 가게 목록 api 호출");
      const fetchData = async () => {
        try {
          console.log(
            `${baseUrl}/jat/app/subscription?longitude=${myLocation.longitude}&latitude=${myLocation.latitude}`
          );
          const response = await fetch(
            `${baseUrl}/jat/app/subscription?longitude=${myLocation.longitude}&latitude=${myLocation.latitude}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": jwt,
              },
            }
          );
          const data = await response.json();
          if (!data.isSuccess) {
            console.log(data.message);
            return;
          }
          // console.log(data.result);
          setInitData(data.result);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [isFocused]);

  const handleHeartClick = (storeIdx, subscribed) => {
    const storeSubscribeApi = async () => {
      try {
        const postSubcribed = subscribed === 1 ? 0 : 1;
        const requestBody = {
          storeIdx: storeIdx,
          yn: postSubcribed
        }
        console.log(`${baseUrl}/jat/app/subscription`);
        const response = await fetch(`${baseUrl}/jat/app/subscription`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": jwt,
          },
          body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (!data.isSuccess) {
          console.log(data.message);
          return;
        }
        console.log(data.result)
      } catch (err) {
        console.log(err);
      }
    };
    storeSubscribeApi(storeIdx, subscribed);
    setInitData((prevData) =>
      prevData.map((item) =>
        item.storeIdx === storeIdx
          ? { ...item, subscribed: item.subscribed === 1 ? 0 : 1 }
          : item
      )
    );
    // console.log(initData);

    // console.log(storeIdx);

    // Here, you can make the API call using axios.
    // For demonstration purposes, let's just log the API call.
    // console.log("API 호출: ", storeIdx);
  };

  const moveToDetailStore = () => {
    navigation.navigate("StoreDetailPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 목록 */}
      <View style={styles.subscribeContainer}>
        <View style={styles.header}>
          <Header
            left={0}
            right={1}
            backgroundColor="white"
            title="구독"
            color={Color.lightGray}
          />
        </View>

        <FlatList
          data={initData}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => {
            let star;
            if (item.starAvg <= 5.0 && item.starAvg >= 4.0) {
              star = <FontAwesome name="star" style={styles.star} />;
            } else if (item.starAvg < 4.0 && item.starAvg >= 2.0) {
              star = <FontAwesome name="star-half-full" style={styles.star} />;
            } else {
              star = <FontAwesome name="star-o" style={styles.star} />;
            }
            return (
              <Pressable onPress={moveToDetailStore}>
                <View
                  index={item.storeIdx}
                  style={styles.subscribeItemContainer}
                >
                  <View style={styles.imgContainer}>
                    <View style={styles.firstImgContiner}>
                      <Image
                        source={{ uri: `${item.storeLogoUrl}` }}
                        resizeMode="stretch"
                        style={styles.firstImg}
                      />
                    </View>
                    <View style={styles.rightContiner}>
                      <View style={styles.secondImgContiner}>
                        <Image
                          source={{ uri: `${item.storeSignUrl}` }}
                          resizeMode="stretch"
                          style={styles.secondImg}
                        />
                      </View>
                      <View style={styles.thirdImgContainer}>
                        <Image
                          source={{ uri: `${item.storeSignUrl}` }}
                          resizeMode="stretch"
                          style={styles.thirdImg}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.subscribeBottomContainer}>
                    <View>
                      <View style={styles.menuContainer}>
                        <Text style={styles.menu}>{item.storeName}</Text>
                        {star}
                        <Text style={styles.rating}>
                          {item.starAvg.toFixed(1)}
                        </Text>
                      </View>
                      <View style={styles.locationContainer}>
                        <Location />
                        <Text>
                          {item.distance}m {item.duration}분
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        handleHeartClick(item.storeIdx, item.subscribed)
                      }
                    >
                      {item.subscribed ? <FillHeart /> : <EmptyHeart />}
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  subscribeContainer: {
    marginBottom: 100,
  },
  header: {
    marginBottom: 10,
  },
  subscribeItemContainer: {
    marginHorizontal: 26,
    height: 250,
    marginBottom: 20,
  },
  imgContainer: {
    flexDirection: "row",
  },
  firstImgContiner: {
    width: 244,
    height: 170,
    marginRight: 2,
  },
  firstImg: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 30,
  },
  rightContiner: {
    flexDirection: "column",
    flex: 1,
  },
  secondImgContiner: {
    flex: 1,
    marginBottom: 2,
  },
  secondImg: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 30,
  },
  thirdImgContainer: {
    flex: 1,
  },
  thirdImg: {
    width: "100%",
    height: "100%",
  },
  subscribeBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Color.white,
    ...Platform.select({
      ios: {
        shadowColor: Color.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  menuContainer: {
    flexDirection: "row",
    paddingTop: 19,
  },
  menu: {
    color: Color.black,
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
  },
  star: {
    color: Color.yellow,
    marginLeft: 5,
    fontSize: 16,
  },
  rating: {
    color: Color.black,
    fontFamily: "Pretendard",
    fontSize: 14,
  },
  locationContainer: {
    marginTop: 5,
    marginBottom: 19,
    flexDirection: "row",
  },
});

export default Subscribe;
