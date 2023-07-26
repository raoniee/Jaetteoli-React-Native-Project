import React from "react";
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
import Button from "../../components/common/Button";
import Color from "../../assets/colors/Color";
import AngleRight from "../../assets/images/AngleRight";
import CheckOn from "../../assets/images/CheckOn";
import AgreeSentence from "../../components/membership/AgreeSentence";

export default function MembershipStart() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>재떨이 고객님 회원가입을 시작합니다.</Text>
        <View style={styles.allagreebox}>
          <TouchableOpacity>
            <TextInput
              editable={false}
              style={styles.allagreecheck}
            ></TextInput>
          </TouchableOpacity>
          <Text style={styles.allagreetext}>전체동의</Text>
        </View>
        <View style={styles.agreetop}>
          <Text style={styles.agreetitle}>
            서비스 이용을 위해 동의가 필요합니다.
          </Text>
          <AgreeSentence text="[필수] 이용약관 동의" />
          <AgreeSentence text="[필수] 개인정보 수집이용 동의" />
        </View>
        <View style={styles.agreebottom}>
          <Text style={styles.agreetitle}>
            특별한 혜택과 최신 소식을 받아보세요
          </Text>
          <AgreeSentence
            text="[선택] 서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의"
            arrow={true}
          />
          <AgreeSentence text="[선택] 광고성 정보 수신동의" sns={true} />
        </View>
      </View>
      <Button
        title="휴대폰으로 인증하기"
        backgroundColor={Color.darkPurple}
        color={Color.white}
        //margin="0 0 600 0"
        height={62}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "blue",
    flex: 1,
    flexDirection: "column",
    gap: 100,
    marginTop: 173,
    marginBottom: 110,
    marginHorizontal: 16,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  // allagree
  allagreebox: {
    flexDirection: "row",
    marginTop: 50,
    marginHorizontal: 4,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Color.gray,
  },
  allagreecheck: {
    width: 21,
    height: 21,
    borderRadius: 5,
    marginVertical: 13,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: Color.gray,
    //backgroundColor: Color.darkPurple,
  },
  allagreetext: {
    fontFamily: "Pretendard-Regular",
    marginLeft: 15,
    marginVertical: 13,
    lineHeight: 21,
  },
  // allagree
  agreetop: {
    //backgroundColor: "yellow",
    marginTop: 35,
    marginBottom: 30,
  },
  agreetitle: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    marginBottom: 20,
  },

  agreebottom: {
    //backgroundColor: "yellow",
  },
});
