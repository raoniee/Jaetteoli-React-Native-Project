import React, { useContext, useState } from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput } from "react-native";

export default function SearchLoginInput({
  label,
  sublabel,
  subtitle,
  placeholder,
  keyboardType,
  alertresult,
  alerttext,
  vaildTest,
  takeresult,
  secureTextEntry,
}) {
  const [text, setText] = useState("");
  const [same, setSame] = useState(true);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      {sublabel && <Text style={styles.sub_label}>{subtitle}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType="done"
        onBlur={vaildTest}
        onChangeText={(text) => takeresult(text)}
        secureTextEntry={secureTextEntry}
      />
      {!alertresult && <Text style={styles.inputalert}>{alerttext}</Text>}
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
    marginBottom: 10,
  },
  inputalert: {
    color: Color.red,
    paddingLeft: 20,
    marginBottom: 10,
  },
});
