import React from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput } from "react-native";

export default function LoginInput(props) {
  return (
    <>
      <Text style={styles.label}>{props.text}</Text>
      <TextInput style={styles.input} placeholder={props.placeholder} />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Color.brightGray,
    width: 354,
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 15,
  },
});
