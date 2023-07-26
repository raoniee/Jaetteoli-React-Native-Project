import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Location from "../../assets/images/Location";
import FillHeart from "../../assets/images/FillHeart";
import EmptyHeart from "../../assets/images/EmptyHeart";
import { subscribeData } from "../../components/subscribe/dummy/dummy";
import Color from "../../assets/colors/Color";
import Header from "../../components/common/Header";

const Subscribe = () => {
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
          data={subscribeData}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => {
            let star;
            if (item.rating <= 5.0 && item.rating >= 4.0) {
              star = <FontAwesome name="star" style={styles.star} />;
            } else if (item.rating < 4.0 && item.rating >= 2.0) {
              star = <FontAwesome name="star-half-full" style={styles.star} />;
            } else {
              star = <FontAwesome name="star-o" style={styles.star} />;
            }
            return (
              <View index={index} style={styles.subscribeItemContainer}>
                <View style={styles.imgContainer}>
                  <View style={styles.firstImgContiner}>
                    <Image
                      source={require("../../components/orderhistory/dummy/image1.png")}
                      resizeMode="stretch"
                      style={styles.firstImg}
                    />
                  </View>
                  <View style={styles.rightContiner}>
                    <View style={styles.secondImgContiner}>
                      <Image
                        source={require("../../components/orderhistory/dummy/image2.png")}
                        resizeMode="stretch"
                        style={styles.secondImg}
                      />
                    </View>
                    <View style={styles.thirdImgContainer}>
                      <Image
                        source={require("../../components/orderhistory/dummy/image4.png")}
                        resizeMode="stretch"
                        style={styles.thirdImg}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.subscribeBottomContainer}>
                  <View>
                    <View style={styles.menuContainer}>
                      <Text style={styles.menu}>{item.name}</Text>
                      {star}
                      <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                    <View style={styles.locationContainer}>
                      <Location />
                      <Text>{item.distance}</Text>
                    </View>
                  </View>
                  <View>{item.like ? <FillHeart /> : <EmptyHeart />}</View>
                </View>
              </View>
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
