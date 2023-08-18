import React, { useContext, useState } from "react";
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
  StatusBar,
} from "react-native";
import Checkbox from "expo-checkbox";
import Button from "../../components/common/Button";
import Color from "../../assets/colors/Color";
import AgreeSentence from "../../components/membership/AgreeSentence";
import Header from "../../components/common/Header";
import Check from "../../assets/images/Check";
import {
  MembershipContext,
  MembershipProvider,
} from "../../context/MembershipContext";
import TopHeader from "../../components/login/TopHeader";
import { useEffect } from "react";

export default function MembershipStart({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar barStyle="dark-content" />
      <TopHeader
        title="회원가입"
        onPress={() => navigation.navigate("LoginStart")}
      />
      <View style={styles.container}>
        <View>
          <AllAgreeContent />
          <SingleAgreesContent navigation={navigation} />
        </View>
        <MembershipRegisterBTN navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

function AllAgreeContent() {
  const { allagree, changeCheck } = useContext(MembershipContext);

  return (
    <>
      <Text style={styles.title}>재떨이 고객님 회원가입을 시작합니다.</Text>
      <View style={styles.allagreebox}>
        <TouchableOpacity onPress={changeCheck}>
          <View
            style={{
              ...styles.allagreecheck,
              backgroundColor: allagree ? Color.purple : Color.white,
              borderWidth: allagree ? 0 : 1,
            }}
          >
            <Check stroke={Color.white} width={21} height={21} />
          </View>
        </TouchableOpacity>
        <Text style={styles.allagreetext}>전체동의</Text>
      </View>
    </>
  );
}

function SingleAgreesContent({ navigation }) {
  return (
    <>
      <View style={styles.agreetop}>
        <Text style={styles.agreetitle}>
          서비스 이용을 위해 동의가 필요합니다.
        </Text>
        <AgreeSentence
          text="[필수] 이용약관 동의"
          onPress={() => {
            navigation.navigate("MembershipAgreeDesc", {
              title: "m1",
              type: "mandatoryOne",
            });
          }}
          param="mandatoryOne"
        />
        <AgreeSentence
          text="[필수] 개인정보 수집이용 동의"
          onPress={() => {
            navigation.navigate("MembershipAgreeDesc", {
              title: "m2",
              type: "mandatoryTwo",
            });
          }}
          param="mandatoryTwo"
        />
      </View>
      <View style={styles.agreebottom}>
        <Text style={styles.agreetitle}>
          특별한 혜택과 최신 소식을 받아보세요
        </Text>
        <AgreeSentence
          text="[선택] 서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의"
          onPress={() => {
            navigation.navigate("MembershipAgreeDesc", {
              title: "s1",
              type: "selectiveOne",
            });
          }}
          param="selectiveOne"
        />
        <AgreeSentence
          text="[선택] 광고성 정보 수신동의"
          sns={true}
          onPress={() => {
            navigation.navigate("MembershipAgreeDesc", {
              title: "s2",
              stype: "all",
            });
          }}
          param="selectiveTwo"
        />
      </View>
    </>
  );
}

function MembershipRegisterBTN({ navigation }) {
  const { agreements } = useContext(MembershipContext);

  return (
    <Button
      title="휴대폰으로 인증하기"
      backgroundColor={Color.darkPurple}
      color={Color.white}
      height={62}
      onPress={() => {
        if (!agreements.mandatoryOne || !agreements.mandatoryTwo) {
          alert("필수동의를 확인해주세요");
          return;
        }
        navigation.navigate("MembershipInfo");
      }}
    />
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Color.white,
  },
  container: {
    flexDirection: "column",
    gap: 100,
    marginTop: 66,
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
    //paddingTop: 3.5,
    //paddingRight: 3,
    borderWidth: 1,
    borderColor: Color.gray,
    //backgroundColor: Color.purple,
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
