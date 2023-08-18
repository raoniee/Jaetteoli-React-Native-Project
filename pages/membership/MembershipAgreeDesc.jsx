import React, { useContext, useEffect, useState } from "react";
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
import AgreeDescm1 from "../../assets/data/agree_m1.json";
import AgreeDescm2 from "../../assets/data/agree_m2.json";
import AgreeDescs1 from "../../assets/data/agree_s1.json";
import AgreeDescs2 from "../../assets/data/agree_s2.json";
import {
  MembershipContext,
  MembershipProvider,
} from "../../context/MembershipContext";

export default function MembershipAgreeDesc({ navigation, route }) {
  const { title, type, stype } = route.params;
  const { descHandler, twoAllChangeHandler, agreements } =
    useContext(MembershipContext);

  // const result = AgreeDescm1.map((agree) => agree.title);
  // console.log(result);

  function titlevalue(val) {
    var result = "";
    switch (val) {
      case "mandatoryOne":
        result = AgreeDescm1.map((agree) => agree.title);
        break;
      case "mandatoryTwo":
        result = AgreeDescm2.map((agree) => agree.title);
        break;
      case "selectiveOne":
        result = AgreeDescs1.map((agree) => agree.title);
        break;
      case "all":
        result = AgreeDescs2.map((agree) => agree.title);
        break;
    }
    return result;
  }

  function descvalue(val) {
    var result = "";
    switch (val) {
      case "mandatoryOne":
        result = AgreeDescm1.map((agree) => agree.desc);
        break;
      case "mandatoryTwo":
        result = AgreeDescm2.map((agree) => agree.desc);
        break;
      case "selectiveOne":
        result = AgreeDescs1.map((agree) => agree.desc);
        break;
      case "all":
        result = AgreeDescs2.map((agree) => agree.desc);
        break;
    }
    return result;
  }

  // {
  //   descvalue(type);
  // }

  return (
    <SafeAreaView style={styles.wrap}>
      <Header
        title={() => {
          if (type) {
            titlevalue(type);
          } else {
            titlevalue(stype);
          }
        }}
        right={0}
      />
      <View style={styles.container}>
        <View style={styles.agreeinfo}>
          <View style={styles.datebox}>
            <Text style={styles.date}>07/20/2022</Text>
            <Text style={styles.date}>09:19:24 AM</Text>
          </View>
          <ScrollView style={styles.agreebox}>
            <Text style={styles.agreetext}>
              {() => {
                if (type) {
                  descvalue(type);
                } else {
                  descvalue(stype);
                }
              }}
            </Text>
          </ScrollView>
        </View>
        <Button
          title="동의합니다"
          backgroundColor={Color.darkPurple}
          color={Color.white}
          height={62}
          onPress={() => {
            if (type) {
              descHandler(type);
            } else {
              twoAllChangeHandler(stype);
            }
            navigation.navigate("MembershipStart");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Color.white,
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
