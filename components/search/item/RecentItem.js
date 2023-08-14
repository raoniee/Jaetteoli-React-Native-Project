import { Pressable, StyleSheet, Text, View } from "react-native";
import Close from "../../../assets/images/Close";
import Color from "../../../assets/colors/Color";

const RecentItem = ({ item, onPress }) => {
  return (
    <View style={styles.recentSearchItem}>
      <Pressable onPress={() => onPress(item)}>
        <Text style={styles.recentItemText}>{item}</Text>
      </Pressable>
      <Close />
    </View>
  );
};

const styles = StyleSheet.create({
  recentSearchItem: {
    flexDirection: "row",
    backgroundColor: Color.lightPurple,
    paddingHorizontal: 12,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginRight: 5,
  },
  recentItemText: {
    fontFamily: "Pretendard",
    fontSize: 12,
    color: Color.darkGray,
  },
});

export default RecentItem;
