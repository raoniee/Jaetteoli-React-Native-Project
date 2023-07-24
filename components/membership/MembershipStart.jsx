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
import Color from "../../assets/colors/Color";
import AngleRight from "../../assets/images/AngleRight";
import CheckOn from "../../assets/images/CheckOn";

export default function MembershipStart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>재떨이 고객님 회원가입을 시작합니다.</Text>
      <View style={styles.allagreebox}>
        <TouchableWithoutFeedback onPress={() => console.log("press!")}>
          <TextInput editable={false} style={styles.allagreecheck}></TextInput>
        </TouchableWithoutFeedback>
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
          특별한 혜택과 최신 소식을 받아보세요!
        </Text>
        <AgreeSentence
          text="[선택] 서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의"
          arrow={true}
        />
        <AgreeSentence text="[선택] 광고성 정보 수신동의" />
      </View>
    </View>
  );
}

function AgreeSentence(props) {
  return (
    <View style={styles.agreesentence}>
      <TouchableHighlight>
        <CheckOn />
      </TouchableHighlight>
      <TouchableWithoutFeedback>
        <View style={styles.agreemore}>
          <Text style={styles.agreetext}>{props.text}</Text>
          {!props.arrow && <AngleRight />}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

function AdAgree() {
  return (
    <View style={styles.AdAgree}>
      <TouchableHighlight>
        <CheckOn />
        <Text>SMS</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <CheckOn />
        <Text>SMS</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <CheckOn />
        <Text>SMS</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "blue",
    flex: 1,
    marginTop: 173,
    marginBottom: 110,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  allagreebox: {
    flexDirection: "row",
    marginTop: 50,
    marginHorizontal: 20,
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
  },
  allagreetext: {
    fontFamily: "Pretendard-Regular",
    marginLeft: 15,
    marginVertical: 13,
  },
  agreetop: {
    //backgroundColor: "yellow",
    marginTop: 35,
    marginHorizontal: 16,
    marginBottom: 30,
  },
  agreetitle: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    marginBottom: 20,
  },
  agreesentence: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  agreemore: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95.5%",
  },
  agreetext: {
    fontFamily: "Pretendard-Regular",
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 15,
  },
  agreebottom: {
    //backgroundColor: "yellow",
    marginHorizontal: 16,
  },
});
