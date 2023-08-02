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
} from "react-native";
import Checkbox from "expo-checkbox";
import Button from "../../components/common/Button";
import Color from "../../assets/colors/Color";
import AgreeSentence from "../../components/membership/AgreeSentence";
import Header from "../../components/common/Header";
import Check from "../../assets/images/Check";
import { AgreeContext, AgreeProvider } from "../../context/AgreeContext";

export default function MembershipStart({ navigation }) {
  return (
    <AgreeProvider>
      <SafeAreaView style={styles.wrap}>
        <Header title="회원가입" right={0} />
        <View style={styles.container}>
          <View>
            <AllAgreeContent />
            <SingleAgreesContent />
          </View>
          <Button
            title="휴대폰으로 인증하기"
            backgroundColor={Color.darkPurple}
            color={Color.white}
            //margin="0 0 600 0"
            height={62}
            onPress={() => {
              navigation.navigate("MembershipInfo");
            }}
          />
        </View>
      </SafeAreaView>
    </AgreeProvider>
  );
}

function AllAgreeContent() {
  const { allagree, handleAllagree } = useContext(AgreeContext);
  //const [isChecked, setChecked] = useState(false);

  return (
    <>
      <Text style={styles.title}>재떨이 고객님 회원가입을 시작합니다.</Text>
      <View style={styles.allagreebox}>
        <TouchableOpacity onPress={handleAllagree}>
          <Checkbox
            style={styles.allagreecheck}
            value={allagree}
            onValueChange={(value) => handleAllagree(value)}
            color={allagree ? Color.purple : undefined}
          />
        </TouchableOpacity>
        <Text style={styles.allagreetext}>전체동의</Text>
      </View>
    </>
  );
}

function SingleAgreesContent() {
  const { allagree, handleAllagree } = useContext(AgreeContext);

  return (
    <>
      <View style={styles.agreetop}>
        <Text style={styles.agreetitle}>
          서비스 이용을 위해 동의가 필요합니다.
        </Text>
        <AgreeSentence
          text="[필수] 이용약관 동의"
          allagree={allagree}
          onPress={() => {
            navigation.navigate("MembershipAgree");
          }}
        />
        <AgreeSentence
          text="[필수] 개인정보 수집이용 동의"
          allagree={allagree}
          onPress={() => {
            navigation.navigate("MembershipAgree");
          }}
        />
      </View>
      <View style={styles.agreebottom}>
        <Text style={styles.agreetitle}>
          특별한 혜택과 최신 소식을 받아보세요
        </Text>
        <AgreeSentence
          text="[선택] 서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의"
          allagree={allagree}
          //arrow={true}
          onPress={() => {
            navigation.navigate("MembershipAgree");
          }}
        />
        <AgreeSentence
          text="[선택] 광고성 정보 수신동의"
          sns={true}
          allagree={allagree}
          onPress={() => {
            navigation.navigate("MembershipAgree");
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
