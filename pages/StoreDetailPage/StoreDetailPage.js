// react-native, expo
import {Linking, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import * as Clipboard from 'expo-clipboard';
import { Path, Svg, WithLocalSvg} from "react-native-svg";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapLocationSVG from "assets/images/map-location.svg";
import React, {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
// redux
import { basketAddAction } from "store/basketAdd";
import {useDispatch, useSelector} from "react-redux";
// utils
import {getStoreInfo} from "./utils/getStoreInfo";
import {postSubscribe} from "./utils/postSubscribe";
// styles
import * as Styles from './styles'
// components
import Header from "components/common/Header"
import CustomModaless from "components/Heo/modal/CustomModaless";
import CustomMarker from "components/Heo/CustomMarker";
import MenuComponent from "./components/Menu/MenuComponent";
import InfoComponent from "./components/Info/InfoComponent";
import ReviewComponent from "./components/Review/ReviewComponent";

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
    const dispatch = useDispatch()
    const basketAdd = useSelector(({basketAdd}) => basketAdd.add)
    const userLocation = useSelector(({myAddress}) => myAddress)
    const route = useRoute();
    const { storeIdx } = route.params;

    useEffect(() => {
        fetchAndProcessStoreInfo()
    }, [])

    async function fetchAndProcessStoreInfo() {
        try {
            const storeInfo = await getStoreInfo(storeIdx, userLocation)
            setStoreState(storeInfo)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <Header left={1} right={1} backgroundColor='white'/>
            <Styles.Container
                showsVerticalScrollIndicator={false}
                data={[{id: 1}]}
                renderItem={() => (
                    <Styles.StoreDetailWrapper>
                        <Styles.StoreInformationSection>
                            <Styles.StoreNameSection>
                                <Styles.StoreNameText>
                                    {storeState.storeName}
                                </Styles.StoreNameText>
                                <Styles.StoreRatingSection>
                                    <StarBox score={storeState.starAvg} seq={0}/>
                                    <StarBox score={storeState.starAvg} seq={1}/>
                                    <StarBox score={storeState.starAvg} seq={2}/>
                                    <StarBox score={storeState.starAvg} seq={3}/>
                                    <StarBox score={storeState.starAvg} seq={4}/>
                                    <Styles.StoreRatingText>
                                        {storeState.starAvg}
                                    </Styles.StoreRatingText>
                                </Styles.StoreRatingSection>
                            </Styles.StoreNameSection>
                            <TouchableWithoutFeedback onPress={() => {
                                const temp = { ...storeState };
                                if (temp.subscribeCheck){
                                    temp.subscribeCheck = !temp.subscribeCheck;
                                    temp.subscribeCount--;
                                    postSubscribe(0, storeIdx)
                                }
                                else{
                                    temp.subscribeCheck = !temp.subscribeCheck;
                                    temp.subscribeCount++;
                                    postSubscribe(1, storeIdx)
                                }
                                setStoreState(temp);
                            }}>
                                <Styles.StoreWantedBox>
                                    <Svg width="22" height="23" viewBox="0 0 22 23" fill={storeState.subscribeCheck ? '#8377E9' : 'none'}>
                                        <Path
                                            d="M11.0134 3.6265C4.89497 -3.59166 -2.89207 5.59509 3.22632 12.8132L11.0134 22L18.8004 12.8132C24.8721 5.65021 17.085 -3.53654 11.0134 3.6265Z"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </Svg>
                                    <Styles.StoreWantedText>
                                        {storeState.subscribeCount}
                                    </Styles.StoreWantedText>
                                </Styles.StoreWantedBox>
                            </TouchableWithoutFeedback>
                        </Styles.StoreInformationSection>
                        <Styles.StoreInformationSection2>
                            <Styles.StoreInformationTouch onPress={async () => {
                                const phoneNumber = storeState.storePhone.replace(/-/g, ''); // 전화번호

                                const supported = await Linking.canOpenURL(`tel:${phoneNumber}`);
                                if (supported) {
                                    await Linking.openURL(`tel:${phoneNumber}`);
                                } else {
                                    console.log(`전화 걸기를 지원하지 않는 기기입니다.`);
                                }
                            }}>
                                <Styles.StoreInformationTouchSVGBox>
                                    <Svg width="25" height="26" viewBox="0 0 25 26" fill="none">
                                        <Path
                                            d="M19.8451 16.4321L18.4451 14.9154C18.0736 14.5135 17.5701 14.2877 17.0451 14.2877C16.5201 14.2877 16.0165 14.5135 15.6451 14.9154L14.9451 15.6737C14.5737 16.076 14.0702 16.3019 13.5451 16.3019C13.02 16.3019 12.5164 16.076 12.1451 15.6737L10.0451 13.3987C9.67378 12.9965 9.46521 12.4509 9.46521 11.8821C9.46521 11.3132 9.67378 10.7677 10.0451 10.3654L10.7451 9.60707C11.1161 9.20467 11.3245 8.65917 11.3245 8.09041C11.3245 7.52164 11.1161 6.97614 10.7451 6.57374L9.34506 5.05707C9.17348 4.83567 8.95924 4.65766 8.71738 4.53552C8.47552 4.41339 8.21191 4.3501 7.94506 4.3501C7.67822 4.3501 7.41461 4.41339 7.17275 4.53552C6.93089 4.65766 6.71664 4.83567 6.54506 5.05707C2.86306 9.01666 4.60106 13.5872 8.28106 17.5717C11.9611 21.5562 16.1811 23.4412 19.8451 19.4697C20.0501 19.2839 20.2151 19.0515 20.3282 18.7891C20.4414 18.5267 20.5 18.2406 20.5 17.9509C20.5 17.6613 20.4414 17.3751 20.3282 17.1127C20.2151 16.8503 20.0501 16.6179 19.8451 16.4321Z"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </Svg>
                                </Styles.StoreInformationTouchSVGBox>
                                <Styles.StoreInformationTouchText>
                                    전화하기
                                </Styles.StoreInformationTouchText>
                            </Styles.StoreInformationTouch>
                            <Styles.StoreInformationTouch>
                                <Styles.StoreInformationTouchSVGBox>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <Path
                                            d="M12 19.5001C12 18.5001 4 16.8001 3 17.5001V4.80014C4 3.80014 12 5.50714 12 6.50614M12 19.5001V6.50614M12 19.5001C12 18.5001 20 16.8001 21 17.5001V4.80014C20 3.80014 12 5.50714 12 6.50614"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </Svg>
                                </Styles.StoreInformationTouchSVGBox>
                                <Styles.StoreInformationTouchText>
                                    원산지 보기
                                </Styles.StoreInformationTouchText>
                            </Styles.StoreInformationTouch>
                            <Styles.StoreInformationTouch onPress={() => navigation.navigate('StoreMapPage', {latitude: storeState.y, longitude: storeState.x})}>
                                <Styles.StoreInformationTouchSVGBox>
                                    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <Path
                                            d="M8.98613 3.746C8.98613 7.938 12.5781 5.406 13.5781 9.5C13.5781 10.328 14.5781 11 15.5781 11C16.5781 11 17.5781 10.328 17.5781 9.5C17.5781 9.10218 17.7362 8.72064 18.0175 8.43934C18.2988 8.15804 18.6803 8 19.0781 8H20.5781M4.55813 8.471C8.57812 10.719 6.33413 12.687 9.43613 14.116C12.6791 15.61 11.4991 21 11.4991 21M20.8651 15H18.5781C17.7825 15 17.0194 15.3161 16.4568 15.8787C15.8942 16.4413 15.5781 17.2044 15.5781 18V20M21.5781 12C21.5781 16.9706 17.5487 21 12.5781 21C7.60756 21 3.57812 16.9706 3.57812 12C3.57812 7.02944 7.60756 3 12.5781 3C17.5487 3 21.5781 7.02944 21.5781 12Z"
                                            stroke="#8377E9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                </Styles.StoreInformationTouchSVGBox>
                                <Styles.StoreInformationTouchText>
                                    지도보기
                                </Styles.StoreInformationTouchText>
                            </Styles.StoreInformationTouch>
                        </Styles.StoreInformationSection2>
                        <Styles.StoreMap>
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

                        </Styles.StoreMap>
                        <Styles.StoreAddressWrapper>
                            <Styles.StoreAddressSection>
                                <WithLocalSvg
                                    width={22}
                                    height={22}
                                    asset={MapLocationSVG} />
                                <Styles.StoreAddressTextBox>
                                    <Styles.StoreAddressText>
                                        {storeState.storeAddress}
                                    </Styles.StoreAddressText>
                                    <Styles.StoreAddressText>
                                        {userLocation.longitude && userLocation.latitude ? `(현재 주소로부터 약 ${storeState.distance}m, 도보 ${storeState.duration}분)` : ''}
                                        {!userLocation.longitude && !userLocation.latitude ? `(위치에 문제가 발생했습니다)` : ''}
                                    </Styles.StoreAddressText>
                                </Styles.StoreAddressTextBox>
                            </Styles.StoreAddressSection>
                            <TouchableOpacity onPress={() => Clipboard.setStringAsync(storeState.storeAddress)}>
                                <Styles.StoreAddressCopyText>
                                    주소복사
                                </Styles.StoreAddressCopyText>
                            </TouchableOpacity>
                        </Styles.StoreAddressWrapper>
                        <Styles.NavigationBar>
                            <Styles.MenuBox onPress={() => setSelected(1)}>
                                <Styles.MenuText selected={selected === 1}>
                                    메뉴
                                </Styles.MenuText>
                                {selected === 1 && <Styles.Line />}
                            </Styles.MenuBox>
                            <Styles.MenuBox onPress={() => setSelected(2)}>
                                <Styles.MenuText selected={selected === 2}>
                                    정보
                                </Styles.MenuText>
                                {selected === 2 && <Styles.Line />}
                            </Styles.MenuBox>
                            <Styles.MenuBox onPress={() => setSelected(3)}>
                                <Styles.MenuText selected={selected === 3}>
                                    리뷰
                                </Styles.MenuText>
                                {selected === 3 && <Styles.Line />}
                            </Styles.MenuBox>
                        </Styles.NavigationBar>
                        {selected === 1 && <MenuComponent storeIdx={storeIdx}/>}
                        {selected === 2 && <InfoComponent storeIdx={storeIdx}/>}
                        {selected === 3 && <ReviewComponent storeIdx={storeIdx}/>}
                    </Styles.StoreDetailWrapper>
                )}/>

            <CustomModaless
                isVisible={basketAdd}
                setVisible={() => dispatch(basketAddAction({ add: false }))}
                text='장바구니에 메뉴를 추가했습니다.'/>

        </SafeAreaView>
    )
}

function StarBox({seq, score}) {
    let percent;

    if (score > seq) {
        if (score - seq >= 1)
            percent = 10;
        else
            percent = (score - seq) * 10;
    }
    else
        percent = 0;


    return (
        <Styles.EmptyView>
            <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                <Path d="M20.0968 9.32291C20.0168 9.07281 19.8679 8.85035 19.6671 8.68107C19.4664 8.51179 19.222 8.40256 18.962 8.36591L14.3319 7.69308L12.2611 3.49749C12.1451 3.26201 11.9654 3.06371 11.7425 2.92505C11.5196 2.78638 11.2623 2.71289 10.9998 2.71289C10.7373 2.71289 10.48 2.78638 10.2571 2.92505C10.0342 3.06371 9.8545 3.26201 9.73846 3.49749L7.66771 7.69308L3.03763 8.36591C2.77764 8.40353 2.53337 8.51317 2.33248 8.68244C2.13158 8.8517 1.98208 9.07382 1.9009 9.32366C1.81972 9.5735 1.8101 9.84107 1.87313 10.0961C1.93616 10.3511 2.06932 10.5834 2.25754 10.7667L5.60888 14.0327L4.81779 18.6445C4.7729 18.9032 4.80145 19.1693 4.9002 19.4127C4.99895 19.656 5.16394 19.8667 5.37644 20.021C5.58894 20.1753 5.84043 20.2669 6.10237 20.2854C6.36431 20.3039 6.62619 20.2486 6.85829 20.1258L10.9998 17.9469L15.1413 20.124C15.3735 20.2461 15.6353 20.3009 15.897 20.282C16.1588 20.2631 16.41 20.1714 16.6223 20.0172C16.8346 19.8629 16.9995 19.6524 17.0984 19.4093C17.1973 19.1663 17.2262 18.9004 17.1818 18.6417L16.3907 14.0309L19.742 10.7667C19.9312 10.5839 20.0648 10.3514 20.1276 10.0959C20.1903 9.8405 20.1797 9.57254 20.0968 9.32291Z"
                      stroke="#F6C844"/>
                <Styles.EmptyView percentage={percent}>
                    <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                        <Path d="M20.0968 9.32291C20.0168 9.07281 19.8679 8.85035 19.6671 8.68107C19.4664 8.51179 19.222 8.40256 18.962 8.36591L14.3319 7.69308L12.2611 3.49749C12.1451 3.26201 11.9654 3.06371 11.7425 2.92505C11.5196 2.78638 11.2623 2.71289 10.9998 2.71289C10.7373 2.71289 10.48 2.78638 10.2571 2.92505C10.0342 3.06371 9.8545 3.26201 9.73846 3.49749L7.66771 7.69308L3.03763 8.36591C2.77764 8.40353 2.53337 8.51317 2.33248 8.68244C2.13158 8.8517 1.98208 9.07382 1.9009 9.32366C1.81972 9.5735 1.8101 9.84107 1.87313 10.0961C1.93616 10.3511 2.06932 10.5834 2.25754 10.7667L5.60888 14.0327L4.81779 18.6445C4.7729 18.9032 4.80145 19.1693 4.9002 19.4127C4.99895 19.656 5.16394 19.8667 5.37644 20.021C5.58894 20.1753 5.84043 20.2669 6.10237 20.2854C6.36431 20.3039 6.62619 20.2486 6.85829 20.1258L10.9998 17.9469L15.1413 20.124C15.3735 20.2461 15.6353 20.3009 15.897 20.282C16.1588 20.2631 16.41 20.1714 16.6223 20.0172C16.8346 19.8629 16.9995 19.6524 17.0984 19.4093C17.1973 19.1663 17.2262 18.9004 17.1818 18.6417L16.3907 14.0309L19.742 10.7667C19.9312 10.5839 20.0648 10.3514 20.1276 10.0959C20.1903 9.8405 20.1797 9.57254 20.0968 9.32291Z"
                              fill="#F6C844"/>
                    </Svg>
                </Styles.EmptyView>
            </Svg>
        </Styles.EmptyView>
    )

}