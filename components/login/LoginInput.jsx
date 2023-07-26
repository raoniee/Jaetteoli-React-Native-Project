import React from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput } from "react-native";

export default function LoginInput(props) {
  return (
    <>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        returnKeyType="done"
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Color.brightGray,
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 20,
  },
});
