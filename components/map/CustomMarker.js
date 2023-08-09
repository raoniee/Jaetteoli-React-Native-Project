import { Image, Pressable, StyleSheet, Text } from "react-native";
import Color from "../../assets/colors/Color";
import MapMarker from "../../assets/images/MapMarker";
import { View } from "react-native";

const CustomMarker = ({ title }) => (
  <Pressable>
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <MapMarker />
    </View>
  </Pressable>
);

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
