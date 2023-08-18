import React, { useContext, useState } from "react";
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
  Dimensions,
  StatusBar,
} from "react-native";
import Color from "../../assets/colors/Color";
import { MembershipContext } from "../../context/MembershipContext";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import GoMembership from "../../components/login/GoMembership";
import SearchLoginInput from "../../components/login/SearchLoginInput";
import TopHeader from "../../components/login/TopHeader";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function NewPW({ navigation }) {
  const { searchPW } = useContext(MembershipContext);
  const [form, setForm] = useState({
    inputPW: "",
    inputCheckPW: "",
  });
  const [vaildPW, setVaildPW] = useState(true);
  const [vaildCheckPW, setVaildCheckPW] = useState(true);

  const takePW = (result) => {
    setForm({ ...form, inputPW: result });
  };
  const takeCheckPW = (result) => {
    setForm({ ...form, inputCheckPW: result });
  };

  const handleBTN = async () => {
    if (form.inputPW === "" || form.inputCheckPW === "") {
      alert("입력칸을 확인해주세요");
      return;
    } else if (!vaildPW) {
      return;
    } else if (!vaildCheckPW) {
      return;
    }

    const requestBody = {
      pw: form.inputPW,
      pwCheck: form.inputCheckPW,
    };

    const JWT = searchPW.jwt;
    //console.log(JWT);

    //비밀번호 재설정 api 호출
    try {
      const response = await fetch(
        "https://www.insung.shop/jat/app/users/pw-find",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": JWT,
          },
          body: JSON.stringify(requestBody),
        }
      );
      //const data = await response.json();
      //if (!data["isSuccess"]) {
      //console.log(data["message"]);
      //return;
      //}
      // const passwordSettingSuccess = data["result"];
      // console.log(passwordSettingSuccess);

      // 네비게이션
      const fetchCurrentLocationAndAddress = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          const truenextstep = () => navigation.navigate("TermsOfService");
          truenextstep();
        } else {
          const falsenextstep = () => navigation.navigate("MainTabs");
          falsenextstep();
        }
      };

      fetchCurrentLocationAndAddress();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar barStyle="dark-content" />
      <TopHeader
        title="아이디-비밀번호 찾기"
        onPress={() => navigation.navigate("LoginStart")}
      />
      <View style={styles.container}>
        <View style={styles.newpw_box}>
          <SearchLoginInput
            label="새 비밀번호" //
            placeholder="새 비밀번호 입력"
            sublabel={true}
            subtitle="영문+숫자+특수기호 8자 이상"
            vaildTest={() => {
              const pw = form.inputPW;
              const result =
                /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(pw);
              if (result) {
                return setVaildPW(true);
              } else {
                return setVaildPW(false);
              }
            }}
            takeresult={takePW}
            alertresult={vaildPW}
            alerttext="비밀번호 형식이 맞지 않습니다.(영문+숫자+특수기호 8자 이상)"
            secureTextEntry={true}
          />
          <SearchLoginInput
            label="새 비밀번호 확인" //
            placeholder="새 비밀번호 재입력"
            vaildTest={() => {
              if (form.inputPW !== form.inputCheckPW) {
                return setVaildCheckPW(false);
              } else {
                return setVaildCheckPW(true);
              }
            }}
            takeresult={takeCheckPW}
            alertresult={vaildCheckPW}
            alerttext="비밀번호가 일치하지 않습니다."
            secureTextEntry={true}
          />
        </View>
        <Button
          title="로그인"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
          onPress={handleBTN}
        />
      </View>
      <GoMembership />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: "relative",
    backgroundColor: Color.white,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 34,
    marginHorizontal: 20,
  },
  newpw_box: {
    marginTop: 133,
    marginBottom: 75,
    width: SCREEN_WIDTH - 40,
  },
});
