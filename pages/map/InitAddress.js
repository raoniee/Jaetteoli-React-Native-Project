import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable } from "react-native";
import DaumPostcode from "@actbase/react-daum-postcode";
import Color from "../../assets/colors/Color";
import SearchImg from "../../assets/images/SearchImg";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/common/Header";
import AddressHeader from "../../components/map/AddressHeader";
import { baseUrl } from "../../utils/baseUrl";
import { useDispatch } from "react-redux";
import { changeAddress } from "../../store/mapAddress";
import { getToken } from "../../utils/Cookie";

const InitAddress = () => {
  const navigation = useNavigation();
  const [showPostcode, setShowPostcode] = useState(false);
  const dispatch = useDispatch();

  const [jwt, setJwt] = useState(""); // 토큰 상태 추가

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setJwt(fetchedToken);
    };

    fetchToken();
  }, []);

  // 우편 서비스 화면 표시/숨김 상태를 토글
  const togglePostcode = () => {
    setShowPostcode((prev) => !prev);
  };

  // 우편 서비스에서 주소를 선택했을 때
  const handleAddressSelected = async (selectedAddress) => {
    //도로명 api 호출

    const response = await fetch(`${baseUrl}/jat/app/users/address?location=${selectedAddress.roadAddress}`, {
      method:'GET',
      headers:{
        'X-ACCESS-TOKEN' : jwt
      }
    })

    const data = await response.json();
    const result = await data.result;

    // setShowPostcode(false); //다시 돌아올때 상태
    dispatch(
      changeAddress({
        longitude: result.longitude,
        latitude: result.latitude,
      })
    );
    navigation.navigate("MainTabs", {
      screen: "Main", // MainTabs 내의 Main 스크린으로 이동
    });
  };

  const moveToSelectMap = () => {
    //api 호출하기
    navigation.navigate("MapFind");
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showPostcode && (
        <View>
          <Header left={1} right={0} title="주소설정" />
          <View style={styles.searchOuterContainer}>
            <Pressable onPress={togglePostcode}>
              <View style={styles.searchContainer}>
                <View style={styles.searchImg}>
                  <SearchImg stroke={Color.gray} />
                </View>
                <Text style={styles.searchInputContainerLightGray}>
                  건물명, 도로명 또는 지번으로 검색
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={moveToSelectMap}>
              <View style={styles.currentMap}>
                <Text style={styles.currentMapText}>현재 위치로 주소 찾기</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.line}></View>
          <View style={styles.searchMethodContainer}>
            <View>
              <Text style={styles.searchMethodText}>이렇게 검색해보세요.</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>도로명 + 건물번호</Text>
              <Text style={styles.exampleText}>
                예시) 울산광역시 남구 대학로 93
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>지역명(동/리) + 번지</Text>
              <Text style={styles.exampleText}>
                예시) 울산광역시 남구 무거동 665-0
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>
                지역명(동/리) + 건물명(아파트명)
              </Text>
              <Text style={styles.exampleText}>
                예시) 울산광역시 울산대학교
              </Text>
            </View>
          </View>
        </View>
      )}
      {/* 우편 서비스 화면 */}
      {showPostcode && (
        <View>
          <AddressHeader title="주소설정" onLeftPress={togglePostcode} />
          <DaumPostcode
            style={styles.postcode}
            onSelected={handleAddressSelected}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  searchOuterContainer: {
    paddingTop: 30,
    marginHorizontal: 26,
    paddingBottom: 35,
  },
  searchContainer: {
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.darkGray,
  },
  searchImg: {
    marginLeft: 26,
    marginVertical: 10,
  },
  searchInputContainerLightGray: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: 500,
    color: Color.lightGray,
  },
  currentMap: {
    marginTop: 18,
    alignItems: "flex-end",
  },
  currentMapText: {
    textDecorationLine: "underline",
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: Color.darkGray,
  },
  line: {
    width: "100%",
    height: 20,
    backgroundColor: Color.middlePurple,
  },
  searchMethodContainer: {
    paddingLeft: 20,
    paddingTop: 25,
  },
  searchMethodText: {
    color: "#2F2F38",
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
  },
  contentContainer: {
    marginTop: 20,
  },
  titleText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
  },
  exampleText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Color.gray,
    marginTop: 3,
  },
  postcode: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default InitAddress;
