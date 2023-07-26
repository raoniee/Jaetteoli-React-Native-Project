import { Image, StyleSheet, View } from "react-native";
import Color from "../../../assets/colors/Color";
import EmptyHeart from "../../../assets/images/EmptyHeart";
import { FontAwesome } from "@expo/vector-icons";

const ResultSearch = ({ item, index }) => {
  let star = null;
  if (item.rating <= 5.0 && item.rating >= 4.0) {
    star = <FontAwesome name="star" style={styles.star} />;
  } else if (item.rating < 4.0 && item.rating >= 2.0) {
    star = <FontAwesome name="star-half-full" style={styles.star} />;
  } else {
    star = <FontAwesome name="star-o" style={styles.star} />;
  }
  return (
    <View style={styles.searchResultItemContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.leftImageContainer}>
          <Image
            source={require("../dummy/image1.png")}
            resizeMode="contain"
            style={styles.firstImage}
          />
        </View>
        <View style={styles.rightImageContainer}>
          <View style={styles.secondImage}>
            {item.image2Available ? (
              <Image
                source={require("../dummy/image2.png")}
                resizeMode="contain"
              />
            ) : null}
          </View>
          <View style={styles.thirdImage}>
            {item.image4Available ? (
              <Image
                source={require("../dummy/image4.png")}
                resizeMode="contain"
              />
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View>
          <View style={styles.titleContainer}>
            <Text>{item.name}</Text>
            {star}
            <Text>{item.rating}</Text>
          </View>
          <Text>{item.distance}</Text>
        </View>
        <View>
          <EmptyHeart />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResultItemContainer: {
    flex:1,
    flexDirection: "column",
    borderWidth: 3,
    borderRadius: 30,
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: "row", // 가로 방향으로 배치
    flex: 4, // 전체 공간 중 4의 비율을 차지
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  leftImageContainer: {
    flex: 3, // 이미지 컨테이너 중 3의 비율을 차지
  },
  rightImageContainer: {
    flex: 1, // 이미지 컨테이너 중 1의 비율을 차지
  },
  firstImage: {
    flex: 1, // 이미지가 컨테이너를 가득 채우도록 설정
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  secondImage: {
    flex: 1,
  },
  thirdImage: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    borderColor: Color.gray,
  },
  star: {
    fontSize: 20,
    color: Color.yellow, // 별의 색상
  },
  titleContainer: {
    flexDirection: "row",
  },
});

export default ResultSearch;
