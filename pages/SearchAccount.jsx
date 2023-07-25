import React, { useState } from "react";
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
import Color from "../assets/colors/Color";

import IDSearch from "../components/searchaccout/IDSearch";
import PWSearch from "../components/searchaccout/PWSearch";
import GoMembership from "../components/login/GoMembership";

export default function SearchAccunt() {
  const [option, setOption] = useState(true);

  const id = () => setOption(true);
  const pw = () => setOption(false);

  return (
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
      <GoMembership />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 128,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 354,
    height: 25,
  },
  search_option: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    width: 175,
    textAlign: "center",
    paddingBottom: 5,
  },
});
