import React, { useContext, useState } from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput } from "react-native";
import { MembershipContext } from "../../context/MembershipContext";
import { validateName } from "../../utils/useful-function";

export default function LoginInput({
  label,
  sublabel,
  subtitle,
  placeholder,
  keyboardType,
  InfoType,
  subinput,
  subplaceholder,
  alertresult,
  alerttext,
  vaildTest,
}) {
  const { takeRusult, userInfo } = useContext(MembershipContext);
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
        onChangeText={(text) => takeRusult({ InfoType, text })}
      />
      {!alertresult && <Text style={styles.inputalert}>{alerttext}</Text>}
      {subinput && (
        <TextInput
          style={styles.input}
          placeholder={subplaceholder}
          keyboardType={keyboardType}
          secureTextEntry={true}
          returnKeyType="done"
          onBlur={() => {
            if (userInfo.userpw !== text) {
              return setSame(false);
            } else {
              return setSame(true);
            }
          }}
          onChangeText={(text) => setText(text)}
          value={text}
        />
      )}
      {!same && subinput && (
        <Text style={styles.inputalert}>비밀번호가 일치하지 않습니다.</Text>
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
    marginBottom: 10,
  },
  inputalert: {
    color: Color.red,
    paddingLeft: 20,
    marginBottom: 20,
  },
});
