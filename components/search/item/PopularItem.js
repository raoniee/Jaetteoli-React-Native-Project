import { StyleSheet, Text, View } from "react-native";
import RankUp from "../../../assets/images/RankUp";
import Color from "../../../assets/colors/Color";

const PopularItem = ({ item, index }) => {
  return (
    <View style={styles.popularSearchItem}>
      <View
        style={
          index < 3 ? styles.purple : styles.popularNumContainer
        }
      >
        <Text style={styles.popularNumText}>{index + 1}</Text>
      </View>
      <View style={styles.popularTextContainer}>
        <Text style={styles.poularText}>{item.name}</Text>
        <RankUp />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popularSearchItem: {
    flexDirection: "row",
    marginTop: 10.71,
    alignItems: "center",
  },
  popularNumContainer: {
    width: 34, // 원형 컨테이너의 너비
    height: 34, // 원형 컨테이너의 높이,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  purple: {
    width: 34, // 원형 컨테이너의 너비
    height: 34, // 원형 컨테이너의 높이,
    borderRadius: 60,
    backgroundColor: Color.lightPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  popularNumText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 14,
    textAlign: "center",
    color: Color.black,
  },
  popularTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 24,
  },
  poularText: {
    fontFamily: "Pretendard",
    fontSize: 14,
    color: Color.darkGray,
  },
});

export default PopularItem;
