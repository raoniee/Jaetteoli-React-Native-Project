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
import MapView from "react-native-maps";
import CustomMarker from "../../components/map/CustomMarker";
import * as Location from "expo-location";
import _ from "lodash"; // lodash 라이브러리 가져오기
import Color from "../../assets/colors/Color";
import Gps from "../../assets/images/Gps";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import LocationImg from "../../assets/images/Location";
import List from "../../assets/images/List";
import { subscribeData } from "../../components/subscribe/dummy/dummy";
import MainStore from "../../components/main/MainStore";
import { baseUrl, jwt } from "../../utils/baseUrl";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeAddress } from "../../store/mapAddress";
import { myChangeAddress } from "../../store/myAddress";

const Main = () => {
  const navigation = useNavigation();
  const contextAddress = useSelector((state) => state.mapAddress);
  const dispatch = useDispatch();
  //내 현재 주소(휴대폰 위치)
  const [currentAddress, setCurrentAddress] = useState("");
  //내 현재 경위도(휴대폰 위치)
  const [currentLocation, setCurrentLocation] = useState({
    longitude: "",
    latitude: "",
  });
  const [myAddressLocation, setAddressLocation] = useState({});
  const [mapBoundaries, setMapBoundaries] = useState(null); //지도 위아래 경위도 상태
  const [markerData, setMarkerData] = useState([]);
  // center 변수 선언
  const [center, setCenter] = useState({
    latitude: currentLocation.latitude || 0,
    longitude: currentLocation.longitude || 0,
  });
  const [boundaries, setBoundaries] = useState({}); //꼭짓점 경위도 상태값

  const [markerClicked, setMarkerClicked] = useState(false); //목록보기 상태
  const [previewStore, setPreviewStore] = useState(null);
  const mapViewRef = useRef(null);
  const isFocused = useIsFocused();

  const handleMapReady = async () => {
    if (mapViewRef.current) {
      const boundaries = await mapViewRef.current.getMapBoundaries();
      setMapBoundaries(boundaries);
    }
  };

  useEffect(() => {
    if (mapBoundaries) {
      setBoundaries({
        maxLon: mapBoundaries.northEast.longitude, //최대 경도
        maxLat: mapBoundaries.northEast.latitude, //최대 위도
        minLon: mapBoundaries.southWest.longitude, //최소 경도
        minLat: mapBoundaries.southWest.latitude, //최소 위도
      });
    }
  }, [mapBoundaries]);

  //내 위치 경위도를 주소로 변환하는 함수
  const getCurrentAddressApi = async (latitude, longitude) => {
    try {
      //도로명 api 호출
      const response = await fetch(
        `${baseUrl}/jat/app/users/address?longitude=${parseFloat(
          longitude
        ).toFixed(12)}&latitude=${parseFloat(latitude).toFixed(12)}`,
        {
          method: "GET",
          headers: {
            "X-ACCESS-TOKEN": jwt,
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        Alert.alert("조금 더 이동시켜주세요.");
        return;
      }
      const result = await data.result;
      if (result.roadAddress === "좌표가 정확하지 않음.") {
        return;
      }
      setCurrentAddress(result.roadAddress);
    } catch (error) {}
  };

  //지도 중심 가게 마커 조회 api
  const fetchGetMarkerApi = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `${baseUrl}/jat/app/stores/address?max_lon=${boundaries.maxLon.toFixed(
          12
        )}&max_lat=${boundaries.maxLat.toFixed(
          12
        )}&min_lon=${boundaries.minLon.toFixed(
          12
        )}&min_lat=${boundaries.minLat.toFixed(12)}`,
        {
          method: "GET",
          headers: {
            "X-ACCESS-TOKEN": jwt,
          },
        }
      );
      const data = await response.json();
      if (!data.isSuccess) {
        console.log(data.message);
        return;
      }
      if (data.result.length === 0) {
        return;
      }
      setMarkerData(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  //탭네비게이션으로 홈 누를때
  useEffect(() => {
    if (isFocused) {
      const fetchCurrentLocationAndAddress = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.error("위치 권한이 허용되지 않았습니다.");
            return;
          }

          if (contextAddress.isChanged) {
            handleMapReady(); //지도 꼭짓점 경위도 함수 호출
            setCurrentLocation({
              latitude: contextAddress.latitude,
              longitude: contextAddress.longitude,
            });
            getCurrentAddressApi(
              contextAddress.latitude,
              contextAddress.longitude
            ); //지도 중심 경위도를 주소로 변환하는 api호출
            fetchGetMarkerApi(
              contextAddress.latitude,
              contextAddress.longitude
            ); //지도 중심 가게 마커 조회 api 호출
          } else {
            // 내 현재 위치 경위도 얻을 수 있는 함수
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            handleMapReady(); //지도 꼭짓점 경위도 함수 호출
            setAddressLocation({ latitude, longitude }); // 내 위치 초기화
            dispatch(
              myChangeAddress({
                longitude: longitude,
                latitude: latitude,
              })
            );
            setCurrentLocation({ latitude, longitude });
            getCurrentAddressApi(latitude, longitude); //지도 중심 경위도를 주소로 변환하는 api호출
            fetchGetMarkerApi(latitude, longitude); //지도 중심 가게 마커 조회 api 호출
          }
        } catch (error) {
          console.error("1", error);
        }
      };

      fetchCurrentLocationAndAddress();
    } else {
      setCurrentLocation({ longitude: "", latitude: "" });
    }
  }, [isFocused, contextAddress]);

  //지도를 움직이고 멈출 떄의 함수
  const handleRegionChangeComplete = async (region) => {
    const newCenter = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    setCenter(newCenter); // center 변수 업데이트

    handleMapReady();
    getCurrentAddressApi(
      parseFloat(newCenter.latitude),
      parseFloat(newCenter.longitude)
    ); //지도 중심 경위도를 주소로 변환하는 api호출
    fetchGetMarkerApi(newCenter.latitude, newCenter.longitude);
    dispatch(
      changeAddress({
        longitude: newCenter.longitude,
        latitude: newCenter.latitude,
      })
    );
  };

  const lookStoreCloseHandler = () => {
    setMarkerClicked(false);
    setPreviewStore(null)
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
        // console.log(
        //   "업뎃 내 휴대폰 위도 : ",
        //   latitude,
        //   "내 휴대폰 경도 : ",
        //   longitude
        // );
        setCurrentLocation({ latitude, longitude }); //내 휴대폰 현재 경위도 업데이트
        getCurrentAddressApi(latitude, longitude); //내 휴대폰 현재 주소 업데이트
      }
    } catch (error) {
      console.error("w", error);
    }
  };

  //가게 누를시 호출되는 함수
  const clickedStoreHandler = async (storeIdx) => {
    setMarkerClicked(true);
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const response = await fetch(
      `${baseUrl}/jat/app/stores/preview?storeIdx=${storeIdx}&longitude=${longitude}&latitude=${latitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-ACCESS-TOKEN": jwt,
        },
      }
    );
    const data = await response.json();
    if (!data.isSuccess) {
      console.log(data.message);
      return;
    }
    const result = await data.result;
    setPreviewStore(result);
  };

  //목록보기 눌렀을때의 함수
  const moveToStores = () => {
    console.log(center);
    
    navigation.navigate("Stores", { currentAddress: currentAddress });
  };

  //마커에서 하나 클릭한 가게가 나타났을때 클릭하면 가게 상세화면으로 이동하는 함수
  const moveToDetailStore = () => {
    //가게 상세-메뉴로 이동(가게 id넘겨줘야함)
    navigation.navigate("StoreDetailPage", {
      storeIdx: previewStore[0].storeIdx,
    });
  };

  const moveToSettingAddress = () => {
    navigation.navigate("InitAddress");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header left={0} right={1} title="오늘의 떨이" />
      {/* 주소 */}
      <Pressable
        onPress={moveToSettingAddress}
        style={styles.myAddressContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <LocationImg stroke={Color.darkPurple} />
          <Text style={styles.addressText}>{currentAddress}</Text>
        </View>
      </Pressable>

      {/** 구글 지도 */}
      {currentLocation.latitude !== "" && currentLocation.longitude !== "" && (
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
          showsUserLocation
        >
          {/** 가게 마커 */}
          {markerData.map((item) => (
            <Marker
              key={item.storeIdx}
              coordinate={{
                latitude: item.y,
                longitude: item.x,
              }}
              onPress={() => clickedStoreHandler(item.storeIdx)}
            >
              <CustomMarker title={item.storeName} />
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
        {markerClicked && previewStore && (
          <MainStore item={previewStore[0]} onPress={moveToDetailStore} />
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
    paddingLeft: 26,
    backgroundColor: Color.white,
    borderRadius: 30,
    alignItems: "center",
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
