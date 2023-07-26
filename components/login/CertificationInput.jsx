import React from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CertificationInput() {
  return (
    <>
      <Text style={styles.label}>인증번호</Text>
      <View style={styles.input_wrap}>
        <TextInput
          style={styles.input}
          placeholder="인증번호 입력"
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <Text style={styles.timer}>02:36</Text>
      </View>
      <Text style={styles.resend}>인증번호 재전송</Text>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 20,
    marginBottom: 10,
  },
  input_wrap: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: Color.brightGray,
    width: 354,
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
  },
  timer: {
    position: "absolute",
    top: 22,
    right: 20,
    color: Color.red,
  },
  resend: {
    width: "100%",
    paddingLeft: 20,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 13,
    color: Color.gray,
    textDecorationLine: "underline",
    marginBottom: 50,
  },
});
