import { Image, StyleSheet, Text } from "react-native";
import Color from "../../assets/colors/Color";

const CustomMarker = ({title}) => (
  <>
    <Text style={styles.text}>{title}</Text>
    <Image
      source={require("../../assets/images/marker.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </>
);

const styles = StyleSheet.create({
    text:{
        fontFamily:'Pretendard',
        fontSize:14,
        textAlign:'center',
        color: Color.purple
    }
})

export default CustomMarker;
