import {Dimensions, SafeAreaView} from "react-native";
import Header from "../../components/common/Header";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import React from "react";
import {CustomMarker} from "./StoreDetailPage";
import styled from "styled-components/native";
import Constants from "expo-constants";

// 안드로이드
//const statusBarHeight = Constants.statusBarHeight;
//const windowHeight = Dimensions.get('window').height;

// IOS
const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = windowHeight - statusBarHeight;

export default function StoreMapPage() {

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
                        latitude: 35.5421,
                        longitude: 129.2593,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    legalLabelInsets={{ bottom: -500 }} // 이 부분이 추가된 것입니다.
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker
                        coordinate={{
                            latitude: 35.5421,
                            longitude: 129.2593,
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
