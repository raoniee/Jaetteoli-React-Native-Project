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
import { baseUrl } from "../../utils/baseUrl";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/Cookie";
import * as Locations from "expo-location";

const Subscribe = () => {
  const [initData, setInitData] = useState([]);
  const navigation = useNavigation();
  const myLocation = useSelector((state) => state.myAddress);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // 구독 가게 목록 api 호출
      const fetchData = async () => {
        try {
          const location = await Locations.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          const response = await fetch(

            `${baseUrl}/jat/app/subscription?longitude=${longitude}&latitude=${latitude}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": await getToken(),
              },
            }
          );
          const data = await response.json();
          if (!data.isSuccess) {
            return;
          }
          setInitData(data.result);
        } catch (err) {
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
          yn: postSubcribed,
        };
        const response = await fetch(`${baseUrl}/jat/app/subscription`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": await getToken(),
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!data.isSuccess) {
          return;
        }
      } catch (err) {
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
  };

  const moveToDetailStore = (storeIdx) => {
    navigation.navigate("StoreDetailPage", { storeIdx: storeIdx });
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
              <Pressable onPress={() => moveToDetailStore(item.storeIdx)}>
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
                          {item.distance}m 도보 {item.duration}분
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
    flex: 1,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 10,
  },
  flatContainer: {
    flex: 1,
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
