// react-native, expo
import React from "react";
import {SafeAreaView} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {useRoute} from "@react-navigation/native";
// redux
// utils
import {totalHeight} from 'utils/dimensions'
// styles
import styled from "styled-components/native";
// components
import Header from "components/common/Header";
import CustomMarker from "components/Heo/CustomMarker";

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