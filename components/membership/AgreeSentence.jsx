import React, { useContext, useState } from "react";
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
import Check from "../../assets/images/Check";
import { MembershipContext } from "../../context/MembershipContext";
import Button from "../common/Button";

export default function AgreeSentence(props) {
  const { agreements, stateHandler, twoAllChangeHandler } =
    useContext(MembershipContext);

  if (props.param === "selectiveTwo") {
    if (agreements["isSns"] && agreements["isEmail"] && agreements["isPhone"]) {
      return (
        <>
          <View style={styles.agreesentence}>
            <TouchableOpacity onPress={() => twoAllChangeHandler("none")}>
              <Check stroke={Color.darkPurple} width={24} height={24} />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View style={styles.agreemore}>
                <Text
                  style={{
                    ...styles.agreetext,
                    color: Color.black,
                  }}
                >
                  {props.text}
                </Text>
                {!props.arrow && <AngleRight />}
              </View>
            </TouchableWithoutFeedback>
            {props.sns && <AdAgree allagree={props.allagree} />}
          </View>
        </>
      );
    }
    return (
      <>
        <View style={styles.agreesentence}>
          <TouchableOpacity onPress={() => twoAllChangeHandler("all")}>
            <Check stroke={Color.gray} width={24} height={24} />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.agreemore}>
              <Text
                style={{
                  ...styles.agreetext,
                  color: Color.gray,
                }}
              >
                {props.text}
              </Text>
              {!props.arrow && <AngleRight />}
            </View>
          </TouchableWithoutFeedback>
          {props.sns && <AdAgree allagree={props.allagree} />}
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.agreesentence}>
        <TouchableOpacity onPress={() => stateHandler(props.param)}>
          <Check
            stroke={agreements[props.param] ? Color.darkPurple : Color.gray}
            width={24}
            height={24}
          />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <View style={styles.agreemore}>
            <Text
              style={{
                ...styles.agreetext,
                color: agreements[props.param] ? Color.black : Color.gray,
              }}
            >
              {props.text}
            </Text>
            {!props.arrow && <AngleRight />}
          </View>
        </TouchableWithoutFeedback>
        {props.sns && <AdAgree allagree={props.allagree} />}
      </View>
    </>
  );
}
function AdAgree(props) {
  const { agreements, stateHandler } = useContext(MembershipContext);

  return (
    <>
      <View style={styles.adagree}>
        <TouchableOpacity onPress={() => stateHandler("isSns")}>
          <Check
            stroke={agreements.isSns ? Color.darkPurple : Color.gray}
            width={24}
            height={24}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.adgree_text,
            color: agreements.isSns ? Color.black : Color.gray,
          }}
        >
          SMS
        </Text>
        <TouchableOpacity onPress={() => stateHandler("isEmail")}>
          <Check
            stroke={agreements.isEmail ? Color.darkPurple : Color.gray}
            width={24}
            height={24}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.adgree_text,
            color: agreements.isEmail ? Color.black : Color.gray,
          }}
        >
          이메일
        </Text>
        <TouchableOpacity onPress={() => stateHandler("isPhone")}>
          <Check
            stroke={agreements.isPhone ? Color.darkPurple : Color.gray}
            width={24}
            height={24}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.adgree_text,
            color: agreements.isPhone ? Color.black : Color.gray,
          }}
        >
          전화
        </Text>
      </View>
      <Text style={styles.adagree_desc}>
        재떨이 회사가 제공하는 서비스의 광고성 정보를 수신합니다.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  agreesentence: {
    position: "relative",
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
    //color: Color.gray,
  },
  adagree: {
    position: "absolute",
    flexDirection: "row",
    top: 32,
    left: 14,
  },
  adgree_text: {
    fontFamily: "Pretendard-Regular",
    fontSize: 13,
    color: Color.gray,
    marginLeft: 5,
    marginRight: 18,
  },
  adagree_desc: {
    position: "absolute",
    top: 65,
    left: 14,
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: Color.gray,
  },
});
