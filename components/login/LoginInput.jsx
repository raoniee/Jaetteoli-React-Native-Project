import React, { useContext, useState } from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput } from "react-native";
import { MembershipContext } from "../../context/MembershipContext";

export default function LoginInput({
  label,
  sublabel,
  subtitle,
  placeholder,
  keyboardType,
  //InfoType,
  subinput,
  subplaceholder,
}) {
  //const { takeRusult, userInfo } = useContext(MembershipContext);
  const [text, setText] = useState("");

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      {sublabel && <Text style={styles.sub_label}>{subtitle}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType="done"
        //onChangeText={(text) => takeRusult({ InfoType, text })}
        // onSubmitEditing={() => {
        //   if (text === "") {
        //     return;
        //   }
        //   takeRusult(InfoType, text);
        // }}
        //value={text}
      />
      {subinput && (
        <TextInput
          style={styles.input}
          placeholder={subplaceholder}
          keyboardType={keyboardType}
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
