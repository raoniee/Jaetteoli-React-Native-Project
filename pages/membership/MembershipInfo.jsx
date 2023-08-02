import React, { useCallback, useEffect, useState } from "react";
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

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipInfo() {
  const [form, setForm] = useState({
    inputName: "",
    inputBirthDay: "",
    inputPhonenum: "",
  });
  //const [nameValid, setNameValid] = useState(true);
  //const [phoneValid, setPhoneValid] = useState(true);
  const [validCheck, setValidCheck] = useState(true);
  const [phoneValidPattern, setPhoneValidPattern] = useState(true);
  const [birthdayValidPattern, setBirthdayValidPattern] = useState(true);
  //const [resultPhoneNum, setResultPhoneNum] = useState();
  const [getnumber, setGetnumber] = useState(false);

  const takeName = (result) => {
    setForm({ ...form, inputName: result });
  };
  const takeBirthDay = (result) => {
    setForm({ ...form, inputBirthDay: result });
  };
  const takePhoneNum = (result) => {
    setForm({ ...form, inputPhonenum: result });
  };

  const handlePhoneBTN = async () => {
    //인증번호 받기 위한 로직
    if (!getnumber) {
      if (
        form.inputName.trim() === "" &&
        form.inputBirthDay.trim() === "" &&
        form.inputPhonenum.trim() === ""
      ) {
        setValidCheck(false);
        alert("빈칸 확인해주세요");
        return;
      } else {
        setValidCheck(true);
      }

      const patternPhone = /^\d{3}\d{4}\d{4}$/;
      const isValidPhone = patternPhone.test(form.inputPhonenum);
      if (!isValidPhone) {
        alert("전화번호 확인해주세요");
        setPhoneValidPattern(false);
        return;
      } else {
        setPhoneValidPattern(true);
      }

      // const patternBD = /^\d{4}\.\d{2}\.\d{2}$/;
      // const isValidBD = patternBD.test(form.inputBirthDay);
      // if (!isValidBD) {
      //   alert("전화번호 확인해주세요");
      //   setBirthdayValidPattern(false);
      //   return;
      // } else {
      //   setBirthdayValidPattern(true);
      // }

      const requestBody = {
        phoneNum: form.inputPhonenum,
        name: form.inputName,
        birthday: form.inputBirthDay,
      };
      //console.log(requestBody);
      try {
        // const response = await fetch(
        //   "https://www.insung.shop/jat/sellers/lost",
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
        // const idSearchSuccess = data["result"]["smsIdx"];
        // console.log(idSearchSuccess);
        setGetnumber(true);
      } catch (err) {
        console.log(err);
      }
      //
    } else {
      //인증번호 입력후의 로직
      const requestBody = {
        phoneNum: form.phonenum,
        name: form.name,
        //certificationNum: resultPhoneNum,
      };
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
            takeresult={takeName}
          />
          <LoginInput
            label="생년월일" //
            placeholder="YYYY.MM.DD"
            keyboardType="number-pad"
            takeresult={takeBirthDay}
          />
          <LoginInput
            label="휴대폰 번호" //
            placeholder="01012345678"
            keyboardType="number-pad"
            takeresult={takePhoneNum}
          />
          {getnumber && <CertificationInput />}
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
            //onPress={handleBTNee}
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
