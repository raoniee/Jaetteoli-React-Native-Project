import React from "react";
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
import LoginInput from "../login/LoginInput";
import Button from "../common/Button";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function NewPW() {
  return (
    <>
      <View style={styles.newpw_box}>
        <LoginInput
          label="새 비밀번호" //
          placeholder="새 비밀번호 입력"
          sublabel={true}
          subtitle="영문+숫자+특수기호 8자 이상"
        />
        <LoginInput
          label="새 비밀번호 확인" //
          placeholder="새 비밀번호 재입력"
        />
      </View>
      <Button
        title="로그인"
        backgroundColor={Color.darkPurple}
        color={Color.white}
        width={SCREEN_WIDTH - 40}
        height={62}
      />
    </>
  );
}

const styles = StyleSheet.create({
  newpw_box: {
    marginTop: 133,
    marginBottom: 75,
    width: SCREEN_WIDTH - 40,
  },
});
