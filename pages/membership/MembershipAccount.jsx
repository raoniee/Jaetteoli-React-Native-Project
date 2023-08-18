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
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import LoginInput from "../../components/login/LoginInput";
import TopHeader from "../../components/login/TopHeader";
import EmailInput from "../../components/membership/EmailInput";
import {
  MembershipContext,
  MembershipProvider,
} from "../../context/MembershipContext";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipAccount({ navigation }) {
  const { userInfo, agreements } = useContext(MembershipContext);
  const [vaildID, setVaildID] = useState(true);
  const [vaildPW, setVaildPW] = useState(true);

  const handleBTN = async () => {
    const email = userInfo.useremail;
    const result = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!result) {
      alert("이메일 주소를 확인해주세요!");
      return;
    } else if (!vaildID) {
      return;
    } else if (!vaildPW) {
      return;
    } else {
      const requestBody = {
        uid: userInfo.userid,
        name: userInfo.name,
        birthday: userInfo.birthday,
        phone: userInfo.phone,
        password: userInfo.userpw,
        email: userInfo.useremail,
        //true 1, false 0으로 바꿔놓기
        serviceCheck: agreements.mandatoryOne ? 1 : 0,
        personalCheck: agreements.mandatoryTwo ? 1 : 0,
        info_service_check: agreements.selectiveOne ? 1 : 0,
        smsCheck: agreements.isSns ? 1 : 0,
        emailCheck: agreements.isEmail ? 1 : 0,
        callCheck: agreements.isPhone ? 1 : 0,
      };

      //console.log(requestBody);
      try {
        const response = await fetch("https://www.insung.shop/jat/app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!data["isSuccess"]) {
          console.log(data["message"]);
          return;
        }
        navigation.navigate("MembershipEnd");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar barStyle="dark-content" />
      <TopHeader
        title="기본정보"
        onPress={() => navigation.navigate("LoginStart")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>
          회원정보를 입력 후, 가입을 완료해주세요.
        </Text>
        <View style={styles.useraccount_box}>
          <LoginInput
            label="아이디" //
            placeholder="영문 혹은 영문+숫자, 4~20자"
            InfoType="userid"
            vaildTest={() => {
              const id = userInfo.userid;
              const result = /^[a-zA-z0-9]{4,20}$/.test(id);
              if (result) {
                return setVaildID(true);
              } else {
                return setVaildID(false);
              }
            }}
            alertresult={vaildID}
            alerttext="아이디 형식이 맞지 않습니다.(영문 혹은 영문+숫자, 4~20자)"
          />
          <LoginInput
            label="비밀번호" //
            placeholder="비밀번호"
            sublabel={true}
            subtitle="영문+숫자+특수기호 8자 이상"
            subinput={true}
            secureTextEntry={true}
            subplaceholder="비밀번호 재입력"
            InfoType="userpw"
            vaildTest={() => {
              const pw = userInfo.userpw;
              const result =
                /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(pw);
              if (result) {
                return setVaildPW(true);
              } else {
                return setVaildPW(false);
              }
            }}
            alertresult={vaildPW}
            alerttext="비밀번호 형식이 맞지 않습니다.(영문+숫자+특수기호 8자 이상)"
          />
          <EmailInput />
        </View>
        <Button
          style={{
            zIndex: -1,
          }}
          title="다음"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
          onPress={handleBTN}
        />
      </View>
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
    marginTop: 38,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    marginBottom: 20,
  },
  useraccount_box: {
    width: SCREEN_WIDTH - 40,
    marginBottom: 40,
    zIndex: 1,
  },
});
