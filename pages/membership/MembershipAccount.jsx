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
import EmailInput from "../../components/membership/EmailInput";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipAccount() {
  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="기본정보" right={0} />
      <View style={styles.container}>
        <Text style={styles.title}>
          회원정보를 입력 후, 가입을 완료해주세요.
        </Text>
        <View style={styles.useraccount_box}>
          <LoginInput
            label="아이디" //
            placeholder="영문 혹은 영문+숫자, 4~20자"
          />
          <LoginInput
            label="비밀번호" //
            placeholder="비밀번호"
            sublabel={true}
            subtitle="영문+숫자+특수기호 8자 이상"
            subinput={true}
            subplaceholder="비밀번호 재입력"
          />
          <EmailInput />
        </View>
        <Button
          style={{
            zIndex: -1,
          }}
          title="다음"
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
    marginTop: 38,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    marginBottom: 20,
  },
  useraccount_box: {
    width: SCREEN_WIDTH - 40,
    marginBottom: 40,
    zIndex: 1,
  },
});
