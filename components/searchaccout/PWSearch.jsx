import React, { useState } from "react";
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
  Dimensions,
} from "react-native";
import Color from "../../assets/colors/Color";
import Button from "../common/Button";
import CertificationInput from "../login/CertificationInput";
import LoginInput from "../login/LoginInput";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function PWSearch() {
  const [form, setForm] = useState({
    inputId: "",
    inputPhonenum: "",
  });
  //const [nameValid, setNameValid] = useState(true);
  //const [phoneValid, setPhoneValid] = useState(true);
  const [validCheck, setValidCheck] = useState(true);
  const [phoneValidPattern, setPhoneValidPattern] = useState(true);
  //const [resultPhoneNum, setResultPhoneNum] = useState();
  const [getnumber, setGetnumber] = useState(false);

  const takeId = (result) => {
    setForm({ ...form, inputId: result });
  };
  const takePhoneNum = (result) => {
    setForm({ ...form, inputPhonenum: result });
  };

  const handlePhoneBTN = async () => {
    //인증번호 받기 위한 로직
    if (!getnumber) {
      if (form.inputId.trim() === "" && form.inputPhonenum.trim() === "") {
        setValidCheck(false);
        alert("빈칸 확인해주세요");
        return;
      } else {
        setValidCheck(true);
      }

      const pattern = /^\d{3}\d{4}\d{4}$/;
      const isValid = pattern.test(form.inputPhonenum);
      if (!isValid) {
        alert("전화번호 확인해주세요");
        setPhoneValidPattern(false);
        return;
      } else {
        setPhoneValidPattern(true);
      }

      const requestBody = {
        phoneNum: form.inputPhonenum,
        id: form.inputId,
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
        id: form.inputId,
        //certificationNum: resultPhoneNum,
      };
    }
  };

  return (
    <>
      <View style={{ ...styles.input_box, marginBottom: getnumber ? "" : 55 }}>
        <LoginInput
          label="아이디"
          placeholder="아이디 입력"
          takeresult={takeId}
        />
        <LoginInput
          label="휴대폰 번호"
          placeholder="-없이 휴대폰 번호 입력"
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
    </>
  );
}

const styles = StyleSheet.create({
  input_box: {
    marginTop: 80,
    width: SCREEN_WIDTH - 40,
  },
});
