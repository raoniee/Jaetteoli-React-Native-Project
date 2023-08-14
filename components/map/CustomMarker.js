import { Image, Pressable, StyleSheet, Text } from "react-native";
import Color from "../../assets/colors/Color";
import MapMarker from "../../assets/images/MapMarker";
import { View } from "react-native";

const CustomMarker = ({ title, storeCategory }) => {
  let icon = <Image source={require("../../assets/images/Mart.png")} />;
  switch (storeCategory) {
    case 1: //백화점
      icon = (
        <Image source={require("../../assets/images/DepartmentStore.png")} />
      );
      break;
    case 2: //편의점
      icon = (
        <Image source={require("../../assets/images/ConvenienceStore.png")} />
      );
      break;
    case 3: //디저트
      icon = <Image source={require("../../assets/images/Dessert.png")} />;
      break;
    case 4: //샐러드
      icon = <Image source={require("../../assets/images/Salad.png")} />;
      break;
    case 5: //초밥
      icon = <Image source={require("../../assets/images/Sushi.png")} />;
      break;
    case 6: //카페
      icon = <Image source={require("../../assets/images/Coffee.png")} />;
      break;
    default: //대형마트
      icon = <Image source={require("../../assets/images/Mart.png")} />;
      break;
  }
  return (
    <Pressable>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        {/* <MapMarker /> */}
        {icon}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Pretendard-Bold",
    fontSize: 14,
    textAlign: "center",
    color: Color.purple,
  },
});

export default CustomMarker;
