import React, { useCallback, useContext, useEffect, useState } from "react";
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
} from "react-native";
import Color from "../../assets/colors/Color";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import CertificationInput from "../../components/login/CertificationInput";
import LoginInput from "../../components/login/LoginInput";
import { MembershipContext } from "../../context/MembershipContext";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipInfo({ navigation }) {
  const { userInfo } = useContext(MembershipContext);
  const [getnumber, setGetnumber] = useState(false);
  const [vaildName, setVaildName] = useState(true);
  const [vaildBirthDay, setVaildBirthDay] = useState(true);
  const [vaildPhoneNum, setVaildPhoneNum] = useState(true);
  const [vaildCheck, setVaildCheck] = useState(false);

  const handlePhoneBTN = async () => {
    //인증번호 받기 위한 로직
    if (!getnumber) {
      if (
        userInfo.name === "" ||
        userInfo.birthday === "" ||
        userInfo.phone === ""
      ) {
        alert("입력칸을 확인해주세요");
        return;
      } else if (!vaildName) {
        return;
      } else if (!vaildBirthDay) {
        return;
      } else if (!vaildPhoneNum) {
        return;
      }

      const requestBody = {
        phoneNum: userInfo.phone,
        name: userInfo.name,
        birth: userInfo.birthday,
      };

      console.log(requestBody);
      try {
        // const response = await fetch(
        //   "https://www.insung.shop/jat/app/users/authy",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(requestBody),
        //   }
        // );

        // const data = await response.json();
        // if (!data["isSuccess"]) {
        //   console.log(data["message"]);
        //   return;
        // }
        setGetnumber(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      //인증번호 입력후의 로직
      const requestBody = {
        phoneNum: userInfo.phone,
        name: userInfo.name,
        birth: userInfo.birthday,
        certificationNum: userInfo.certificationNum,
      };

      try {
        // const response = await fetch(
        //   "https://www.insung.shop/jat/app/users/authy-pass",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(requestBody),
        //   }
        // );
        // const data = await response.json();
        // if (!data["isSuccess"]) {
        //   console.log("");
        //   return;
        // }
        const nextstep = () => {
          navigation.navigate("MembershipAccount");
        };
        nextstep();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="기본정보" right={0} />
      <View style={{ ...styles.container, marginTop: getnumber ? 77 : 134 }}>
        <View style={styles.userinfo_box}>
          <LoginInput
            label="이름" //
            placeholder="홍길동"
            InfoType="name"
            vaildTest={() => {
              const name = userInfo.name;
              const length = name.length >= 2;
              const kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(name);
              if (length && kor) {
                return setVaildName(true);
              } else {
                return setVaildName(false);
              }
            }}
            alertresult={vaildName}
            alerttext="이름의 형식이 맞지 않습니다."
          />
          <LoginInput
            label="생년월일" //
            placeholder="YYYY.MM.DD"
            keyboardType="numeric"
            InfoType="birthday"
            vaildTest={() => {
              const bd = userInfo.birthday;
              const result = /^\d{4}\.\d{2}\.\d{2}$/.test(bd);
              if (result) {
                return setVaildBirthDay(true);
              } else {
                return setVaildBirthDay(false);
              }
            }}
            alertresult={vaildBirthDay}
            alerttext="생년월일(YYYY.MM.DD)의 형식이 맞지 않습니다."
          />
          <LoginInput
            label="휴대폰 번호" //
            placeholder="01012345678"
            keyboardType="number-pad"
            InfoType="phone"
            vaildTest={() => {
              const num = userInfo.phone;
              const result = /^\d{3}\d{4}\d{4}$/.test(num);
              if (result) {
                return setVaildPhoneNum(true);
              } else {
                return setVaildPhoneNum(false);
              }
            }}
            alertresult={vaildPhoneNum}
            alerttext="휴대폰 번호(01012345678)의 형식이 맞지 않습니다."
          />
          {getnumber && <CertificationInput InfoType="certificationNum" />}
        </View>
        {!getnumber && (
          <Button
            onPress={handlePhoneBTN}
            title={"인증번호 받기"}
            backgroundColor={Color.darkPurple}
            color={Color.white}
            width={SCREEN_WIDTH - 40}
            height={62}
          />
        )}
        {getnumber && (
          <Button
            onPress={handlePhoneBTN}
            title={"다음"}
            backgroundColor={Color.darkPurple}
            color={Color.white}
            width={SCREEN_WIDTH - 40}
            height={62}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: "relative",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 20,
  },
  userinfo_box: {
    width: SCREEN_WIDTH - 40,
    marginBottom: 60,
  },
});
