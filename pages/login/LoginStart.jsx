import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // 네비게이션 컨테이너
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Stack 네비게이션
import Button from "../../components/common/Button";
import Color from "../../assets/colors/Color";
import logo from "../../assets/images/logo.png";
import GoMembership from "../../components/login/GoMembership";
import Check from "../../assets/images/Check";

export default function LoginStart({ navigation }) {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [saveId, SetSaveId] = useState(false);

  const handleSaveId = () => SetSaveId((prev) => !prev);

  async function onClickLogin() {
    if (inputID.trim() === "" || inputID.trim() === "") {
      console.log("아이디또는 비밀번호를 입력해주세요.");
      return;
    }

    const requestBody = {
      uid: inputID,
      password: inputID,
    };

    console.log(requestBody);
    try {
      const response = await fetch(
        "https://www.insung.shop/jat/app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (!data["isSuccess"]) {
        console.log(data["code"]);
        console.log(data["message"]);
        return;
      }
      const loginSuccess = data["result"];

      setToken(loginSuccess.jwt);
      if (isChecked) {
        setStoreUid(inputId);
      }
      //각 상태 localStorage.setItem
      localStorage.setItem("firstLogin", loginSuccess["first_login"]);
      localStorage.setItem("menuRegister", loginSuccess["menu_register"]);
      localStorage.setItem("storeStatus", loginSuccess["store_status"]);

      dispatch(
        SET_AUTH({
          authenticated: true,
          accessToken: loginSuccess.jwt,
          expireTime: new Date().getTime() + TOKEN_TIME_OUT,
          name: loginSuccess.name,
          storeName: loginSuccess["store_name"],
          firstLogin: loginSuccess["first_login"],
          storeStaute: loginSuccess["store_status"],
          menuRegister: loginSuccess["menu_register"],
        })
      );

      console.log(loginSuccess);
      console.log(`쿠키 jwt 확인 : ${getCookieToken()}`);
    } catch (err) {
      console.log("서버가 아직 안켜져있습니다.");
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.id_input}
          placeholder="아이디"
          keyboardType="ascii-capable"
          returnKeyType="done"
          onChangeText={(text) => setInputID(text)}
        />
        <TextInput
          style={styles.pw_input}
          placeholder="비밀번호"
          secureTextEntry={true}
          returnKeyType="done"
          onChangeText={(text) => setInputPW(text)}
        />
        <View style={styles.login_option}>
          <View style={styles.idsave_wrap}>
            <TouchableOpacity onPress={handleSaveId}>
              <View
                style={{
                  ...styles.idsave_checkbox,
                  backgroundColor: saveId ? Color.purple : Color.white,
                  borderWidth: saveId ? 0 : 1,
                }}
              >
                <Check stroke={Color.white} width={21} height={21} />
              </View>
            </TouchableOpacity>
            <Text style={styles.idsave_text}>아이디 저장</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchAccunt")}
            >
              <Text style={styles.searchgo}>아이디_비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="로그인"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          margin="0 0 100 0"
          height={62}
          onPress={onClickLogin}
        />
      </View>
      <GoMembership navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 140,
    marginHorizontal: 20,
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
