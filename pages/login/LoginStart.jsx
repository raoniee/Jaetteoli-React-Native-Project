import React, { useState } from "react";
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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // 네비게이션 컨테이너
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Stack 네비게이션
import Button from "../../components/common/Button";
import Color from "../../assets/colors/Color";
import logo from "../../assets/images/logo.png";
import GoMembership from "../../components/login/GoMembership";
import Check from "../../assets/images/Check";

export default function LoginStart({ navigation }) {
  const [saveId, SetSaveId] = useState(false);

  const handleSaveId = () => SetSaveId((prev) => !prev);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.id_input}
          placeholder="아이디"
          keyboardType="ascii-capable"
          returnKeyType="done"
        />
        <TextInput
          style={styles.pw_input}
          placeholder="비밀번호"
          secureTextEntry={true}
          returnKeyType="done"
        />
        <View style={styles.login_option}>
          <View style={styles.idsave_wrap}>
            <TouchableOpacity onPress={handleSaveId}>
              <View
                style={{
                  ...styles.idsave_checkbox,
                  backgroundColor: saveId ? Color.purple : Color.white,
                  borderWidth: saveId ? 0 : 1,
                }}
              >
                <Check stroke={Color.white} width={21} height={21} />
              </View>
            </TouchableOpacity>
            <Text style={styles.idsave_text}>아이디 저장</Text>
          </View>
          <View>
            <TouchableWithoutFeedback>
              <Text style={styles.searchgo}>아이디_비밀번호 찾기</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Button
          title="로그인"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          margin="0 0 100 0"
          height={62}
        />
      </View>
      <GoMembership navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 140,
    marginHorizontal: 20,
  },
  logo: {
    width: 87,
    height: 26,
    marginBottom: 50,
  },
  id_input: {
    backgroundColor: Color.brightGray,
    width: "100%",
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 15,
  },
  pw_input: {
    backgroundColor: Color.brightGray,
    width: "100%",
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 28.5,
  },
  login_option: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 50,
  },
  idsave_wrap: {
    flexDirection: "row",
  },
  idsave_checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderColor: Color.gray,
    marginLeft: 10,
    marginRight: 10,
  },
  idsave_text: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 13,
    color: Color.gray,
    lineHeight: 21,
  },
  searchgo: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 13,
    color: Color.gray,
    lineHeight: 21,
  },
});
