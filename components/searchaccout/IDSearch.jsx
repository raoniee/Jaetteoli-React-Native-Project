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
} from "react-native";
import Color from "../../assets/colors/Color";
import Button from "../common/Button";
import CertificationInput from "../login/CertificationInput";
import LoginInput from "../login/LoginInput";

export default function IDSearch() {
  const [getnumber, setGetnumber] = useState(false);

  return (
    <>
      <View style={styles.input_box}>
        <LoginInput text="이름" placeholder="이름 입력" />
        <LoginInput
          text="휴대폰 번호"
          placeholder="-없이 휴대폰 번호 입력"
          keyboardType="number-pad"
        />
        {getnumber && <CertificationInput />}
      </View>
      <Button
        onPress={() => setGetnumber(true)}
        title={getnumber ? "다음" : "인증번호 받기"}
        backgroundColor={Color.darkPurple}
        color={Color.white}
        margin={getnumber ? "0 0 84 0" : "75 0 144 0"}
        height={62}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input_box: {
    marginTop: 100, //
    width: 354,
  },
});
