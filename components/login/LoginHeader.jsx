import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
} from "react-native";
import Color from "../../assets/colors/Color";

export default function LoginHeader() {
  const [option, setOption] = useState(true);

  const id = () => setOption(true);
  const pw = () => setOption(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={id}>
        <Text
          style={{
            ...styles.search_option,
            color: option ? Color.black : Color.lightGray,
          }}
        >
          아이디 찾기
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pw}>
        <Text
          style={{
            ...styles.search_option,
            color: !option ? Color.black : Color.lightGray,
          }}
        >
          비밀번호 찾기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
    width: 354,
    height: 25,
  },
  search_option: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    width: 175,
    textAlign: "center",
  },
});
