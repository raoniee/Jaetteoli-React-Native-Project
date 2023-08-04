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
import {
  MembershipContext,
  MembershipProvider,
} from "../../context/MembershipContext";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipInfo() {
  const [getnumber, setGetnumber] = useState(false);

  return (
    <MembershipProvider>
      <SafeAreaView style={styles.wrap}>
        <Header title="기본정보" right={0} />
        <View style={{ ...styles.container, marginTop: getnumber ? 77 : 134 }}>
          <UserInfoBox />
          <UserInfoBTN />
        </View>
      </SafeAreaView>
    </MembershipProvider>
  );
}

function UserInfoBox() {
  const { getnumber } = useContext(MembershipContext);

  return (
    <View style={styles.userinfo_box}>
      <LoginInput
        label="이름" //
        placeholder="홍길동"
        InfoType="name"
      />
      <LoginInput
        label="생년월일" //
        placeholder="YYYY.MM.DD"
        keyboardType="number-pad"
        InfoType="birthday"
      />
      <LoginInput
        label="휴대폰 번호" //
        placeholder="01012345678"
        keyboardType="number-pad"
        InfoType="phone"
      />
      {getnumber && <CertificationInput />}
    </View>
  );
}

function UserInfoBTN() {
  const { getnumber, handlePhoneBTN } = useContext(MembershipContext);

  // const handlePhoneBTN = () => {
  //   //인증번호 받기 위한 로직
  //   if (!getnumber) {
  //     if (
  //       userInfo.name.trim() === "" &&
  //       userInfo.birthday.trim() === "" &&
  //       userInfo.phone.trim() === ""
  //     ) {
  //       setValidCheck(false);
  //       alert("빈칸 확인해주세요");
  //       return;
  //     } else {
  //       setValidCheck(true);
  //     }

  //     const requestBody = {
  //       // phoneNum: form.inputPhonenum,
  //       // name: form.inputName,
  //       // birthday: form.inputBirthDay,
  //     };
  //     //console.log(requestBody);
  //     try {
  //       // const response = await fetch(
  //       //   "https://www.insung.shop/jat/sellers/lost",
  //       //   {
  //       //     method: "POST",
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //     },
  //       //     body: JSON.stringify(requestBody),
  //       //   }
  //       // );

  //       // const data = await response.json();
  //       // if (!data["isSuccess"]) {
  //       //   console.log(data["message"]);
  //       //   return;
  //       // }
  //       // const idSearchSuccess = data["result"]["smsIdx"];
  //       // console.log(idSearchSuccess);
  //       setGetnumber(true);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     //
  //   } else {
  //     //인증번호 입력후의 로직
  //     const requestBody = {
  //       // phoneNum: form.phonenum,
  //       // name: form.name,
  //       //certificationNum: resultPhoneNum,
  //     };
  //   }
  // };

  return (
    <>
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
          //onPress={handleBTNee}
          title={"다음"}
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
        />
      )}
    </>
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
