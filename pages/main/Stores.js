import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Color from "../../assets/colors/Color";
import { searchResultData } from "../../components/search/dummy/dummy";
import EmptyHeart from "../../assets/images/EmptyHeart";
import { FontAwesome } from "@expo/vector-icons"; // expo-vector-icons 라이브러리 필요
import Location from "../../assets/images/Location";
import FillHeart from "../../assets/images/FillHeart";
import Globe from "../../assets/images/Globe";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/baseUrl";
import { getToken } from "../../utils/Cookie";

const Stores = ({ navigation, route }) => {
  const mapLocation = useSelector((state) => state.mapAddress);
  const [inputText, setInputText] = useState(
    route.params !== undefined ? route.params.currentAddress : ""
  );
  const [initData, setInitData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const mapListApi = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/jat/app/stores?longitude=${mapLocation.longitude}&latitude=${mapLocation.latitude}`,
            {
              method: "GET",
              headers: {
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
      mapListApi();
      setInitData(searchResultData);
    }
  }, [isFocused]);

  useEffect(() => {
    if (route.params !== undefined) {
      setInputText(route.params.currentAddress);
    }
  }, [route.params]);

  const moveToMap = () => {
    navigation.navigate("Main", {
      currentAddress: route.params.currentAddress,
    });
  };

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
      <Header
        left={1}
        right={1}
        backgroundColor="white"
        title="목록보기"
        color={Color.lightGray}
      />
      <Pressable
        android_ripple={{ color: Color.lightPurple }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <View style={styles.storeContainer}>
          <View style={styles.locationImgContainer}>
            <Location stroke={Color.darkPurple} />
          </View>
          {inputText === "" ? (
            <Text style={styles.storeInputContainerLightGray}>검색하기</Text>
          ) : (
            <Text style={styles.storeInputContainer}>{inputText}</Text>
          )}
        </View>
      </Pressable>
      {/* 목록 */}

      <View style={styles.storeResultContainer}>
        <FlatList
          data={initData}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => {
            let star;
            if (item.star <= 5.0 && item.star >= 4.0) {
              star = <FontAwesome name="star" style={styles.star} />;
            } else if (item.star < 4.0 && item.star >= 2.0) {
              star = <FontAwesome name="star-half-full" style={styles.star} />;
            } else {
              star = <FontAwesome name="star-o" style={styles.star} />;
            }
            return (
              <Pressable onPress={() => moveToDetailStore(item.storeIdx)}>
                <View index={index} style={styles.storeItemContainer}>
                  <View style={styles.imgContainer}>
                    <View style={styles.firstImgContiner}>
                      <Image
                        source={{ uri: item.storeLogoUrl }}
                        resizeMode="stretch"
                        style={styles.firstImg}
                      />
                    </View>
                    <View style={styles.rightContiner}>
                      <View style={styles.secondImgContiner}>
                        <Image
                          source={{ uri: item.storeSignUrl }}
                          resizeMode="stretch"
                          style={styles.secondImg}
                        />
                      </View>
                      <View style={styles.thirdImgContainer}>
                        <Image
                          source={{ uri: item.storeSignUrl }}
                          resizeMode="stretch"
                          style={styles.thirdImg}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.resultBottomContainer}>
                    <View>
                      <View style={styles.menuContainer}>
                        <Text style={styles.menu}>{item.storeName}</Text>
                        {star}
                        <Text style={styles.rating}>{item.star}</Text>
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
        <TouchableOpacity style={styles.mapButton} onPress={moveToMap}>
          <Globe />
          <Text style={styles.mapButtonText}>지도보기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  storeContainer: {
    flexDirection: "row",
    marginHorizontal: 26,
    marginBottom: 20,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Color.white,
    ...Platform.select({
      ios: {
        shadowColor: Color.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  locationImgContainer: {
    marginLeft: 26,
    marginVertical: 10,
  },
  storeInputContainerLightGray: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: 500,
    color: Color.lightGray,
  },
  storeInputContainer: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: 500,
  },
  storeResultContainer: {
    marginBottom: 150,
  },
  storeItemContainer: {
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
  resultBottomContainer: {
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
  mapButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    left: 16,
    backgroundColor: Color.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 35,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },

  mapButtonText: {
    color: Color.black,
    fontFamily: "Pretendard",
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default Stores;
