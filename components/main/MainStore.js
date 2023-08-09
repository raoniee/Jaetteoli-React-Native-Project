import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Location from "../../assets/images/Location";
import FillHeart from "../../assets/images/FillHeart";
import EmptyHeart from "../../assets/images/EmptyHeart";
import Color from "../../assets/colors/Color";
import { baseUrl, jwt } from "../../utils/baseUrl";
import { useEffect, useState } from "react";

const MainStore = ({ item, onPress }) => {
  const [heartFilled, setHeartFilled] = useState(false);
  useEffect(()=>{
    setHeartFilled(item.subscribed === 1)
  },[])

  let star;
  if (item.star <= 5.0 && item.star >= 4.0) {
    star = <FontAwesome name="star" style={styles.star} />;
  } else if (item.star < 4.0 && item.star >= 2.0) {
    star = <FontAwesome name="star-half-full" style={styles.star} />;
  } else {
    star = <FontAwesome name="star-o" style={styles.star} />;
  }

  const handleHeartClick = (storeIdx, heartFilled) => {
    const storeSubscribeApi = async () => {
      try {
        const postSubcribed = heartFilled ? 0 : 1;
        const requestBody = {
          storeIdx: storeIdx,
          yn: postSubcribed,
        };
        const response = await fetch(`${baseUrl}/jat/app/subscription`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": jwt,
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!data.isSuccess) {
          console.log(data.message);
          return;
        }
        // 하트 아이콘 상태를 토글하여 변경
        setHeartFilled(!heartFilled);
      } catch (err) {
        console.log(err);
      }
    };
    storeSubscribeApi(storeIdx, heartFilled);
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.subscribeItemContainer}>
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
                <Text style={styles.rating}>{item.star}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Location />
                <Text>
                  {item.distance}m {item.duration}분
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleHeartClick(item.storeIdx, heartFilled)}
            >
              {heartFilled ? <FillHeart /> : <EmptyHeart />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  subscribeItemContainer: {
    position: "absolute",
    top: 50,
    width: "88%",
    backgroundColor: Color.white,
    borderRadius: 30,
  },
  imgContainer: {
    flexDirection: "row",
  },
  firstImgContiner: {
    // width: 244,
    flex: 4,
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
    flex: 2,
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

export default MainStore;
