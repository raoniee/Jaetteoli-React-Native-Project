import React from "react";
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
import Button from "../common/Button";
import LoginInput from "../login/LoginInput";

export default function PWSearch() {
  return (
    <>
      <View style={styles.input_box}>
        <LoginInput text="아이디" placeholder="아이디 입력" />
        <LoginInput text="휴대폰 번호" placeholder="-없이 휴대폰 번호 입력" />
      </View>
      <Button
        title="인증번호 받기"
        backgroundColor={Color.darkPurple}
        color={Color.white}
        margin="60 0 80 0"
        height={62}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input_box: {
    marginTop: 100, //
    width: 354,
  },
});
