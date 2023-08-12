import {Dimensions, Platform, SafeAreaView} from "react-native";
import Header from "../../components/common/Header";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import React, {useEffect, useState} from "react";
import {CustomMarker} from "./StoreDetailPage";
import styled from "styled-components/native";
import Constants from "expo-constants";
import {useRoute} from "@react-navigation/native";

const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = Platform.OS === 'ios' ? windowHeight : windowHeight - statusBarHeight;

export default function StoreMapPage() {
    const route = useRoute()
    const {latitude, longitude} = route.params

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <Header left={1} right={1} backgroundColor='white' title='지도보기'/>
            <Container>
                <MapView
                    style={{
                        flex: 1, // MapView가 부모 컨테이너에 맞게 확장됩니다.
                        overflow: 'hidden', // borderRadius를 적용할 때 오버플로우를 숨깁니다.
                    }}
                    initialRegion={{
                        latitude: latitude,
                        longitude:  longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    legalLabelInsets={{ bottom: -500 }} // 이 부분이 추가된 것입니다.
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                >
                    <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                        }}
                    >
                        <CustomMarker />
                    </Marker>
                </MapView>
            </Container>

        </SafeAreaView>
    )
}

const Container = styled.View`
  width: 100%;
  height: ${totalHeight - 44}px;
`


const CurrentLocation = styled.View`
  width: 13px;
  height: 13px;
`