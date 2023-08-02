import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/common/Header";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps";
import CustomMarker from "../../components/map/CustomMarker";
import * as Location from "expo-location";
import _ from "lodash"; // lodash 라이브러리 가져오기
import Color from "../../assets/colors/Color";
import Gps from "../../assets/images/Gps";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../../utils/baseUrl";
import { useDispatch } from "react-redux";
import { changeAddress } from "../../store/mapAddress";


const MapFind = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  //지도 중심 주소
  const [currentAddress, setCurrentAddress] = useState({
    locAddress: "",
    roadAddress: "",
  });

  //지도 중심 경위도
  const [currentLocation, setCurrentLocation] = useState({
  });
  const mapViewRef = useRef(null);

  //내 위치 경위도를 주소로 변환하는 함수
  const getCurrentAddress = async (latitude, longitude) => {
    try {
      //도로명 api 호출

      /* const response = await fetch(`${baseUrl}/jat/app/users/address?longitude=${longitude.toFixed(12)}&latitude=${latitude.toFixed(12)}`, {
      method:'GET',
      headers:{
        'X-ACCESS-TOKEN' : jwt
      }
    })

    const data = await response.json();
    const result = await data.result; */

      // "locAddress": "울산 남구 무거동 272-1",
      // "roadAddress": "울산광역시 남구 굴화3길 3"

      console.log(
        `api 호출 ${baseUrl}/jat/app/users/address?longitude=${longitude.toFixed(
          12
        )}&latitude=${latitude.toFixed(12)}`
      );
      setCurrentAddress({
        locAddress: "울산 남구 무거동 272-1",
        roadAddress: "울산광역시 남구 굴화3길 3",
      });
      setCurrentLocation({
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {
      console.error("현재 주소를 가져오는 중 오류 발생:", error);
    }
  };

  //화면 처음 열때
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("위치 권한이 허용되지 않았습니다.");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        // setCurrentLocation({ latitude, longitude }); //지도 안불러와지면 이 부분 주석 제거해보기
        getCurrentAddress(latitude, longitude);
      } catch (error) {
        console.error("현재 위치를 가져오는 중 오류 발생:", error);
      }
    })();
  }, []);

  //지도가 움직이다가 완전히 멈췄을때
  const handleRegionChangeComplete = async (region) => {
    const center = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    getCurrentAddress(center.latitude, center.longitude);
  };

  //Gps 버튼 클릭했을때 내 휴대폰 위치로 이동
  const moveMyPoint = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 휴대폰의 현재 위치로 지도 이동
      if (mapViewRef.current) {
        mapViewRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    } catch (error) {
      console.error("현재 위치를 가져오는 중 오류 발생:", error);
    }
  };

  //메인화면으로 이동
  const moveToHome = () => {

    dispatch(
      changeAddress({
        locAddress: "울산 남구 무거동 272-1",
        roadAddress: "지도에서 찾기",
        longitude: 129.262584287123,
        latitude: 35.5555834682686,
      })
    );

    navigation.navigate("MainTabs", {
      screen: "Main", // MainTabs 내의 Main 스크린으로 이동
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header left={1} right={0} title="지도에서 주소 찾기" />

      {/** 구글 지도 */}
      {currentLocation.latitude !== undefined &&
        currentLocation.longitude !== undefined && (
          <MapView
            ref={mapViewRef}
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude || 0,
              longitude: currentLocation.longitude || 0,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            provider={PROVIDER_GOOGLE}
            onRegionChangeComplete={handleRegionChangeComplete}
          ></MapView>
        )}
      <View pointerEvents="none" style={styles.addressContainer}>
        <CustomMarker title="" />
      </View>

      <Pressable
        onPress={moveMyPoint}
        android_ripple={{ color: Color.lightPurple }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <View
          style={[
            styles.myPointContainer,
            Platform.OS === "ios"
              ? styles.shadowSettiongIOS
              : styles.shadowSettingAndroid,
          ]}
        >
          <Gps stroke={Color.darkGray} />
        </View>
      </Pressable>
      <View
        style={[
          styles.modalContainer,
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
      >
        <View style={styles.modalContent}>
          <Text style={styles.addressText}>{currentAddress.locAddress}</Text>
          <Pressable
            onPress={moveToHome}
            android_ripple={{ color: Color.lightPurple }}
            style={({ pressed }) => pressed && styles.pressedItem}
          >
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>선택한 위치로 설정</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapFind;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.white,
  },
  map: {
    flex: 1,
  },
  addressText: {
    padding: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  myPointContainer: {
    position: "absolute",
    bottom: 220,
    zIndex: 100,
    marginBottom: 15,
    right: 0,
    marginRight: 20,
    width: 45,
    height: 45,
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22.5,
  },
  addressContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  modalContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: 220,
    backgroundColor: Color.white,
    zIndex: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  shadowIOS: {
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  shadowAndroid: {
    elevation: 4,
  },
  pressedItem: {
    opacity: 0.75,
  },
  addressText: {
    marginTop: 50,
    marginLeft: 40,
    marginBottom: 35,
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
  },
  settingContainer: {
    marginHorizontal: 20,
    backgroundColor: Color.darkPurple,
    borderRadius: 30,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  settingText: {
    fontFamily: "Pretendard-SemiBold",
    color: Color.white,
    fontSize: 16,
  },
  shadowSettiongIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  shadowSettingAndroid: {
    elevation: 6,
  },
});
