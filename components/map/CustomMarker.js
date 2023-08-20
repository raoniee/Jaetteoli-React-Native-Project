import { Image, Pressable, StyleSheet, Text } from "react-native";
import Color from "../../assets/colors/Color";
import MapMarker from "../../assets/images/MapMarker";
import { View } from "react-native";

const CustomMarker = ({ title, storeCategory }) => {
  let icon = <Image source={require("../../assets/images/Mart.png")} />;
  switch (storeCategory) {
    case 1: //백화점
      icon = <Image source={require("../../assets/images/DepartmentStore.png")} style={{width: 37, height: 46}} resizeMode="contain"/>;
      break;
    case 2: //편의점
      icon = <Image source={require("../../assets/images/ConvenienceStore.png")} style={{width: 37, height: 46}} resizeMode="contain"/>;
      break;
    case 3: //디저트
      icon = <Image source={require("../../assets/images/Dessert.png")} style={{width: 37, height: 46}} resizeMode="contain"/>;
      break;
    case 4: //샐러드
      icon = <Image source={require("../../assets/images/Salad.png")} style={{width: 37, height: 46}} resizeMode="contain"/>;
      break;
    case 5: //초밥
      icon = <Image source={require("../../assets/images/Sushi.png")} style={{width: 37, height: 46}} resizeMode="contain"/>;
      break;
    case 6: //카페
      icon = <Image source={require("../../assets/images/Coffee.png")} style={{width: 37, height: 46}} resizeMode="contain"/>;
      break;
    default: //대형마트
      icon = <Image source={require("../../assets/images/Mart.png")} style={{width: 37, height: 46}} resizeMode="contain"/>;
      break;
  }
  return (
    <Pressable>
      <View style={styles.container}>
        <Text style={[styles.text]}>{title}</Text>
        <Text style={[styles.text, styles.abs, {textShadowOffset: {width: -1, height: -1}}]}>{title}</Text>
        <Text style={[styles.text, styles.abs, {textShadowOffset: {width: -1, height: 1}}]}>{title}</Text>
        <Text style={[styles.text, styles.abs, {textShadowOffset: {width: 1, height: -1}}]}>{title}</Text>
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
    textShadowColor: 'white',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  abs: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }
});

export default CustomMarker;
