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

export default function IDSearch() {
  const [getnumber, setGetnumber] = useState(false);
  const [userName, setUsetName] = useState();
  const [userPhone, setUsetPhone] = useState();

  const saveText = (text) => {
    setUsetName(text);
    setUsetPhone(text);
  };

  const handleBTN = () => {
    if (userName === undefined) {
      alert("이름을 입력해주세요");
    }

    if (userPhone === undefined) {
      alert("휴대폰 번호를 입력해주세요");
    }
  };

  return (
    <>
      <View style={{ ...styles.input_box, marginBottom: getnumber ? "" : 55 }}>
        <LoginInput
          label="이름" //
          placeholder="이름 입력"
          takeText={saveText}
        />
        <LoginInput
          label="휴대폰 번호"
          placeholder="-없이 휴대폰 번호 입력"
          keyboardType="number-pad"
          takeText={saveText}
        />
        {getnumber && <CertificationInput />}
      </View>
      <Button
        onPress={handleBTN}
        title={getnumber ? "다음" : "인증번호 받기"}
        backgroundColor={Color.darkPurple}
        color={Color.white}
        width={SCREEN_WIDTH - 40}
        height={62}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input_box: {
    marginTop: 80,
    width: SCREEN_WIDTH - 40,
  },
});
