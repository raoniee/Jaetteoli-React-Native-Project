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
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import LocationImg from "../../assets/images/Location";
import List from "../../assets/images/List";
import { subscribeData } from "../../components/subscribe/dummy/dummy";
import MainStore from "../../components/main/MainStore";
import { baseUrl, jwt } from "../../utils/baseUrl";

const Main = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentAddress, setCurrentAddress] = useState(""); //내 현재 주소(휴대폰 위치)
  const [currentLocation, setCurrentLocation] = useState({
    //내 현재 경위도(휴대폰 위치)
  });
  const [mapBoundaries, setMapBoundaries] = useState(null); //지도 위아래 경위도 상태

  const [markerClicked, setMarkerClicked] = useState(false); //목록보기 상태
  const mapViewRef = useRef(null);
  const isFocused = useIsFocused();

  const handleMapReady = async () => {
    if (mapViewRef.current) {
      const boundaries = await mapViewRef.current.getMapBoundaries();
      setMapBoundaries(boundaries);
    }
  };

  useEffect(() => {
    // Do something with mapBoundaries, e.g. print the coordinates
    if (mapBoundaries) {
      console.log("");
      console.log("------------지도 꼭짓점-------------");
      console.log("최소 경도:", mapBoundaries.southWest.longitude);
      console.log("최소 위도:", mapBoundaries.southWest.latitude);
      console.log("최대 경도:", mapBoundaries.northEast.longitude);
      console.log("최대 위도:", mapBoundaries.northEast.latitude);
    }
  }, [mapBoundaries]);

  //내 위치 경위도를 주소로 변환하는 함수
  const getCurrentAddress = async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (location && location.length > 0) {
        const address = location[0];
        // console.log(address);
        setCurrentAddress(
          `${address.city} ${address.street} ${address.streetNumber}`
        );
      }
    } catch (error) {
      console.error("현재 주소를 가져오는 중 오류 발생:", error);
    }
  };

  //지도 중심 가게 마커 조회 api
  const fetchGetMarkerApi = async (latitude, longitude) => {
    try {
      // console.log(currentAddress);
      // console.log(
      //   `${baseUrl}/jat/app/stores/preview?query=울산 남구 대학로33번길 18-4`
      // );
      // const response = await fetch(
      //   `${baseUrl}/jat/app/stores/preview?query=울산 남구 대학로33번길 18-4`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "X-ACCESS-TOKEN": jwt,
      //     },
      //   }
      // );
      // const data = await response.json();
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  //탭네비게이션으로 홈 누를때
  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          console.log("");
          console.log("------------내 휴대폰--------------");
          console.log("isFocused 위치 호출");
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.error("위치 권한이 허용되지 않았습니다.");
            return;
          }

          //내 현재 위치 경위도 얻을 수 있는 함수
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;

          console.log(
            "내 휴대폰 위도 : ",
            latitude.toFixed(20),
            " / 내 휴대폰 경도 : ",
            longitude.toFixed(20)
          );
          handleMapReady(); //지도 꼭짓점 경위도 함수 호출

          setCurrentLocation({ latitude, longitude });
          getCurrentAddress(latitude, longitude);
          fetchGetMarkerApi(latitude, longitude); //지도 중심 가게 마커 조회 api 호출
        } catch (error) {
          console.error("현재 위치를 가져오는 중 오류 발생:", error);
        }
      })();
    }
  }, [isFocused]);

  //지도를 움직이고 멈출 떄의 함수
  const handleRegionChangeComplete = async (region) => {
    const center = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log("");
    console.log("------------지도 중심-------------");
    console.log(
      "지도 중심 위도 : ",
      center.latitude,
      "지도 중심 경도 : ",
      center.longitude
    );

    handleMapReady();
    fetchGetMarkerApi(center.latitude, center.longitude);
  };

  const lookStoreCloseHandler = () => {
    setMarkerClicked(false);
  };

  //지도 중심을 내 휴대폰 위치로 움직이는 함수
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
        console.log(
          "업뎃 내 휴대폰 위도 : ",
          latitude,
          "내 휴대폰 경도 : ",
          longitude
        );
        setCurrentLocation({ latitude, longitude }); //내 휴대폰 현재 경위도 업데이트
        getCurrentAddress(latitude, longitude); //내 휴대폰 현재 주소 업데이트
      }
    } catch (error) {
      console.error("현재 위치를 가져오는 중 오류 발생:", error);
    }
  };

  //목록보기 누를시 호출되는 함수
  const clickedStoreHandler = () => {
    setMarkerClicked(true);
  };

  //목록보기 눌렀을때의 함수
  const moveToStores = () => {
    navigation.navigate("Stores", { currentAddress: currentAddress });
  };

  //마커에서 하나 클릭한 가게가 나타났을때 클릭하면 가게 상세화면으로 이동하는 함수
  const moveToDetailStore = () => {
    //가게 상세-메뉴로 이동(가게 id넘겨줘야함)
    navigation.navigate("StoreDetailPage", {
      currentAddress: "울산 남구 대학로33번길 18-4",
      storeIdx: 2,
    });
  };

  const moveToSettingAddress = () => {
    navigation.navigate("InitAddress");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header left={1} right={1} title="오늘의 떨이" />
      {/* 주소 */}
      <View style={styles.myAddressContainer}>
        <Pressable onPress={moveToSettingAddress}>
          <LocationImg stroke={Color.darkPurple} />
          <Text style={styles.addressText}>{currentAddress}</Text>
        </Pressable>
      </View>

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
            onRegionChange={lookStoreCloseHandler}
            // onMapReady={handleMapReady}
            showsUserLocation
          >
            {/** 가게 마커 */}
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
        )}
      <View
        style={
          markerClicked ? styles.totalBottomContainer : styles.bottomContainer
        }
      >
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
        {markerClicked && (
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
    marginTop: -65,
  },
  myAddressContainer: {
    position: "relative",
    top: 0,
    flexDirection: "row",
    zIndex: 200,
    height: 45,
    marginTop: 20,
    marginHorizontal: 16,
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
  totalBottomContainer: {
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
