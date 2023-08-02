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
import LoginInput from "../../components/login/LoginInput";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipInfo() {
  const [form, setForm] = useState({
    name: "",
    birthday: "",
    phonenum: "",
  });
  const [isValid, setIsValid] = useState({
    name: false,
    birthday: false,
    phone: false,
  });

  const TakeNameResult = (result) => {
    setForm({ ...form, name: result });
  };
  const TakeBirthDayResult = (result) => {
    setForm({ ...form, birthday: result });
  };
  const TakePhoneNumResult = (result) => {
    setForm({ ...form, phonenum: result });
  };

  const validateName = () => {};
  const validateBirthday = () => {
    const isValidFormat = /^\d{4}\.\d{2}\.\d{2}$/.test(BirthDay);
    console.log(isValidFormat);
  };
  const validatePhoneNum = () => {};

  const handleBTN = async () => {};

  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="기본정보" right={0} />
      <View style={styles.container}>
        <View style={styles.userinfo_box}>
          <LoginInput
            label="이름" //
            placeholder="홍길동"
            takeresult={TakeNameResult}
          />
          <LoginInput
            label="생년월일" //
            placeholder="YYYY.MM.DD"
            keyboardType="number-pad"
            takeresult={TakeBirthDayResult}
          />
          <LoginInput
            label="휴대폰 번호" //
            placeholder="01012345678"
            keyboardType="number-pad"
            takeresult={TakePhoneNumResult}
          />
        </View>
        <Button
          title="인증번호 받기"
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
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 134,
    marginHorizontal: 20,
  },
  userinfo_box: {
    width: SCREEN_WIDTH - 40,
    marginBottom: 60,
  },
});
