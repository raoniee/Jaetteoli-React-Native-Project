import React, { useContext } from "react";
import {
  SafeAreaView,
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
import Button from "../../components/common/Button";
import Color from "../../assets/colors/Color";
import Header from "../../components/common/Header";
import { MembershipContext } from "../../context/MembershipContext";

export default function MembershipEnd() {
  const { userInfo } = useContext(MembershipContext);
  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="이용약관 동의" right={0} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>회원가입이 완료되었습니다! </Text>
          <View style={styles.accountshowbox}>
            <View style={styles.left}>
              <Text style={styles.left_label}>이름</Text>
              <Text style={styles.left_label}>생년월일</Text>
              <Text style={styles.left_label}>휴대폰번호</Text>
              <Text style={styles.left_label}>이메일</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.right_label}>{userInfo.name}</Text>
              <Text style={styles.right_label}>{userInfo.birthday}</Text>
              <Text style={styles.right_label}>{userInfo.phone}</Text>
              <Text style={styles.right_label}>{userInfo.useremail}</Text>
            </View>
          </View>
          <Text style={styles.desc}>
            위 내용은 재떨이 정보 수정 에서 수정할 수 있습니다.
          </Text>
        </View>
        <Button
          title="재떨이 서비스 시작하기"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          height={62}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 100,
    marginTop: 66,
    marginBottom: 119,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  accountshowbox: {
    flexDirection: "row",
    gap: 65,
    backgroundColor: Color.brightGray,
    borderRadius: 30,
    paddingHorizontal: 42,
    paddingVertical: 46,
    marginBottom: 25,
  },
  left: {
    flexDirection: "column",
    gap: 25,
  },
  left_label: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    color: Color.darkGray,
  },
  right: {
    flexDirection: "column",
    gap: 25,
  },
  right_label: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
  },
  desc: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    textAlign: "center",
    color: Color.darkGray,
  },
});
