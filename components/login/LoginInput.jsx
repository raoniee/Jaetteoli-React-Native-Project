import React, { useState } from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput } from "react-native";

export default function LoginInput(props) {
  const [text, setText] = useState("");

  return (
    <>
      <Text style={styles.label}>{props.label}</Text>
      {props.sublabel && <Text style={styles.sub_label}>{props.subtitle}</Text>}
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        returnKeyType="done"
        onChangeText={(payload) => {
          setText(payload);
          props.takeText(text);
        }}
        value={text}
      />
      {props.subinput && (
        <TextInput
          style={styles.input}
          placeholder={props.subplaceholder}
          keyboardType={props.keyboardType}
          returnKeyType="done"
          // onChangeText={(payload) => {
          //   setText(payload);
          //   props.takeText(text);
          // }}
          // value={text}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Color.gray,
    marginLeft: 20,
    marginBottom: 10,
  },
  sub_label: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Color.darkGray,
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
