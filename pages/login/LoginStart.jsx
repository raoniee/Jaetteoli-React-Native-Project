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
import Button from "../components/common/Button";
import Color from "../assets/colors/Color";
import logo from "../assets/images/logo.png";
import GoMembership from "../components/login/GoMembership";

export default function LoginStart() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <TextInput style={styles.id_input} placeholder="아이디" />
      <TextInput style={styles.pw_input} placeholder="비밀번호" />
      <View style={styles.login_option}>
        <View style={styles.idsave_wrap}>
          <TouchableWithoutFeedback onPress={() => console.log("press!")}>
            <TextInput
              editable={false}
              style={styles.idsave_checkbox}
            ></TextInput>
          </TouchableWithoutFeedback>
          <Text style={styles.idsave_text}>아이디 저장</Text>
        </View>
        <View>
          <TouchableWithoutFeedback>
            <Text style={styles.searchgo}>아이디_비밀번호 찾기</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Button
        title="로그인"
        backgroundColor={Color.darkPurple}
        color={Color.white}
        margin="0 0 100 0"
        height={62}
      />
      <GoMembership />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: 353,
    marginTop: 140, //
    marginBottom: 165,
    marginHorizontal: 10, //
  },
  logo: {
    width: 87,
    height: 26,
    marginBottom: 50,
  },
  id_input: {
    backgroundColor: Color.brightGray,
    width: "100%",
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 15,
  },
  pw_input: {
    backgroundColor: Color.brightGray,
    width: "100%",
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 28.5,
  },
  login_option: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 50,
  },
  idsave_wrap: {
    flexDirection: "row",
  },
  idsave_checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.gray,
    marginLeft: 10,
    marginRight: 10,
  },
  idsave_text: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 13,
    color: Color.gray,
    lineHeight: 21,
  },
  searchgo: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 13,
    color: Color.gray,
    lineHeight: 21,
  },
});
