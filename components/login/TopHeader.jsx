import React, { useContext, useState } from "react";
import Color from "../../assets/colors/Color";
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
import ArrowLeft from "../../assets/images/ArrowLeft";

export default function TopHeader(props) {
  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.arrow}>
          <ArrowLeft stroke={Color.darkGray} />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.right}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
  },
  arrow: {
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
  },
  right: {
    width: 25,
    height: 1,
  },
});
