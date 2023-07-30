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
  Dimensions,
} from "react-native";
import Color from "../../assets/colors/Color";

import IDSearch from "../../components/searchaccout/IDSearch";
import PWSearch from "../../components/searchaccout/PWSearch";
import GoMembership from "../../components/login/GoMembership";
import Header from "../../components/common/Header";
import NewPW from "../../components/searchaccout/NewPW";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function SearchAccunt() {
  const [option, setOption] = useState(true);

  const id = () => setOption(true);
  const pw = () => setOption(false);

  return (
    <SafeAreaView style={styles.wrap}>
      <Header title="아이디_비밀번호 찾기" right={0} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={id}>
            <View
              style={{
                borderBottomColor: option ? Color.darkPurple : "",
                borderBottomWidth: option ? 3 : "",
              }}
            >
              <Text
                style={{
                  ...styles.search_option,
                  color: option ? Color.black : Color.lightGray,
                }}
              >
                아이디 찾기
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={pw}>
            <View
              style={{
                borderBottomColor: !option ? Color.darkPurple : "",
                borderBottomWidth: !option ? 3 : "",
              }}
            >
              <Text
                style={{
                  ...styles.search_option,
                  color: !option ? Color.black : Color.lightGray,
                }}
              >
                비밀번호 찾기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {option ? <IDSearch /> : <PWSearch />}
        {/* <NewPW /> */}
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
    marginTop: 34,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: SCREEN_HIGHT / 35,
  },
  search_option: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    textAlign: "center",
    width: SCREEN_WIDTH / 2.3,
    paddingBottom: 5,
  },
});
