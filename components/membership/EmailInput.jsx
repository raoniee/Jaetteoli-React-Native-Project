import React, { useContext, useEffect, useState } from "react";
import Color from "../../assets/colors/Color";
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
//import ArrowDown from "../../assets/images/ArrowDown";
import DropDownPicker from "react-native-dropdown-picker";
import { MembershipContext } from "../../context/MembershipContext";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function EmailInput(props) {
  const { takeRusult, userInfo, setUserInfo } = useContext(MembershipContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "직접 입력", value: "0" },
    { label: "naver.com", value: "1" },
    { label: "gmail.com", value: "2" },
    { label: "daum.net", value: "3" },
    { label: "hanmail.net", value: "4" },
    { label: "nate.net", value: "5" },
  ]);
  const [fronttext, setFrontText] = useState("");
  const [backtext, setBackText] = useState("");
  const [fullEmail, setFullEmail] = useState("");

  useEffect(() => {
    switch (value) {
      case "0": {
        setBackText(backtext);
        break;
      }
      case "1": {
        setBackText("naver.com");
        break;
      }
      case "2": {
        setBackText("gmail.com");
        break;
      }
      case "3": {
        setBackText("daum.net");
        break;
      }
      case "4": {
        setBackText("hanmail.net");
        break;
      }
      case "5": {
        setBackText("nate.net");
        break;
      }
    }
    setUserInfo((prev) => ({
      ...prev,
      useremail: fronttext + "@" + backtext,
    }));
  }, [value, fronttext, backtext]);

  return (
    <>
      <Text style={styles.label}>이메일</Text>
      <View style={styles.frontemail}>
        <TextInput
          style={styles.halfinput}
          placeholder="이메일 앞자리"
          returnKeyType="done"
          onChangeText={(text) => setFrontText(text)}
          value={fronttext}
        />
        <Text style={styles.at}>@</Text>
        {value === null && (
          <TextInput style={styles.halfinput} placeholder="" readOnly="true" />
        )}
        {value === "0" && (
          <TextInput
            style={styles.halfinput}
            placeholder="직접 입력"
            returnKeyType="done"
            onChangeText={(text) => setBackText(text)}
            //value={backtext}
          />
        )}
        {value === "1" && (
          <TextInput
            style={styles.halfinput}
            placeholder="naver.com"
            readOnly="true"
          />
        )}
        {value === "2" && (
          <TextInput
            style={styles.halfinput}
            placeholder="gmail.com"
            readOnly="true"
          />
        )}
        {value === "3" && (
          <TextInput
            style={styles.halfinput}
            placeholder="daum.net"
            readOnly="true"
          />
        )}
        {value === "4" && (
          <TextInput
            style={styles.halfinput}
            placeholder="hanmail.net"
            readOnly="true"
          />
        )}
        {value === "5" && (
          <TextInput
            style={styles.halfinput}
            placeholder="nate.net"
            readOnly="true"
          />
        )}
      </View>
      <TouchableOpacity>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownDirection="BOTTOM"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            placeholder="이메일 선택"
            style={{
              borderWidth: 0,
              backgroundColor: Color.brightGray,
              height: 62,
              borderRadius: 30,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
            textStyle={{
              fontFamily: "Pretendard-Regular",
              fontSize: 14,
              color: Color.lightGray,
            }}
            dropDownContainerStyle={{
              borderWidth: 0,
              backgroundColor: "#EEEEEE",
              height: 130,
              paddingHorizontal: 10,
            }}
            // selectedItemContainerStyle={{
            //   backgroundColor: "#EEEEEE",
            // }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Color.gray,
    marginLeft: 20,
    marginBottom: 10,
  },
  frontemail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfinput: {
    backgroundColor: Color.brightGray,
    height: 62,
    borderRadius: 30,
    width: SCREEN_WIDTH - 235,
    paddingLeft: 20,
    marginBottom: 20,
  },
  at: {
    lineHeight: 62,
  },
  dropdown: {
    position: "relative",
    backgroundColor: Color.brightGray,
    height: 62,
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 20,
  },
  // dropdown_menu: {
  //   lineHeight: 62,
  //   color: Color.lightGray,
  //   fontFamily: "Pretendard-Regular",
  //   fontSize: 14,
  // },
  // arrowdown: {
  //   position: "absolute",
  //   top: 20,
  //   right: 21,
  // },
});
