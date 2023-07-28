import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/common/Header";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView, { Circle } from "react-native-maps";
import CustomMarker from "../../components/map/CustomMarker";
import { markerData } from "../../components/map/dummy/dummy";
import * as Location from "expo-location";
import _ from "lodash"; // lodash 라이브러리 가져오기
import Color from "../../assets/colors/Color";

const MapFind = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.538377,
    longitude: 129.31136,
  });

  const getCurrentAddress = async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (location && location.length > 0) {
        const address = location[0];
        setCurrentAddress(
          `${address.city} ${address.street} ${address.streetNumber}`
        );
        console.log("---------------");
        console.log(address);
        console.log(address.city, address.street, address.streetNumber);
        console.log(address.city, address.name);
        console.log("---------------");
      }
    } catch (error) {
      console.error("현재 주소를 가져오는 중 오류 발생:", error);
    }
  };

  const debouncedGetCurrentAddress = _.debounce(getCurrentAddress, 2000);

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

  return (
    <SafeAreaView style={styles.screen}>
      <Header left={1} right={0} title="지도에서 주소 찾기" />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.538377,
          longitude: 129.31136,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {markerData.map((item) => (
          <Marker
            key={item.key}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          >
            <CustomMarker title={item.title} />
          </Marker>
        ))}
      </MapView>
      <View pointerEvents="none" style={styles.addressContainer}>
        <CustomMarker title="중심" />
      </View>
      <Text style={styles.addressText}>{currentAddress}</Text>
    </SafeAreaView>
  );
};

export default MapFind;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addressText: {
    padding: 16,
    textAlign: "center",
    fontWeight: "bold",
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
});
