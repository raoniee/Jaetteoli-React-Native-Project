import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/common/Header";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView, { Circle } from "react-native-maps";
import CustomMarker from "../../components/map/CustomMarker";
import * as Location from "expo-location";
import _ from "lodash"; // lodash 라이브러리 가져오기
import Color from "../../assets/colors/Color";
import Gps from "../../assets/images/Gps";
import { useNavigation } from "@react-navigation/native";

const MapFind = () => {
  const navigation = useNavigation();
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.538377,
    longitude: 129.31136,
  });
  const mapViewRef = useRef(null);

  const getCurrentAddress = async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (location && location.length > 0) {
        const address = location[0];
        console.log(address);
        if (
          address.city === null ||
          address.street === null ||
          address.streetNumber === null
        ) {
          Alert.alert("조금만 더 움직여주세요", "hi", "예");
          return;
        }
        setCurrentAddress(
          `${address.city} ${address.street} ${address.streetNumber}`
        );
      }
    } catch (error) {
      console.error("현재 주소를 가져오는 중 오류 발생:", error);
    }
  };

  const debouncedGetCurrentAddress = _.debounce(getCurrentAddress, 100);

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
        setCurrentLocation({ latitude, longitude });
        getCurrentAddress(latitude, longitude);
      } catch (error) {
        console.error("현재 위치를 가져오는 중 오류 발생:", error);
      }
    })();
  }, []);

  const handleRegionChangeComplete = (region) => {
    const center = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    setCurrentLocation(center);

    // 디바운싱 적용: 지도 영역 변경이 멈춘 후 2000ms 이후에 주소 가져오기 함수 실행
    debouncedGetCurrentAddress(center.latitude, center.longitude);
  };
  // 화면 중심에 위치한 마커의 위도, 경도 정보
  const centerMarkerCoordinate = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
  };

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

  const moveToHome = () => {
    //api호출하기
    //home이동
    navigation.navigate("MainTabs", {
      screen: "Main", // MainTabs 내의 Main 스크린으로 이동
      params: { currentAddress: currentAddress },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header left={1} right={0} title="지도에서 주소 찾기" />

      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: 35.538377,
          longitude: 129.31136,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
      ></MapView>
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
          <Text style={styles.addressText}>{currentAddress}</Text>
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
