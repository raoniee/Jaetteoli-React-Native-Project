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
import Button from "../common/Button";

export default function AgreeSentence(props) {
  return (
    <>
      <View style={styles.agreesentence}>
        <TouchableOpacity>
          <CheckOn />
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <View style={styles.agreemore}>
            <Text style={styles.agreetext}>{props.text}</Text>
            {!props.arrow && <AngleRight />}
          </View>
        </TouchableWithoutFeedback>
        {props.sns && <AdAgree />}
      </View>
    </>
  );
}
function AdAgree() {
  return (
    <>
      <View style={styles.adagree}>
        <TouchableOpacity>
          <CheckOn />
        </TouchableOpacity>
        <Text style={styles.adgree_text}>SMS</Text>
        <TouchableOpacity>
          <CheckOn />
        </TouchableOpacity>
        <Text style={styles.adgree_text}>이메일</Text>
        <TouchableOpacity>
          <CheckOn />
        </TouchableOpacity>
        <Text style={styles.adgree_text}>전화</Text>
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
    lineHeight: 20,
    marginLeft: 15,
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
    marginLeft: 8,
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
