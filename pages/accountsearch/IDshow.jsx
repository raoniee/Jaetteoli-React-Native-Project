import React, { useContext, useEffect, useState } from "react";
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
import TopHeader from "../../components/login/TopHeader";
import { MembershipContext } from "../../context/MembershipContext";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function IDshow({ navigation }) {
  const { searchID } = useContext(MembershipContext);

  return (
    <SafeAreaView style={styles.wrap}>
      <TopHeader
        title="아이디-비밀번호 찾기"
        onPress={() => navigation.navigate("LoginStart")}
      />
      <View style={styles.container}>
        <View style={styles.idshowbox}>
          <View style={styles.idshowtext}>
            <Text style={styles.title}>가입한 아이디는 아래와 같습니다.</Text>
            <Text style={styles.desc}>
              인증한 휴대폰 번호로 가입한 아이디 입니다. 아이디 확인 후 로그인을
              진행해 주세요.
            </Text>
            <Text style={styles.user_id}>{searchID[0].uid}</Text>
            <Text style={styles.user_date}>{searchID[0].signUpDate}</Text>
          </View>
        </View>
        <Button
          title="로그인하러 가기"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
          onPress={() => {
            navigation.navigate("LoginStart");
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchAccunt");
          }}
        >
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
    backgroundColor: Color.white,
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
