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
import GoMembership from "../components/login/GoMembership";
import LoginHeader from "../components/login/LoginHeader";

import IDSearch from "../components/searchaccout/IDSearch";

export default function SearchAccunt() {
  return (
    <View style={styles.container}>
      <LoginHeader />
      <IDSearch />
      <GoMembership />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  input_box: {
    marginTop: 100, //
    width: 354,
  },
});
