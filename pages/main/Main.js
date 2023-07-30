import React, { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/common/Header";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import CustomMarker from "../../components/map/CustomMarker";
import { markerData } from "../../components/map/dummy/dummy";
import * as Location from "expo-location";
import _ from "lodash"; // lodash 라이브러리 가져오기
import Color from "../../assets/colors/Color";
import Gps from "../../assets/images/Gps";
import { useNavigation } from "@react-navigation/native";
import LocationImg from "../../assets/images/Location";
import List from "../../assets/images/List";
import { subscribeData } from "../../components/subscribe/dummy/dummy";
import MainStore from "../../components/main/MainStore";

const Main = ({ route }) => {
  const navigation = useNavigation();
  const [currentAddress, setCurrentAddress] = useState(
    route.params.currentAddress
  );
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.538377,
    longitude: 129.31136,
  });
  const [listClicked, setListClicked] = useState(false);
  const mapViewRef = useRef(null);

  useEffect(() => {
    //지도 마커 찍기 api호출
    console.log("지도 마커 찍기 api호출");
  }, []);

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

    // setCurrentLocation(center);
    // debouncedGetCurrentAddress(center.latitude, center.longitude);
  };

  const lookStoreCloseHandler = () => {
    setListClicked(false);
  };

  // 화면 중심에 위치한 마커의 위도, 경도 정보 (쓸 필요있으면)
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
        setCurrentLocation({ latitude, longitude }); // Update the state to reflect the new location
        getCurrentAddress(latitude, longitude); // Update the address based on the new location
      }
    } catch (error) {
      console.error("현재 위치를 가져오는 중 오류 발생:", error);
    }
  };

  const clickedStoreHandler = () => {
    setListClicked(true);
  };

  const moveToStores = () => {
    navigation.navigate("Stores", { currentAddress: currentAddress });
  };

  const moveToDetailStore = () => {
    //가게 상세-메뉴로 이동(가게 id넘겨줘야함)
    navigation.navigate("StoreDetailPage", { id: "hi" });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header left={1} right={1} title="오늘의 떨이" />
      {/* 주소 */}
      <View style={styles.myAddressContainer}>
        <LocationImg stroke={Color.darkPurple} />
        <Text style={styles.addressText}>{currentAddress}</Text>
      </View>
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
        onRegionChange={lookStoreCloseHandler}
        showsUserLocation
      >
        {markerData.map((item) => (
          <Marker
            key={item.key}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            onPress={clickedStoreHandler}
          >
            <CustomMarker title={item.title} />
          </Marker>
        ))}
      </MapView>
      <View style={listClicked ? styles.totalBottomContainer : styles.bottomContainer}>
        <Pressable
          onPress={moveToStores}
          android_ripple={{ color: Color.lightPurple }}
          style={({ pressed }) => pressed && styles.pressedItem}
        >
          <View
            style={[
              styles.lookListContainer,
              Platform.OS === "ios"
                ? styles.shadowSettiongIOS
                : styles.shadowSettingAndroid,
            ]}
          >
            <List stroke={Color.purple} />
            <Text style={styles.listText}>목록보기</Text>
          </View>
        </Pressable>
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
        {listClicked && (
          <MainStore item={subscribeData[0]} onPress={moveToDetailStore} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Main;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.white,
  },
  map: {
    flex: 1,
  },
  myAddressContainer: {
    position: "absolute",
    top: 120,
    flexDirection: "row",
    zIndex: 200,
    left: 16,
    right: 16,
    height: 45,
    paddingVertical: 10,
    backgroundColor: Color.white,
    borderRadius: 30,
    alignItems: "center",
    paddingLeft: 26,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addressText: {
    marginLeft: 10,
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
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
  bottomContainer: {
    position: "relative",
    bottom: 120,
  },
  totalBottomContainer:{
    position: "relative",
    bottom: 370,
  },
  myPointContainer: {
    position: "absolute",
    top: 0,
    right: 16,
    width: 45,
    height: 45,
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22.5,
  },
  lookListContainer: {
    position: "absolute",
    top: 0,
    left: 16,
    flexDirection: "row",
    height: 45,
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  listText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    color: Color.black,
    marginLeft: 5,
  },
});
