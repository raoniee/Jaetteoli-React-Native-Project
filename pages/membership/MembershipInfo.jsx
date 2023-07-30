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
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import LoginInput from "../../components/login/LoginInput";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipInfo() {
  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="기본정보" right={0} />
      <View style={styles.container}>
        <View style={styles.userinfo_box}>
          <LoginInput
            label="이름" //
            placeholder="홍길동"
          />
          <LoginInput
            label="생년월일" //
            placeholder="숫자 6자"
          />
          <LoginInput
            label="휴대폰 번호" //
            placeholder="01012345678"
          />
        </View>
        <Button
          title="인증번호 받기"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
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
