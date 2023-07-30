import { Image, Pressable, StyleSheet, Text } from "react-native";
import Color from "../../assets/colors/Color";
import MapMarker from "../../assets/images/MapMarker";

const CustomMarker = ({title}) => (

  <Pressable >
    <Text style={styles.text}>{title}</Text>
    <MapMarker />
  </Pressable>
);

const styles = StyleSheet.create({
    text:{
        fontFamily:'Pretendard',
        fontSize:14,
        textAlign:'center',
        color: Color.purple,
    }
})

export default CustomMarker;
