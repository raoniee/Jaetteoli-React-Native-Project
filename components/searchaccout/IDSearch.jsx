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
  Dimensions,
} from "react-native";
import Color from "../../assets/colors/Color";
import { MembershipContext } from "../../context/MembershipContext";
import Button from "../common/Button";
import CertificationSearchInput from "../login/CertificationSearchInput";
import SearchLoginInput from "../login/SearchLoginInput";

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get("window");

export default function IDSearch({ navigation }) {
  const { setSearchID } = useContext(MembershipContext);
  const [form, setForm] = useState({
    inputName: "",
    inputPhonenum: "",
    inputCertificationnum: "",
  });
  const [vaildName, setVaildName] = useState(true);
  const [vaildPhoneNum, setVaildPhoneNum] = useState(true);
  const [getnumber, setGetnumber] = useState(false);

  const takeName = (result) => {
    setForm({ ...form, inputName: result });
  };
  const takePhoneNum = (result) => {
    setForm({ ...form, inputPhonenum: result });
  };
  const takeCertificationNum = (result) => {
    setForm({ ...form, inputCertificationnum: result });
  };

  const handlePhoneBTN = async () => {
    //인증번호 받기 위한 로직
    if (!getnumber) {
      if (form.inputName === "" || form.inputPhonenum === "") {
        alert("입력칸을 확인해주세요");
        return;
      } else if (!vaildName) {
        return;
      } else if (!vaildPhoneNum) {
        return;
      }

      const requestBody = {
        phoneNum: form.inputPhonenum,
        name: form.inputName,
      };

      console.log(requestBody);
      try {
        const response = await fetch(
          "https://www.insung.shop/jat/app/users/uid-lost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        if (!data["isSuccess"]) {
          console.log(data["message"]);
          return;
        }
        setGetnumber(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      //인증번호 입력후의 로직
      const requestBody = {
        phoneNum: form.inputPhonenum,
        name: form.inputName,
        certificationNum: form.inputCertificationnum,
      };
      console.log(requestBody);

      try {
        const response = await fetch(
          "https://www.insung.shop/jat/app/users/uid-recovery",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        setSearchID(data.result);
        if (!data["isSuccess"]) {
          console.log("");
          return;
        }
        const nextstep = () => {
          navigation.navigate("IDshow");
        };
        nextstep();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <View style={{ ...styles.input_box, marginBottom: getnumber ? "" : 55 }}>
        <SearchLoginInput
          label="이름" //
          placeholder="이름 입력"
          vaildTest={() => {
            const name = form.inputName;
            const length = name.length >= 2;
            const kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(name);
            if (length && kor) {
              return setVaildName(true);
            } else {
              return setVaildName(false);
            }
          }}
          takeresult={takeName}
          alertresult={vaildName}
          alerttext="이름의 형식이 맞지 않습니다."
        />
        <SearchLoginInput
          label="휴대폰 번호"
          placeholder="-없이 휴대폰 번호 입력"
          keyboardType="number-pad"
          vaildTest={() => {
            const num = form.inputPhonenum;
            const result = /^\d{3}\d{4}\d{4}$/.test(num);
            if (result) {
              return setVaildPhoneNum(true);
            } else {
              return setVaildPhoneNum(false);
            }
          }}
          takeresult={takePhoneNum}
          alertresult={vaildPhoneNum}
          alerttext="휴대폰 번호(01012345678)의 형식이 맞지 않습니다."
        />
        {getnumber && (
          <CertificationSearchInput takeresult={takeCertificationNum} />
        )}
      </View>
      {!getnumber && (
        <Button
          onPress={handlePhoneBTN}
          title={"인증번호 받기"}
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
        />
      )}
      {getnumber && (
        <Button
          onPress={handlePhoneBTN}
          title={"다음"}
          backgroundColor={Color.darkPurple}
          color={Color.white}
          width={SCREEN_WIDTH - 40}
          height={62}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input_box: {
    marginTop: 80,
    width: SCREEN_WIDTH - 40,
  },
});
