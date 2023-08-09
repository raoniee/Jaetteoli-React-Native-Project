import Header from "../../components/common/Header";
import {Animated, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import * as Clipboard from 'expo-clipboard';
import styled from "styled-components/native";
import { Path, Svg, WithLocalSvg} from "react-native-svg";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapLocationSVG from "../../assets/images/map-location.svg";
import React, {useCallback, useEffect, useRef, useState} from "react";
import DownSVG from "../../assets/images/down.svg";
import WarningSVG from "../../assets/images/warning.svg";
import ArrowRightSVG from "../../assets/images/arrow_right.svg";
import SortBySVG from "../../assets/images/sort_by.svg";
import CheckSVG from "../../assets/images/check.svg";
import CustomModal from "../../components/modal/CustomModal";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import { basketAddAction } from "../../store/basketAdd";
import {useDispatch, useSelector} from "react-redux";
import {baseUrl, jwt} from "../../utils/baseUrl";
import CustomModaless from "../../components/modal/CustomModaless";

export default function StoreDetailPage({navigation}) {
    const [ storeState, setStoreState ] = useState({
        storeIdx: null,
        storeName: null,
        storePhone: null,
        x: null,
        y: null,
        storeAddress: null,
        distance: null,
        duration: null,
        starAvg: null,
        subscribeCount: null,
        detailIngredientInfo: null,
        subscribeCheck: null
    });
    const [ selected, setSelected ] = useState(1);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ sortBy, setSortBy ] = useState(1);
    const [ sortByTouch, setSortByTouch ] = useState(1);
    const dispatch = useDispatch()
    const basketAdd = useSelector(({basketAdd}) => basketAdd.add)
    const userLocation = useSelector(({mapAddress}) => mapAddress)
    const route = useRoute();
    const { storeIdx } = route.params;

    useEffect(() => {
        getStoreState()
    }, [])

    const getStoreState = () => {
        const apiUrl = baseUrl+`/jat/app/stores/info?storeIdx=${storeIdx}&longitude=${userLocation.longitude ? userLocation.longitude : 0}&latitude=${userLocation.latitude ? userLocation.latitude : 0}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'X-ACCESS-TOKEN': jwt,
            },
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000){
                    setStoreState(data.result)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const postSubscribe = (check) => {
        const apiUrl = baseUrl+`/jat/app/subscription`;
        const requestOptions = {
            method: 'POST',
            headers: {
                'X-ACCESS-TOKEN': jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeIdx: storeIdx,
                yn: check
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000){
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }




    const CheckComponent = () => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
                d="M5 11.917L9.724 16.5L19 7.5"
                stroke="#604EF8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </Svg>
    )



    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <Header left={1} right={1} backgroundColor='white'/>
            <Container
                showsVerticalScrollIndicator={false}
                data={[{id: 1}]}
                renderItem={() => (
                    <StoreDetailWrapper>
                        <StoreInformationSection>
                            <StoreNameSection>
                                <StoreNameText>
                                    {storeState.storeName}
                                </StoreNameText>
                                <StoreRatingSection>
                                    <EmptyView>

                                        <EmptyView percentage={storeState.starAvg * 10}>
                                            <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <Path d="M20.0968 9.32291C20.0168 9.07281 19.8679 8.85035 19.6671 8.68107C19.4664 8.51179 19.222 8.40256 18.962 8.36591L14.3319 7.69308L12.2611 3.49749C12.1451 3.26201 11.9654 3.06371 11.7425 2.92505C11.5196 2.78638 11.2623 2.71289 10.9998 2.71289C10.7373 2.71289 10.48 2.78638 10.2571 2.92505C10.0342 3.06371 9.8545 3.26201 9.73846 3.49749L7.66771 7.69308L3.03763 8.36591C2.77764 8.40353 2.53337 8.51317 2.33248 8.68244C2.13158 8.8517 1.98208 9.07382 1.9009 9.32366C1.81972 9.5735 1.8101 9.84107 1.87313 10.0961C1.93616 10.3511 2.06932 10.5834 2.25754 10.7667L5.60888 14.0327L4.81779 18.6445C4.7729 18.9032 4.80145 19.1693 4.9002 19.4127C4.99895 19.656 5.16394 19.8667 5.37644 20.021C5.58894 20.1753 5.84043 20.2669 6.10237 20.2854C6.36431 20.3039 6.62619 20.2486 6.85829 20.1258L10.9998 17.9469L15.1413 20.124C15.3735 20.2461 15.6353 20.3009 15.897 20.282C16.1588 20.2631 16.41 20.1714 16.6223 20.0172C16.8346 19.8629 16.9995 19.6524 17.0984 19.4093C17.1973 19.1663 17.2262 18.9004 17.1818 18.6417L16.3907 14.0309L19.742 10.7667C19.9312 10.5839 20.0648 10.3514 20.1276 10.0959C20.1903 9.8405 20.1797 9.57254 20.0968 9.32291Z"
                                                      fill="#F6C844"/>
                                            </Svg>
                                        </EmptyView>
                                    </EmptyView>
                                    <EmptyView>
                                        <EmptyView percentage={storeState.starAvg > 1 ? (storeState.starAvg - 1) * 10 : 0}>
                                            <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <Path d="M20.0968 9.32291C20.0168 9.07281 19.8679 8.85035 19.6671 8.68107C19.4664 8.51179 19.222 8.40256 18.962 8.36591L14.3319 7.69308L12.2611 3.49749C12.1451 3.26201 11.9654 3.06371 11.7425 2.92505C11.5196 2.78638 11.2623 2.71289 10.9998 2.71289C10.7373 2.71289 10.48 2.78638 10.2571 2.92505C10.0342 3.06371 9.8545 3.26201 9.73846 3.49749L7.66771 7.69308L3.03763 8.36591C2.77764 8.40353 2.53337 8.51317 2.33248 8.68244C2.13158 8.8517 1.98208 9.07382 1.9009 9.32366C1.81972 9.5735 1.8101 9.84107 1.87313 10.0961C1.93616 10.3511 2.06932 10.5834 2.25754 10.7667L5.60888 14.0327L4.81779 18.6445C4.7729 18.9032 4.80145 19.1693 4.9002 19.4127C4.99895 19.656 5.16394 19.8667 5.37644 20.021C5.58894 20.1753 5.84043 20.2669 6.10237 20.2854C6.36431 20.3039 6.62619 20.2486 6.85829 20.1258L10.9998 17.9469L15.1413 20.124C15.3735 20.2461 15.6353 20.3009 15.897 20.282C16.1588 20.2631 16.41 20.1714 16.6223 20.0172C16.8346 19.8629 16.9995 19.6524 17.0984 19.4093C17.1973 19.1663 17.2262 18.9004 17.1818 18.6417L16.3907 14.0309L19.742 10.7667C19.9312 10.5839 20.0648 10.3514 20.1276 10.0959C20.1903 9.8405 20.1797 9.57254 20.0968 9.32291Z"
                                                      fill="#F6C844"/>
                                            </Svg>
                                        </EmptyView>
                                    </EmptyView>
                                    <EmptyView>
                                        <EmptyView percentage={storeState.starAvg > 2 ? (storeState.starAvg - 2) * 10 : 0}>
                                            <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <Path d="M20.0968 9.32291C20.0168 9.07281 19.8679 8.85035 19.6671 8.68107C19.4664 8.51179 19.222 8.40256 18.962 8.36591L14.3319 7.69308L12.2611 3.49749C12.1451 3.26201 11.9654 3.06371 11.7425 2.92505C11.5196 2.78638 11.2623 2.71289 10.9998 2.71289C10.7373 2.71289 10.48 2.78638 10.2571 2.92505C10.0342 3.06371 9.8545 3.26201 9.73846 3.49749L7.66771 7.69308L3.03763 8.36591C2.77764 8.40353 2.53337 8.51317 2.33248 8.68244C2.13158 8.8517 1.98208 9.07382 1.9009 9.32366C1.81972 9.5735 1.8101 9.84107 1.87313 10.0961C1.93616 10.3511 2.06932 10.5834 2.25754 10.7667L5.60888 14.0327L4.81779 18.6445C4.7729 18.9032 4.80145 19.1693 4.9002 19.4127C4.99895 19.656 5.16394 19.8667 5.37644 20.021C5.58894 20.1753 5.84043 20.2669 6.10237 20.2854C6.36431 20.3039 6.62619 20.2486 6.85829 20.1258L10.9998 17.9469L15.1413 20.124C15.3735 20.2461 15.6353 20.3009 15.897 20.282C16.1588 20.2631 16.41 20.1714 16.6223 20.0172C16.8346 19.8629 16.9995 19.6524 17.0984 19.4093C17.1973 19.1663 17.2262 18.9004 17.1818 18.6417L16.3907 14.0309L19.742 10.7667C19.9312 10.5839 20.0648 10.3514 20.1276 10.0959C20.1903 9.8405 20.1797 9.57254 20.0968 9.32291Z"
                                                      fill="#F6C844"/>
                                            </Svg>
                                        </EmptyView>
                                    </EmptyView>
                                    <EmptyView>
                                        <EmptyView percentage={storeState.starAvg > 3 ? (storeState.starAvg - 3) * 10 : 0}>
                                            <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <Path d="M20.0968 9.32291C20.0168 9.07281 19.8679 8.85035 19.6671 8.68107C19.4664 8.51179 19.222 8.40256 18.962 8.36591L14.3319 7.69308L12.2611 3.49749C12.1451 3.26201 11.9654 3.06371 11.7425 2.92505C11.5196 2.78638 11.2623 2.71289 10.9998 2.71289C10.7373 2.71289 10.48 2.78638 10.2571 2.92505C10.0342 3.06371 9.8545 3.26201 9.73846 3.49749L7.66771 7.69308L3.03763 8.36591C2.77764 8.40353 2.53337 8.51317 2.33248 8.68244C2.13158 8.8517 1.98208 9.07382 1.9009 9.32366C1.81972 9.5735 1.8101 9.84107 1.87313 10.0961C1.93616 10.3511 2.06932 10.5834 2.25754 10.7667L5.60888 14.0327L4.81779 18.6445C4.7729 18.9032 4.80145 19.1693 4.9002 19.4127C4.99895 19.656 5.16394 19.8667 5.37644 20.021C5.58894 20.1753 5.84043 20.2669 6.10237 20.2854C6.36431 20.3039 6.62619 20.2486 6.85829 20.1258L10.9998 17.9469L15.1413 20.124C15.3735 20.2461 15.6353 20.3009 15.897 20.282C16.1588 20.2631 16.41 20.1714 16.6223 20.0172C16.8346 19.8629 16.9995 19.6524 17.0984 19.4093C17.1973 19.1663 17.2262 18.9004 17.1818 18.6417L16.3907 14.0309L19.742 10.7667C19.9312 10.5839 20.0648 10.3514 20.1276 10.0959C20.1903 9.8405 20.1797 9.57254 20.0968 9.32291Z"
                                                      fill="#F6C844"/>
                                            </Svg>
                                        </EmptyView>
                                    </EmptyView>
                                    <EmptyView>
                                        <EmptyView percentage={storeState.starAvg > 4 ? (storeState.starAvg - 4) * 10 : 0}>
                                            <Svg width="20" height="23" viewBox="0 0 22 23" fill="none">
                                                <Path d="M20.0968 9.32291C20.0168 9.07281 19.8679 8.85035 19.6671 8.68107C19.4664 8.51179 19.222 8.40256 18.962 8.36591L14.3319 7.69308L12.2611 3.49749C12.1451 3.26201 11.9654 3.06371 11.7425 2.92505C11.5196 2.78638 11.2623 2.71289 10.9998 2.71289C10.7373 2.71289 10.48 2.78638 10.2571 2.92505C10.0342 3.06371 9.8545 3.26201 9.73846 3.49749L7.66771 7.69308L3.03763 8.36591C2.77764 8.40353 2.53337 8.51317 2.33248 8.68244C2.13158 8.8517 1.98208 9.07382 1.9009 9.32366C1.81972 9.5735 1.8101 9.84107 1.87313 10.0961C1.93616 10.3511 2.06932 10.5834 2.25754 10.7667L5.60888 14.0327L4.81779 18.6445C4.7729 18.9032 4.80145 19.1693 4.9002 19.4127C4.99895 19.656 5.16394 19.8667 5.37644 20.021C5.58894 20.1753 5.84043 20.2669 6.10237 20.2854C6.36431 20.3039 6.62619 20.2486 6.85829 20.1258L10.9998 17.9469L15.1413 20.124C15.3735 20.2461 15.6353 20.3009 15.897 20.282C16.1588 20.2631 16.41 20.1714 16.6223 20.0172C16.8346 19.8629 16.9995 19.6524 17.0984 19.4093C17.1973 19.1663 17.2262 18.9004 17.1818 18.6417L16.3907 14.0309L19.742 10.7667C19.9312 10.5839 20.0648 10.3514 20.1276 10.0959C20.1903 9.8405 20.1797 9.57254 20.0968 9.32291Z"
                                                      fill="#F6C844"/>
                                            </Svg>
                                        </EmptyView>
                                    </EmptyView>
                                    <StoreRatingText>
                                        {storeState.starAvg}
                                    </StoreRatingText>
                                </StoreRatingSection>
                            </StoreNameSection>
                            <TouchableWithoutFeedback onPress={() => {
                                const temp = { ...storeState };
                                if (temp.subscribeCheck){
                                    temp.subscribeCheck = !temp.subscribeCheck;
                                    temp.subscribeCount--;
                                    postSubscribe(0)
                                }
                                else{
                                    temp.subscribeCheck = !temp.subscribeCheck;
                                    temp.subscribeCount++;
                                    postSubscribe(1)
                                }
                                setStoreState(temp);
                            }}>
                                <StoreWantedBox>
                                    <Svg width="22" height="23" viewBox="0 0 22 23" fill={storeState.subscribeCheck ? '#8377E9' : 'none'}>
                                        <Path
                                            d="M11.0134 3.6265C4.89497 -3.59166 -2.89207 5.59509 3.22632 12.8132L11.0134 22L18.8004 12.8132C24.8721 5.65021 17.085 -3.53654 11.0134 3.6265Z"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </Svg>
                                    <StoreWantedText>
                                        {storeState.subscribeCount}
                                    </StoreWantedText>
                                </StoreWantedBox>
                            </TouchableWithoutFeedback>
                        </StoreInformationSection>
                        <StoreInformationSection2>
                            <StoreInformationTouch>
                                <StoreInformationTouchSVGBox>
                                    <Svg width="25" height="26" viewBox="0 0 25 26" fill="none">
                                        <Path
                                            d="M19.8451 16.4321L18.4451 14.9154C18.0736 14.5135 17.5701 14.2877 17.0451 14.2877C16.5201 14.2877 16.0165 14.5135 15.6451 14.9154L14.9451 15.6737C14.5737 16.076 14.0702 16.3019 13.5451 16.3019C13.02 16.3019 12.5164 16.076 12.1451 15.6737L10.0451 13.3987C9.67378 12.9965 9.46521 12.4509 9.46521 11.8821C9.46521 11.3132 9.67378 10.7677 10.0451 10.3654L10.7451 9.60707C11.1161 9.20467 11.3245 8.65917 11.3245 8.09041C11.3245 7.52164 11.1161 6.97614 10.7451 6.57374L9.34506 5.05707C9.17348 4.83567 8.95924 4.65766 8.71738 4.53552C8.47552 4.41339 8.21191 4.3501 7.94506 4.3501C7.67822 4.3501 7.41461 4.41339 7.17275 4.53552C6.93089 4.65766 6.71664 4.83567 6.54506 5.05707C2.86306 9.01666 4.60106 13.5872 8.28106 17.5717C11.9611 21.5562 16.1811 23.4412 19.8451 19.4697C20.0501 19.2839 20.2151 19.0515 20.3282 18.7891C20.4414 18.5267 20.5 18.2406 20.5 17.9509C20.5 17.6613 20.4414 17.3751 20.3282 17.1127C20.2151 16.8503 20.0501 16.6179 19.8451 16.4321Z"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </Svg>
                                </StoreInformationTouchSVGBox>
                                <StoreInformationTouchText>
                                    전화하기
                                </StoreInformationTouchText>
                            </StoreInformationTouch>
                            <StoreInformationTouch>
                                <StoreInformationTouchSVGBox>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <Path
                                            d="M12 19.5001C12 18.5001 4 16.8001 3 17.5001V4.80014C4 3.80014 12 5.50714 12 6.50614M12 19.5001V6.50614M12 19.5001C12 18.5001 20 16.8001 21 17.5001V4.80014C20 3.80014 12 5.50714 12 6.50614"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </Svg>
                                </StoreInformationTouchSVGBox>
                                <StoreInformationTouchText>
                                    원산지 보기
                                </StoreInformationTouchText>
                            </StoreInformationTouch>
                            <StoreInformationTouch onPress={() => navigation.navigate('StoreMapPage', {latitude: storeState.y, longitude: storeState.x})}>
                                <StoreInformationTouchSVGBox>
                                    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <Path
                                            d="M8.98613 3.746C8.98613 7.938 12.5781 5.406 13.5781 9.5C13.5781 10.328 14.5781 11 15.5781 11C16.5781 11 17.5781 10.328 17.5781 9.5C17.5781 9.10218 17.7362 8.72064 18.0175 8.43934C18.2988 8.15804 18.6803 8 19.0781 8H20.5781M4.55813 8.471C8.57812 10.719 6.33413 12.687 9.43613 14.116C12.6791 15.61 11.4991 21 11.4991 21M20.8651 15H18.5781C17.7825 15 17.0194 15.3161 16.4568 15.8787C15.8942 16.4413 15.5781 17.2044 15.5781 18V20M21.5781 12C21.5781 16.9706 17.5487 21 12.5781 21C7.60756 21 3.57812 16.9706 3.57812 12C3.57812 7.02944 7.60756 3 12.5781 3C17.5487 3 21.5781 7.02944 21.5781 12Z"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                </StoreInformationTouchSVGBox>
                                <StoreInformationTouchText>
                                    지도보기
                                </StoreInformationTouchText>
                            </StoreInformationTouch>
                        </StoreInformationSection2>
                        <StoreMap>
                            {storeState.x &&
                                <MapView
                                    style={{
                                        flex: 1, // MapView가 부모 컨테이너에 맞게 확장됩니다.
                                        borderRadius: 19, // 부모 컨테이너의 borderRadius와 일치시킵니다.
                                        overflow: 'hidden', // borderRadius를 적용할 때 오버플로우를 숨깁니다.
                                    }}
                                    initialRegion={{
                                        latitude: storeState.y,
                                        longitude: storeState.x,
                                        latitudeDelta: 0.001,
                                        longitudeDelta: 0.001,
                                    }}
                                    legalLabelInsets={{ bottom: -500 }} // 이 부분이 추가된 것입니다.
                                    provider={PROVIDER_GOOGLE}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: storeState.y,
                                            longitude: storeState.x
                                        }}
                                    >
                                        <CustomMarker />
                                    </Marker>
                                </MapView>
                            }

                        </StoreMap>
                        <StoreAddressWrapper>
                            <StoreAddressSection>
                                <WithLocalSvg
                                    width={22}
                                    height={22}
                                    asset={MapLocationSVG} />
                                <StoreAddressTextBox>
                                    <StoreAddressText>
                                        {storeState.storeAddress}
                                    </StoreAddressText>
                                    <StoreAddressText>
                                        {userLocation.longitude && userLocation.latitude && `(현재 주소로부터 약 ${storeState.distance}m, 도보 ${storeState.duration}분)`}
                                        {!userLocation.longitude && !userLocation.latitude && `(위치에 문제가 발생했습니다)`}
                                    </StoreAddressText>
                                </StoreAddressTextBox>
                            </StoreAddressSection>
                            <TouchableOpacity onPress={() => Clipboard.setStringAsync(storeState.storeAddress)}>
                                <StoreAddressCopyText>
                                    복사하기
                                </StoreAddressCopyText>
                            </TouchableOpacity>
                        </StoreAddressWrapper>
                        <NavigationBar>
                            <MenuBox onPress={() => setSelected(1)}>
                                <MenuText selected={selected === 1}>
                                    메뉴
                                </MenuText>
                                {selected === 1 && <Line />}
                            </MenuBox>
                            <MenuBox onPress={() => setSelected(2)}>
                                <MenuText selected={selected === 2}>
                                    정보
                                </MenuText>
                                {selected === 2 && <Line />}
                            </MenuBox>
                            <MenuBox onPress={() => setSelected(3)}>
                                <MenuText selected={selected === 3}>
                                    리뷰
                                </MenuText>
                                {selected === 3 && <Line />}
                            </MenuBox>
                        </NavigationBar>
                        {selected === 1 && <MenuComponent storeIdx={storeIdx}/>}
                        {selected === 2 && <InfoComponent storeIdx={storeIdx}/>}
                        {selected === 3 && <ReviewComponent sortBy={sortBy} modalVisible={setModalVisible} storeIdx={storeIdx}/>}
                    </StoreDetailWrapper>
                )}/>

            <CustomModal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}>
                <ModalTitleSection>
                    <ModalTitleText2>
                        취소
                    </ModalTitleText2>
                    <ModalTitleText1>
                        정렬순
                    </ModalTitleText1>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <ModalTitleText2 visible={true}>
                            취소
                        </ModalTitleText2>
                    </TouchableOpacity>
                </ModalTitleSection>
                <ModalSection>
                    <TouchableWithoutFeedback
                        onPressIn={() => setSortByTouch(1)}
                        onPressOut={() => setSortByTouch(0)}
                        onPress={() => {
                            setSortBy(1)
                            setModalVisible(false)
                        }}>
                        <ModalBox>
                            <ModalText selected={sortBy === 1 || sortByTouch === 1}>
                                최신순
                            </ModalText>
                            {sortBy === 1 && <CheckComponent />}
                        </ModalBox>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPressIn={() => setSortByTouch(2)}
                        onPressOut={() => setSortByTouch(0)}
                        onPress={() => {
                            setSortBy(2)
                            setModalVisible(false)
                        }}>
                        <ModalBox>
                            <ModalText selected={sortBy === 2 || sortByTouch === 2}>
                                별점 높은 순
                            </ModalText>
                            {sortBy === 2 && <CheckComponent />}
                        </ModalBox>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPressIn={() => setSortByTouch(3)}
                        onPressOut={() => setSortByTouch(0)}
                        onPress={() => {
                            setSortBy(3)
                            setModalVisible(false)
                        }}>
                        <ModalBox>
                            <ModalText selected={sortBy === 3 || sortByTouch === 3}>
                                별점 낮은 순
                            </ModalText>
                            {sortBy === 3 && <CheckComponent />}
                        </ModalBox>
                    </TouchableWithoutFeedback>
                </ModalSection>
            </CustomModal>

            <CustomModaless
                isVisible={basketAdd}
                setVisible={() => dispatch(basketAddAction({ add: false }))}
                text='장바구니에 메뉴를 추가했습니다.'/>

        </SafeAreaView>
    )
}

const Container = styled.FlatList`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StoreDetailWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const StoreInformationSection = styled.View`
width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 41px 10px 0;
`

const StoreNameSection = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
`

const StoreNameText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
`

const StoreRatingSection = styled.View`
display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
`

const EmptyView = styled.View`
  width: ${({percentage}) => typeof percentage === 'number' ? 22/10*percentage : 22}px;
  height: 22px;
  overflow: hidden;
`

const StoreRatingText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 194.444% */
`

const StoreWantedBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;

  width: 109px;
  height: 41px;
  border-radius: 20px;
  background-color: white;
  
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  
  elevation: 6;
  
  margin-left: 12px;
  margin-top: 12.5px;
`

const StoreWantedText = styled.Text`
  color: #777;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 233.333% */
`

const StoreInformationSection2 = styled.View`
width: 360px;
  flex-direction: row;
  padding: 32px 0 5px;
  gap: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`

const StoreInformationTouch = styled.TouchableOpacity`
    display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const StoreInformationTouchSVGBox = styled.View`
  display: flex;
  width: 24px;
  height: 26px;
  justify-content: center;
  align-items: center;
`

const StoreInformationTouchText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 250% */
`

const StoreMap = styled.View`
  width: 360px;
  height: 134px;
  border-radius: 20px;
  border: 1px solid #AAA;
  margin-top: 20px;
`

const StoreAddressWrapper = styled.View`
    width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 17px;
`

const StoreAddressSection = styled.View`
    display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
`

const StoreAddressTextBox = styled.View`
display: flex;
  flex-direction: column;
`

const StoreAddressText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`

const StoreAddressCopyText = styled.Text`
  color: #777;
  font-family: "Pretendard-Medium";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  text-decoration-line: underline;
`

const NavigationBar = styled.View`
  width: 360px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MenuBox = styled.TouchableOpacity`
  display: flex;
  width: 107px;
  height: 25px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const MenuText = styled.Text`
  color: ${({selected}) => selected ? '#000' : '#777'};
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.6px;
`

const Line = styled.View`
  width: 111px;
  height: 0;
  background: #604EF8;
  border: 1.5px solid #604EF8;
  border-radius: 1.5px;
`

// 여기는 메뉴 버튼

function MenuComponent({storeIdx}) {
    const [ menuState, setMenuState ] = useState({
        storeIdx: null,
        mainMenuList: [],
        sideMenuList: []
    });
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ isMainExpanded, setIsMainExpanded ] = useState(true);
    const [ isSideExpanded, setIsSideExpanded ] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getMenuState()
    }, [])

    const getMenuState = () => {
        const apiUrl = baseUrl+`/jat/app/stores/info/details?storeIdx=${storeIdx}&type=menu`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'X-ACCESS-TOKEN': jwt,
            },
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000){
                    setMenuState(data.result)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    return (
        <>
            <StoreTextBox>
                <StoreText numberOfLines={isExpanded ? undefined : 5}>
                    매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류도 업그레이드 되었어요.가격이상의 퀄리티와 맛으로 보답하겠습니다.
                    매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류 매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류도 업그레이드 되었어요.가격이상의 퀄리티와 맛으로 보답하겠습니다.
                    매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류
                </StoreText>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <WithLocalSvg
                        style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg'}] }}
                        width={24}
                        height={22.75}
                        asset={DownSVG} />
                </TouchableOpacity>
            </StoreTextBox>
            <MenuTitleSection main={true}>
                <MenuTitleBox>
                    <MenuTitleText>
                        메인메뉴
                    </MenuTitleText>
                    <TouchableOpacity onPress={() => setIsMainExpanded(!isMainExpanded)}>
                        <WithLocalSvg
                            style={{ transform: [{ rotate: isMainExpanded ? '180deg' : '0deg'}] }}
                            width={24}
                            height={22.75}
                            asset={DownSVG} />
                    </TouchableOpacity>
                </MenuTitleBox>
            </MenuTitleSection>
            {isMainExpanded &&
                menuState.mainMenuList.map((item, index) => (
                        <TouchableWithoutFeedback
                            key={item.todaymenuIdx}
                            onPress={() => navigation.navigate('MenuDetailPage', {
                            storeIdx: storeIdx,
                            menuIdx: item.todaymenuIdx
                        })}>
                            <MenuWrapper>
                                <MenuSection>
                                    <MenuInfoWrapper>
                                        <MenuInfoSection>
                                            <MenuInfoBox>
                                                <MenuInfoText1>
                                                    {item.menuName}
                                                </MenuInfoText1>
                                                <MenuInfoText2>
                                                    {item.composition}
                                                </MenuInfoText2>
                                            </MenuInfoBox>
                                            <MenuQuantityBox>
                                                <WithLocalSvg
                                                    width={13.5}
                                                    height={13.5}
                                                    asset={WarningSVG}/>
                                                <MenuQuantityText>
                                                    재고 {item.remain}개
                                                </MenuQuantityText>
                                            </MenuQuantityBox>
                                        </MenuInfoSection>
                                        <MenuInfoImg
                                            resizeMode="cover"
                                            source={{uri: item.menuUrl}}/>
                                    </MenuInfoWrapper>
                                    <MenuPriceSection>
                                        <OriginalPriceSection>
                                            <OriginalPriceText>
                                                {item.originPrice.toLocaleString()}원
                                            </OriginalPriceText>
                                            <DiscountPercentageText>
                                                {item.discount} %
                                            </DiscountPercentageText>
                                        </OriginalPriceSection>
                                        <WithLocalSvg
                                            width={24}
                                            height={22.75}
                                            asset={ArrowRightSVG}/>
                                        <DiscountPriceText>
                                            {item.todayPrice.toLocaleString()}원
                                        </DiscountPriceText>
                                    </MenuPriceSection>
                                </MenuSection>
                            </MenuWrapper>
                        </TouchableWithoutFeedback>
                    ))
            }

            <MenuTitleSection>
                <MenuTitleBox>
                    <MenuTitleText>
                        사이드 메뉴
                    </MenuTitleText>
                    <TouchableOpacity onPress={() => setIsSideExpanded(!isSideExpanded)}>
                        <WithLocalSvg
                            style={{ transform: [{ rotate: isSideExpanded ? '180deg' : '0deg'}] }}
                            width={24}
                            height={22.75}
                            asset={DownSVG} />
                    </TouchableOpacity>
                </MenuTitleBox>
            </MenuTitleSection>
            {isSideExpanded &&
                menuState.sideMenuList.map((item, index) => (
                    <TouchableWithoutFeedback
                        key={item.todaymenuIdx}
                        onPress={() => navigation.navigate('MenuDetailPage', {
                            storeIdx: storeIdx,
                            menuIdx: item.todaymenuIdx
                        })}>
                        <MenuWrapper key={item.todaymenuIdx}>
                            <MenuSection>
                                <MenuInfoWrapper>
                                    <MenuInfoSection>
                                        <MenuInfoBox>
                                            <MenuInfoText1>
                                                {item.menuName}
                                            </MenuInfoText1>
                                            <MenuInfoText2>
                                                {item.composition}
                                            </MenuInfoText2>
                                        </MenuInfoBox>
                                        <MenuQuantityBox>
                                            <WithLocalSvg
                                                width={13.5}
                                                height={13.5}
                                                asset={WarningSVG} />
                                            <MenuQuantityText>
                                                재고 {item.remain}개
                                            </MenuQuantityText>
                                        </MenuQuantityBox>
                                    </MenuInfoSection>
                                    <MenuInfoImg
                                        resizeMode="cover"
                                        source={{uri: item.menuUrl}}/>
                                </MenuInfoWrapper>
                                <MenuPriceSection>
                                    <OriginalPriceSection>
                                        <OriginalPriceText>
                                            {item.originPrice.toLocaleString()}원
                                        </OriginalPriceText>
                                        <DiscountPercentageText>
                                            {item.discount} %
                                        </DiscountPercentageText>
                                    </OriginalPriceSection>
                                    <WithLocalSvg
                                        width={24}
                                        height={22.75}
                                        asset={ArrowRightSVG} />
                                    <DiscountPriceText>
                                        {item.todayPrice.toLocaleString()}원
                                    </DiscountPriceText>
                                </MenuPriceSection>
                            </MenuSection>
                        </MenuWrapper>
                    </TouchableWithoutFeedback>
                ))
            }
        </>


    )
}


const StoreTextBox = styled.View`
  display: flex;
  width: 360px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const StoreText = styled.Text`
  width: 100%;
  margin-top: 20px;
  color: #000;
  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 156.25% */
`

const MenuTitleSection = styled.View`  
  width: 100%;
  margin-top: ${({main}) => main ? '30px': 0};
  padding: 7px 0 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;

  background: #F7F5FD;
`

const MenuTitleBox = styled.View`
  width: 360px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MenuTitleText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 218.75% */
`

const MenuWrapper = styled.View`
  width: 100%;
  padding: 20px 0 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;
`

const MenuSection = styled.View`
    width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`

const MenuInfoWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MenuInfoSection = styled.View`
  width: 190px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const MenuInfoBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: -5px;
`

const MenuInfoText1 = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 218.75% */
`

const MenuInfoText2 = styled.Text`
  color: #777;
  font-family: "Pretendard-Regular";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 269.231% */
`

const MenuQuantityBox = styled.View`
display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const MenuQuantityText = styled.Text`
  color: #F00;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 233.333% */
`

const MenuInfoImg = styled.Image`
  width: 141px;
  height: 100px;
  border-radius: 5px;
`

// 메뉴 가격 파트는 메뉴 상세 페이지와 같은 컴포넌트
const MenuPriceSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 36px;
  height: 35px;
  align-items: center;
  justify-content: center;
  gap: 19px;
  border-radius: 15px;
  background: #F8F8F8;
`

const OriginalPriceSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const OriginalPriceText = styled.Text`
  color: #555;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 250% */
  text-decoration-line: line-through;
`

const DiscountPercentageText = styled.Text`
  color: #F00;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`

const DiscountPriceText = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`

// 여기는 가게 정보

function InfoComponent({storeIdx}) {
    const [ infoState, setInfoState ] = useState({
        storeIdx: 0,
        detailStoreInfo: {
            storeName: '',
            storeOpen: '',
            storeClose: '',
            breakday: '',
        },
        detailStatisticsInfo: {
            orderCount: 0,
            reviewCount: 0
        },
        detailSellerInfo: {
            sellerName: '',
            storeName: '',
            storeAddress: '',
            businessRegiNum: '',
        },
        detailIngredientInfo: ''
    });

    useEffect(() => {
        getInfoState()
    }, [])

    const getInfoState = () => {
        const apiUrl = baseUrl+`/jat/app/stores/info/details?storeIdx=${storeIdx}&type=info`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'X-ACCESS-TOKEN': jwt,
            },
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000){
                    setInfoState(data.result)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const convertToKoreanTimeFormat = (timeString) => {
        const [hour, minute] = timeString.split(':').map(Number)
        const meridiem = hour <= 12 ? '오전' : '오후';
        const convertHour = hour <= 12 ? hour : hour - 12;
        return `${meridiem} ${convertHour}:${minute < 10 ? '0' + minute : minute}`

    }

    return (
        <>
            <InfoWrapper isFirst={true}>
                <InfoTitleText>
                    가게 정보
                </InfoTitleText>
                <InfoSection>
                    <InfoBox>
                        <InfoText1>
                            상호명
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStoreInfo.storeName}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            운영시간
                        </InfoText1>
                        <InfoText2>
                            {`${convertToKoreanTimeFormat(infoState.detailStoreInfo.storeOpen)} ~ ${convertToKoreanTimeFormat(infoState.detailStoreInfo.storeClose)}`}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            휴무일
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStoreInfo.breakday}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            전화번호
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStoreInfo.storePhone}
                        </InfoText2>
                    </InfoBox>
                </InfoSection>
            </InfoWrapper>
            <Border />
            <InfoWrapper>
                <InfoTitleText>
                    가게 통계
                </InfoTitleText>
                <InfoSection>
                    <InfoBox>
                        <InfoText1>
                            최근 주문수
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStatisticsInfo.orderCount}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            전체 리뷰수
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStatisticsInfo.reviewCount}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            구독
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStatisticsInfo.subscribeCount}
                        </InfoText2>
                    </InfoBox>
                </InfoSection>
            </InfoWrapper>
            <Border />
            <InfoWrapper>
                <InfoTitleText>
                    사업자 정보
                </InfoTitleText>
                <InfoSection>
                    <InfoBox>
                        <InfoText1>
                            대표자명
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailSellerInfo.sellerName}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            상호명
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailSellerInfo.storeName}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            사업자주소
                        </InfoText1>
                        <InfoText2>
                            {`${infoState.detailSellerInfo.storeAddress}\n위 주소는 사업자등록증에 표기된 정보입니다`}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            사업자등록 번호
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailSellerInfo.businessRegiNum}
                        </InfoText2>
                    </InfoBox>
                </InfoSection>
            </InfoWrapper>
            <Border />
            <InfoWrapper>
                <InfoTitleText>
                    원산지 표기
                </InfoTitleText>
                <InfoText3>
                    {infoState.detailIngredientInfo}
                </InfoText3>
            </InfoWrapper>
            <Border2 />
        </>
    )
}

const InfoWrapper = styled.View`
    width: 360px;
  display: flex;
  flex-direction: column;
  padding: ${({isFirst}) => isFirst ? '20px' : '33px'} 0;
  align-items: flex-start;
  gap: 20px;
`

const InfoTitleText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 218.75% */
`

const InfoSection = styled.View`
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
`

const InfoBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const InfoText1 = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
`

const InfoText2 = styled.Text`
width: 234px;
  color: #555;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`

const InfoText3 = styled.Text`
width: 100%;
  color: #555;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`

const Border = styled.View`
  width: 100%;
  height: 20px;
  background: #F7F5FD;
`
const Border2 = styled.View`
  border-bottom-color: #AAA;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  width: 100%;
  height: 0;
`

// 여기서부터 리뷰 페이지

function ReviewComponent({sortBy, modalVisible, storeIdx}) {
    const [ reviewState, setReviewState ] = useState({
        storeIdx: 0,
        starAverage: 0,
        reviewsTotal: 0,
        commentTotal: 0,
        starCountRatios: [
            {
                starRatio: 0
            },
            {
                starRatio: 0
            },
            {
                starRatio: 0
            },
            {
                starRatio: 0
            },
            {
                starRatio: 0
            }
        ],
        reviewItems: []
    });
    const [ onlyImage, setOnlyImage ] = useState(false);
    const [visibleModal, setVisibleModal] = useState({visible: false, reviewIdx: 0})

    useEffect(() => {
        getReviewState()
    }, [])

    const getReviewState = () => {
        const apiUrl = baseUrl+`/jat/app/stores/info/details?storeIdx=${storeIdx}&type=review`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'X-ACCESS-TOKEN': jwt,
            },
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000){
                    setReviewState(data.result)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const reportReview = (reviewIdx) => {
        const apiUrl = baseUrl+`/jat/app/reviews/report`;

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'X-ACCESS-TOKEN': jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reviewIdx: reviewIdx
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === 1000){
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const StarImage = () => (
        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <Path
                d="M12.7871 5.61458C12.7362 5.45543 12.6414 5.31386 12.5137 5.20614C12.3859 5.09841 12.2304 5.0289 12.0649 5.00558L9.11851 4.57741L7.80076 1.9075C7.72691 1.75764 7.61259 1.63145 7.47074 1.54321C7.32888 1.45497 7.16515 1.4082 6.99809 1.4082C6.83103 1.4082 6.66731 1.45497 6.52545 1.54321C6.38359 1.63145 6.26927 1.75764 6.19543 1.9075L4.87768 4.57741L1.93126 5.00558C1.76581 5.02952 1.61037 5.09929 1.48253 5.20701C1.35469 5.31472 1.25955 5.45607 1.20789 5.61506C1.15623 5.77404 1.15011 5.94432 1.19022 6.10661C1.23033 6.26889 1.31507 6.41671 1.43484 6.53333L3.56751 8.61174L3.06409 11.5465C3.03553 11.7111 3.05369 11.8805 3.11653 12.0353C3.17937 12.1902 3.28437 12.3243 3.41959 12.4225C3.55482 12.5206 3.71486 12.5789 3.88155 12.5907C4.04824 12.6025 4.21489 12.5673 4.36259 12.4892L6.99809 11.1026L9.63359 12.488C9.78138 12.5657 9.94797 12.6006 10.1145 12.5885C10.2811 12.5765 10.4409 12.5181 10.576 12.42C10.7112 12.3219 10.8161 12.1879 10.879 12.0332C10.9419 11.8785 10.9603 11.7093 10.9321 11.5447L10.4287 8.61058L12.5613 6.53333C12.6817 6.41701 12.7667 6.26905 12.8067 6.1065C12.8466 5.94396 12.8398 5.77343 12.7871 5.61458Z"
                fill="#F6C844"/>
        </Svg>
    )

    const ReviewComponent = () => {
        const review = [...reviewState.reviewItems];

        if (sortBy === 1)
            review.sort((review1, review2) => review2.reviewIdx - review1.reviewIdx)
        else if (sortBy === 2)
            review.sort((review1, review2) => review2.star - review1.star)
        else if (sortBy === 3)
            review.sort((review1, review2) => review1.star - review2.star)

        return (
            review.map((item, index) => {
                if (onlyImage){
                    if (item.review_url)
                        return (
                            <ReviewWrapper keys={item.reviewIdx}>
                                <ReviewSection>
                                    <ReviewBox>
                                        <UserSection>
                                            <UserImage
                                                resizeMode="cover"
                                                source={{url: 'https://s3-alpha-sig.figma.com/img/0b1c/cdaa/a30575a764567a374d6535d068a76cd5?Expires=1691366400&Signature=RU25a1vejlMhrknJLUTmimzavWhsKzj8-jQteqYwsHlLQjSxNEyV9l3l6jZJUirWJV1Mtqq2FTRmdcpmH3grOGOwdR2rS~UQ9BmKRlkckmXbDNa7RlBqrnaLZSJdYYP7LPzZqQHFy9cgDFGQW1sqdFY4kAMfLVMuNClkO968Pr64aiP3G2nci4NHqxByHm8zxmblhVqfZnzXePzKF9TXPjKMihu3wGDCIKYmAtlPwiT60M5Ub1NGXpXT5MYGqI9F7kAwsNJMYg60wsccwnCyn7CoZ3PhJMCDDX11YVAZpBTXTW3KgJKbudfAAv~h1p9jMuq5oDCzwSq9pkqTjrt9oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}/>
                                            <UserBox>
                                                <UserNameText>
                                                    {item.customerName}
                                                </UserNameText>
                                                <UserStarRatingSection>
                                                    <StarRatingBox>
                                                        <EmptyStar>
                                                            <EmptyStar percentage={item.star * 10}>
                                                                <StarImage />
                                                            </EmptyStar>
                                                        </EmptyStar>
                                                        <EmptyStar>
                                                            <EmptyStar percentage={item.star > 1 ? (item.star - 1) * 10 : 0}>
                                                                <StarImage />
                                                            </EmptyStar>
                                                        </EmptyStar>
                                                        <EmptyStar>
                                                            <EmptyStar percentage={item.star > 2 ? (item.star - 2) * 10 : 0}>
                                                                <StarImage />
                                                            </EmptyStar>
                                                        </EmptyStar>
                                                        <EmptyStar>
                                                            <EmptyStar percentage={item.star > 3 ? (item.star - 3) * 10 : 0}>
                                                                <StarImage />
                                                            </EmptyStar>
                                                        </EmptyStar>
                                                        <EmptyStar>
                                                            <EmptyStar percentage={item.star > 4 ? (item.star - 4) * 10 : 0}>
                                                                <StarImage />
                                                            </EmptyStar>
                                                        </EmptyStar>
                                                    </StarRatingBox>
                                                    <UserReviewDate>
                                                        1개월전
                                                    </UserReviewDate>
                                                </UserStarRatingSection>
                                            </UserBox>
                                        </UserSection>
                                        {item.review_url &&
                                            <UserReviewImage
                                                resizeMode="cover"
                                                source={{url: item.review_url}}/>

                                        }<UserReviewText>
                                        {item.contents}
                                    </UserReviewText>
                                    </ReviewBox>
                                    <ReviewReportTouch onPress={() => setVisibleModal({visible: true, reviewIdx: item.reviewIdx})}>
                                        <ReviewReportText>
                                            신고하기
                                        </ReviewReportText>
                                    </ReviewReportTouch>
                                    <ReviewMenuSection>
                                        {item.orderTodayMenu.map((item2, index) => (
                                            <ReviewMenuBox key={index}>
                                                <ReviewMenuText>
                                                    {item2}
                                                </ReviewMenuText>
                                            </ReviewMenuBox>
                                        ))}
                                    </ReviewMenuSection>
                                </ReviewSection>
                                {item.comment !== "" &&
                                    <ReplySection>
                                        <UserSection>
                                            <UserImage
                                                resizeMode="cover"
                                                source={{url: 'https://s3-alpha-sig.figma.com/img/0b1c/cdaa/a30575a764567a374d6535d068a76cd5?Expires=1691366400&Signature=RU25a1vejlMhrknJLUTmimzavWhsKzj8-jQteqYwsHlLQjSxNEyV9l3l6jZJUirWJV1Mtqq2FTRmdcpmH3grOGOwdR2rS~UQ9BmKRlkckmXbDNa7RlBqrnaLZSJdYYP7LPzZqQHFy9cgDFGQW1sqdFY4kAMfLVMuNClkO968Pr64aiP3G2nci4NHqxByHm8zxmblhVqfZnzXePzKF9TXPjKMihu3wGDCIKYmAtlPwiT60M5Ub1NGXpXT5MYGqI9F7kAwsNJMYg60wsccwnCyn7CoZ3PhJMCDDX11YVAZpBTXTW3KgJKbudfAAv~h1p9jMuq5oDCzwSq9pkqTjrt9oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}/>
                                            <UserBox>
                                                <UserNameText>
                                                    사장님
                                                </UserNameText>
                                            </UserBox>
                                        </UserSection>
                                        <UserReviewText>
                                            {item.comment}
                                        </UserReviewText>
                                    </ReplySection>
                                }
                            </ReviewWrapper>
                        )
                    else
                        return
                }
                else
                    return (
                        <ReviewWrapper keys={item.reviewIdx}>
                            <ReviewSection>
                                <ReviewBox>
                                    <UserSection>
                                        <UserImage
                                            resizeMode="cover"
                                            source={{url: 'https://s3-alpha-sig.figma.com/img/0b1c/cdaa/a30575a764567a374d6535d068a76cd5?Expires=1691366400&Signature=RU25a1vejlMhrknJLUTmimzavWhsKzj8-jQteqYwsHlLQjSxNEyV9l3l6jZJUirWJV1Mtqq2FTRmdcpmH3grOGOwdR2rS~UQ9BmKRlkckmXbDNa7RlBqrnaLZSJdYYP7LPzZqQHFy9cgDFGQW1sqdFY4kAMfLVMuNClkO968Pr64aiP3G2nci4NHqxByHm8zxmblhVqfZnzXePzKF9TXPjKMihu3wGDCIKYmAtlPwiT60M5Ub1NGXpXT5MYGqI9F7kAwsNJMYg60wsccwnCyn7CoZ3PhJMCDDX11YVAZpBTXTW3KgJKbudfAAv~h1p9jMuq5oDCzwSq9pkqTjrt9oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}/>
                                        <UserBox>
                                            <UserNameText>
                                                {item.customerName}
                                            </UserNameText>
                                            <UserStarRatingSection>
                                                <StarRatingBox>
                                                    <EmptyStar>
                                                        <EmptyStar percentage={item.star * 10}>
                                                            <StarImage />
                                                        </EmptyStar>
                                                    </EmptyStar>
                                                    <EmptyStar>
                                                        <EmptyStar percentage={item.star > 1 ? (item.star - 1) * 10 : 0}>
                                                            <StarImage />
                                                        </EmptyStar>
                                                    </EmptyStar>
                                                    <EmptyStar>
                                                        <EmptyStar percentage={item.star > 2 ? (item.star - 2) * 10 : 0}>
                                                            <StarImage />
                                                        </EmptyStar>
                                                    </EmptyStar>
                                                    <EmptyStar>
                                                        <EmptyStar percentage={item.star > 3 ? (item.star - 3) * 10 : 0}>
                                                            <StarImage />
                                                        </EmptyStar>
                                                    </EmptyStar>
                                                    <EmptyStar>
                                                        <EmptyStar percentage={item.star > 4 ? (item.star - 4) * 10 : 0}>
                                                            <StarImage />
                                                        </EmptyStar>
                                                    </EmptyStar>
                                                </StarRatingBox>
                                                <UserReviewDate>
                                                    1개월전
                                                </UserReviewDate>
                                            </UserStarRatingSection>
                                        </UserBox>
                                    </UserSection>
                                    {item.review_url &&
                                        <UserReviewImage
                                            resizeMode="cover"
                                            source={{url: item.review_url}}/>

                                    }<UserReviewText>
                                    {item.contents}
                                </UserReviewText>
                                </ReviewBox>
                                <ReviewReportTouch onPress={() => setVisibleModal({visible: true, reviewIdx: item.reviewIdx})}>
                                    <ReviewReportText>
                                        신고하기
                                    </ReviewReportText>
                                </ReviewReportTouch>
                                <ReviewMenuSection>
                                    {item.orderTodayMenu.map((item2, index) => (
                                        <ReviewMenuBox key={index}>
                                            <ReviewMenuText>
                                                {item2}
                                            </ReviewMenuText>
                                        </ReviewMenuBox>
                                    ))}
                                </ReviewMenuSection>
                            </ReviewSection>
                            {item.comment !== "" &&
                                <ReplySection>
                                    <UserSection>
                                        <UserImage
                                            resizeMode="cover"
                                            source={{url: 'https://s3-alpha-sig.figma.com/img/0b1c/cdaa/a30575a764567a374d6535d068a76cd5?Expires=1691366400&Signature=RU25a1vejlMhrknJLUTmimzavWhsKzj8-jQteqYwsHlLQjSxNEyV9l3l6jZJUirWJV1Mtqq2FTRmdcpmH3grOGOwdR2rS~UQ9BmKRlkckmXbDNa7RlBqrnaLZSJdYYP7LPzZqQHFy9cgDFGQW1sqdFY4kAMfLVMuNClkO968Pr64aiP3G2nci4NHqxByHm8zxmblhVqfZnzXePzKF9TXPjKMihu3wGDCIKYmAtlPwiT60M5Ub1NGXpXT5MYGqI9F7kAwsNJMYg60wsccwnCyn7CoZ3PhJMCDDX11YVAZpBTXTW3KgJKbudfAAv~h1p9jMuq5oDCzwSq9pkqTjrt9oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}/>
                                        <UserBox>
                                            <UserNameText>
                                                사장님
                                            </UserNameText>
                                        </UserBox>
                                    </UserSection>
                                    <UserReviewText>
                                        {item.comment}
                                    </UserReviewText>
                                </ReplySection>
                            }
                        </ReviewWrapper>
                    )
            })
        )
    }

    return (
        <>
            <StarRatingWrapper>
                <StarRatingSection>
                    <StarRatingText>
                        {reviewState.starAverage}
                    </StarRatingText>
                    <StarRatingBox>
                        <EmptyStar>
                            <EmptyStar percentage={reviewState.starAverage * 10}>
                                <StarImage />
                            </EmptyStar>
                        </EmptyStar>
                        <EmptyStar>
                            <EmptyStar percentage={reviewState.starAverage > 1 ? (reviewState.starAverage - 1) * 10 : 0}>
                                <StarImage />
                            </EmptyStar>
                        </EmptyStar>
                        <EmptyStar>
                            <EmptyStar percentage={reviewState.starAverage > 2 ? (reviewState.starAverage - 2) * 10 : 0}>
                                <StarImage />
                            </EmptyStar>
                        </EmptyStar>
                        <EmptyStar>
                            <EmptyStar percentage={reviewState.starAverage > 3 ? (reviewState.starAverage - 3) * 10 : 0}>
                                <StarImage />
                            </EmptyStar>
                        </EmptyStar>
                        <EmptyStar>
                            <EmptyStar percentage={reviewState.starAverage > 4 ? (reviewState.starAverage - 4) * 10 : 0}>
                                <StarImage />
                            </EmptyStar>
                        </EmptyStar>
                    </StarRatingBox>
                </StarRatingSection>
                <StarRatingDistributionSection>
                    <StarRatingDistributionBox1>
                        <StarRatingDistributionText>
                            5점
                        </StarRatingDistributionText>
                        <StarRatingDistributionText>
                            4점
                        </StarRatingDistributionText>
                        <StarRatingDistributionText>
                            3점
                        </StarRatingDistributionText>
                        <StarRatingDistributionText>
                            2점
                        </StarRatingDistributionText>
                        <StarRatingDistributionText>
                            1점
                        </StarRatingDistributionText>
                    </StarRatingDistributionBox1>
                    <StarRatingDistributionBox2>
                        <StarRatingDistributionBar>
                            <StarRatingDistributionBarFill percentage={reviewState.starCountRatios[0].starRatio} />
                        </StarRatingDistributionBar>
                        <StarRatingDistributionBar>
                            <StarRatingDistributionBarFill percentage={reviewState.starCountRatios[1].starRatio} />
                        </StarRatingDistributionBar>
                        <StarRatingDistributionBar>
                            <StarRatingDistributionBarFill percentage={reviewState.starCountRatios[2].starRatio} />
                        </StarRatingDistributionBar>
                        <StarRatingDistributionBar>
                            <StarRatingDistributionBarFill percentage={reviewState.starCountRatios[3].starRatio} />
                        </StarRatingDistributionBar>
                        <StarRatingDistributionBar>
                            <StarRatingDistributionBarFill percentage={reviewState.starCountRatios[4].starRatio} />
                        </StarRatingDistributionBar>
                    </StarRatingDistributionBox2>
                    <StarRatingDistributionBox3>
                        <StarRatingDistributionBox1 style={{width: 100}}>
                            <StarRatingDistributionText>
                                {reviewState.starCountRatios[0].starRatio}%
                            </StarRatingDistributionText>
                            <StarRatingDistributionText>
                                {reviewState.starCountRatios[1].starRatio}%
                            </StarRatingDistributionText>
                            <StarRatingDistributionText>
                                {reviewState.starCountRatios[2].starRatio}%
                            </StarRatingDistributionText>
                            <StarRatingDistributionText>
                                {reviewState.starCountRatios[3].starRatio}%
                            </StarRatingDistributionText>
                            <StarRatingDistributionText>
                                {reviewState.starCountRatios[4].starRatio}%
                            </StarRatingDistributionText>
                        </StarRatingDistributionBox1>
                    </StarRatingDistributionBox3>
                </StarRatingDistributionSection>
            </StarRatingWrapper>
            <ReviewInfoWrapper>
                <ReviewInfoSection>
                    <ReviewInfoRecentCountText>
                        {`전체 리뷰 ${reviewState.reviewsTotal}개`}
                    </ReviewInfoRecentCountText>
                    <ReviewInfoReplyCountText>
                        {`사장님 댓글 ${reviewState.commentTotal}개`}
                    </ReviewInfoReplyCountText>
                </ReviewInfoSection>
                <ReviewInfoSection2>
                    <ReviewInfoTouch onPress={() => setOnlyImage(!onlyImage)}>
                        <ReviewInfoOnlyImageCheckBox selected={onlyImage}>
                            {onlyImage ?
                                <WithLocalSvg
                                    width={19}
                                    height={19}
                                    asset={CheckSVG}/> : null}
                        </ReviewInfoOnlyImageCheckBox>
                        <ReviewInfoText>
                            사진리뷰만 보기
                        </ReviewInfoText>
                    </ReviewInfoTouch>
                    <ReviewInfoTouch onPress={() => modalVisible(true)}>
                        <ReviewInfoText>
                            {['최신순', '별점 높은 순', '별점 낮은 순'][sortBy-1]}
                        </ReviewInfoText>
                        <WithLocalSvg
                            width={13.17}
                            height={7.19}
                            asset={SortBySVG} />
                    </ReviewInfoTouch>
                </ReviewInfoSection2>
            </ReviewInfoWrapper>
            <ReviewComponent />

            <CustomModal isVisible={visibleModal.visible} onBackdropPress={() => setVisibleModal(false)}>
                <Modal2Wrapper>
                    <Modal2Text>
                        신고하시겠습니까?
                    </Modal2Text>
                    <Modal2CheckSection>
                        <TouchableOpacity onPress={() => {
                            setVisibleModal({visible: false, reviewIdx: 0})
                        }}>
                            <Modal2CheckBox  color="#F8F8F8">
                                <Modal2CheckText>
                                    아니오
                                </Modal2CheckText>
                            </Modal2CheckBox>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const reviewIdx = visibleModal.reviewIdx
                            console.log(reviewIdx)
                            reportReview(reviewIdx)
                            setVisibleModal({visible: false, reviewIdx: 0})
                        }}>
                            <Modal2CheckBox>
                                <Modal2CheckText>
                                    네
                                </Modal2CheckText>
                            </Modal2CheckBox>
                        </TouchableOpacity>
                    </Modal2CheckSection>
                </Modal2Wrapper>
            </CustomModal>
        </>
    )
}

const StarRatingWrapper = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-top: 35px;
`

const StarRatingSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const StarRatingText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 109.375% */
`

const StarRatingBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const EmptyStar = styled.View`
  width: ${({percentage}) => typeof percentage === 'number' ? 14/10*percentage : 14}px;
  height: 14px;
  overflow: hidden;
`

const StarRatingDistributionSection = styled.View`
  display: flex;
  flex-direction: row;
  gap: 9px;
  align-items: center;
`

const StarRatingDistributionBox1 = styled.View`
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`

const StarRatingDistributionText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px; /* 19.2px */
  letter-spacing: 0.5px;
`

const StarRatingDistributionBox2 = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StarRatingDistributionBar = styled.View`
  width: 184px;
  height: 12px;
  border-radius: 5px;
  background: #F8F8F8;
  overflow: hidden;
`

const StarRatingDistributionBarFill = styled.View`
  width: ${({percentage}) => 184/100*percentage}px;
  height: 12px;
  background: #F6C844;
  border-radius: 5px 0px 5px 5px;
`

const StarRatingDistributionBox3 = styled.View`
  display: flex;
  width: 14px;
`

const ReviewInfoWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;
`

const ReviewInfoSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 360px;
  padding: 15px 0;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
`

const ReviewInfoRecentCountText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-SemiBold";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 32px */
  letter-spacing: 0.5px;
`

const ReviewInfoReplyCountText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25.6px; /* 25.6px */
  letter-spacing: 0.5px;
`

const ReviewInfoSection2 = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const ReviewInfoTouch = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-right: 5px;
`

const ReviewInfoOnlyImageCheckBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  height: 21px;
  border-radius: 5px;
  ${({selected}) => selected ? null : 'border: 1px solid #777;'}
  ${({selected}) => selected ? 'background: #8377E9;' : null}
`

const ReviewInfoText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22.4px; /* 22.4px */
  letter-spacing: 0.5px;
`


const ReviewWrapper = styled.View`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;
`

const ReviewSection = styled.View`
  position: relative;
  display: flex;
  width: 360px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`

const ReviewReportTouch = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
`

const ReviewReportText = styled.Text`
  color: #AAA;
  text-align: right;
  font-family: "Pretendard-Medium";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 291.667% */
`

const ReviewBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const UserSection = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
`

const UserBox = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: -10px;
`

const UserNameText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 233.333% */
`

const UserStarRatingSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
`

const UserReviewDate = styled.Text`
  color: rgba(0, 0, 0, 0.50);
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 291.667% */
`

const UserReviewText = styled.Text`
  color: #000;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 233.333% */
`

const UserReviewImage = styled.Image`
  margin: 10px 0 10px;
  width: 360px;
  height: 360px;
  border-radius: 30px;
`

const UserImage = styled.Image`
  width: 43px;
  height: 43px;
  border-radius: 43px;
`

const ReviewMenuSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`

const ReviewMenuBox = styled.View`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: #F5F3FF;
`

const ReviewMenuText = styled.Text`
  color: #000;
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
`

const ReplySection = styled.View`
  display: flex;
  width: 360px;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  border-radius: 30px;
  background: #F8F8F8;
`


export function CustomMarker() {

    return (
        <CustomMarkerPoint>
            <CustomMarkerSection>
                <Svg width="40" height="49" viewBox="0 0 40 49" fill="none">
                    <Path d="M20 47.9997C22.6752 47.9995 23.3529 41.2855 26.7059 39.0474C33.1615 34.7383 39 27.857 39 19.4642C39 8.98384 30.5861 1.05445 20.1189 1.00003C9.44447 0.944537 1 8.77627 1 19.4642C1 27.2975 3.71981 32.6566 13.2941 39.0474C16.6471 41.2855 17.3248 48 20 47.9997Z"
                          fill="white"
                          stroke="#604EF8"
                          strokeWidth="2"/>
                </Svg>
            </CustomMarkerSection>
        </CustomMarkerPoint>
    )
}


const CustomMarkerPoint = styled.View`
  position: relative;
  width: 100px;
  height: 100px;
`

const CustomMarkerSection = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  position: absolute;
  bottom: 0;
  left: 30px;
`

const ModalTitleSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 343px;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
`

const ModalTitleText1 = styled.Text`
  color: #000;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`

const ModalTitleText2 = styled.Text`
  color: ${({visible}) => visible ? '#555' : 'white'};
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`

const ModalSection = styled.View`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  padding: 20px 0 109px;
`

const ModalBox = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const ModalText = styled.Text`
  color: ${({selected}) => selected ? '#604EF8' : '#000'};
  font-family: ${({selected}) => selected ? "Pretendard-Medium" : "Pretendard-Regular"};
  font-size: 16px;
  font-style: normal;
  font-weight: ${({selected}) => selected ? 500 : 400};
  line-height: 20px; /* 125% */
`

const Modal2Wrapper = styled.View`
  width: 100%;
  height: 313px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 116px;
  gap: 48px;
`

const Modal2Text = styled.Text`
  color: #2F2F38;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 111.111% */
`

const Modal2CheckSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 290px;
  justify-content: space-between;
`

const Modal2CheckBox = styled.View`
  display: flex;
  width: 93px;
  height: 33px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${({color}) => color ? color : '#F5F3FF'};
`

const Modal2CheckText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
`