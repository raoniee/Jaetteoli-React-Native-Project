import React, { useContext, useEffect, useState } from "react";
import Color from "../../assets/colors/Color";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MembershipContext } from "../../context/MembershipContext";

export default function CertificationSearchInput({ takeresult }) {
  const [remainingTime, setRemainingTime] = useState(180); // 초기 제한 시간을 3분(180초)으로 설정

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1); // 1초씩 감소
      }, 1000);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    } else {
      //alert("인증 시간이 만료되었습니다. 인증을 다시 진행해주세요.");
      //remainHandler();
    }
  }, [remainingTime]);

  const handleretry = () => {
    alert("인증번호를 재전송하였습니다!");
  };

  return (
    <>
      <Text style={styles.label}>인증번호</Text>
      <View style={styles.input_wrap}>
        <TextInput
          style={styles.input}
          placeholder="인증번호 입력"
          keyboardType="number-pad"
          returnKeyType="done"
          onChangeText={(text) => takeresult(text)}
        />
        <Text style={styles.timer}>
          {Math.floor(remainingTime / 60)}:
          {String(remainingTime % 60).padStart(2, "0")}
        </Text>
      </View>
      <Text style={styles.resend} onPress={handleretry}>
        인증번호 재전송
      </Text>
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
  input_wrap: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: Color.brightGray,
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
  },
  timer: {
    position: "absolute",
    top: 22,
    right: 20,
    color: Color.red,
  },
  resend: {
    width: "100%",
    paddingLeft: 20,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 13,
    color: Color.gray,
    textDecorationLine: "underline",
    marginBottom: 50,
  },
});