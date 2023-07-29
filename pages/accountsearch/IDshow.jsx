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
import GoMembership from "../../components/login/GoMembership";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function IDshow() {
  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="아이디_비밀번호 찾기" right={0} />
      <View style={styles.container}>
        <View style={styles.idshowbox}>
          <View style={styles.idshowtext}>
            <Text style={styles.title}>가입한 아이디는 아래와 같습니다.</Text>
            <Text style={styles.desc}>
              인증한 휴대폰 번호로 가입한 아이디 입니다. 아이디 확인 후 로그인을
              진행해 주세요.
            </Text>
            <Text style={styles.user_id}>jungsh4064</Text>
            <Text style={styles.user_date}>2023.06.07. 가입</Text>
          </View>
        </View>
        <Button
          title="로그인하러 가기"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
        />
        <TouchableOpacity>
          <Text style={styles.pw_search}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
      </View>
      <GoMembership />
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
    marginTop: 122,
    marginHorizontal: 20,
  },
  idshowbox: {
    backgroundColor: Color.brightGray,
    //height: SCREEN_HIGHT * 0.35,
    height: 288,
    borderRadius: 30,
    marginBottom: 60,
  },
  idshowtext: {
    marginHorizontal: 42,
  },
  title: {
    fontFamily: "Pretendard-Medium",
    fontSize: 18,
    textAlign: "center",
    marginTop: 72,
    marginBottom: 15,
  },
  desc: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    textAlign: "center",
    color: Color.gray,
    marginBottom: 45,
  },
  user_id: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  user_date: {
    fontFamily: "Pretendard-Medium",
    fontSize: 13,
    textAlign: "center",
    color: Color.gray,
  },
  pw_search: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 14,
    color: Color.gray,
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
