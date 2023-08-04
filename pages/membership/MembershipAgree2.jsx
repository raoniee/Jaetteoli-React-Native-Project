import React from "react";
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
  Dimensions,
} from "react-native";
import Button from "../../components/common/Button";
import Color from "../../assets/colors/Color";
import Header from "../../components/common/Header";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function MembershipAgree2() {
  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="이용약관 동의" right={0} />
      <View style={styles.container}>
        <View style={styles.agreeinfo}>
          <View style={styles.datebox}>
            <Text style={styles.date}>07/20/2022</Text>
            <Text style={styles.date}>09:19:24 AM</Text>
          </View>
          <ScrollView style={styles.agreebox}>
            <Text style={styles.agreetext}>
              제 1 장 총칙 제 1 조 (목적) 본 약관은 재떨이가 운영하는 웹 사이트
              (http://xxx.xxx.xxx)의 제반 서비스의 이용조건 및 절차에 관한 사항
              및 기타 필요한 사항을 규정함을 목적으로 한다. 제 2 조 (용어의
              정의) 본 약관에서 사용하는 용어는 다음과 같이 정의한다. ①회원 :
              기본 회원 정보를 입력하였고, 회사와 서비스 이용계약을 체결하여
              아이디를 부여받은 개인 ②아이디(ID) : 회원식별과 회원의 서비스
              이용을 위해 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합
              ③비밀번호(Password) : 회원이 통신상의 자신의 비밀을 보호하기 위해
              선정한 문자와 숫자의 조합 ④해지 : 회사 또는 회원에 의한 이용계약의
              종료 제 3 조 (약관의 공시 및 효력과 변경) ①본 약관은 회원가입
              화면에 게시하여 공시하며 회사는 사정변경 및 영업상 중요한 사유가
              있을 경우 약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해
              공시한다 ②본 약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게
              공시함으로써 효력을 발생한다. 제 4 조 (약관 외 준칙) 본 약관에
              명시되지 않은 사항이 전기통신기본법, 전기통신사업법,
              정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’,
              ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’,
              ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계
              법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다. 있을 경우
              약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해 공시한다 ②본
              약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게 공시함으로써
              효력을 발생한다. 제 4 조 (약관 외 준칙) 본 약관에 명시되지 않은
              사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법,
              ‘전자상거래등에서의 소비자 보호에 관한 법률’, ‘약관의
              규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망
              이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계 법령에
              규정되어 있을 경우에는 그 규정을 따르도록 한다.
            </Text>
          </ScrollView>
        </View>
        <Button
          title="동의합니다"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          height={62}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 90,
  },
  agreeinfo: {
    flex: 1,
    marginBottom: 60,
  },
  datebox: {
    flex: 0.05,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginBottom: 21,
  },
  date: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
  },
  agreebox: {
    flex: 0.97,
    borderWidth: 1,
    borderColor: Color.darkGray,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  agreetext: {
    fontFamily: "Pretendard-Regular",
    fontSize: 13,
  },
});
