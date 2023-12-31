// react-native, expo
import {View, TouchableOpacity, StatusBar, Platform} from 'react-native';
import React, {useEffect, useState} from "react";
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { WithLocalSvg } from 'react-native-svg';
// utils
import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie"
// styles
import styled from 'styled-components/native';
// images
import WhiteLeftSVG from 'assets/images/white_left.svg';
import WhiteBellSVG from 'assets/images/white_bell.svg';
import WhiteCartSVG from 'assets/images/white_cart.svg';
import DefaultLeftSVG from 'assets/images/default_left.svg';
import DefaultBellSVG from 'assets/images/default_bell.svg';
import DefaultCartSVG from 'assets/images/default_cart.svg';
import XSVG from 'assets/images/x.svg';

const HeaderWrapper = styled.View`
  position: relative;
  display: flex;
  z-index: 100;
  flex-direction: row;
  padding: 10px 16px;
  justify-content: space-between;
  align-items: center;
`

const HeaderRightWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 17px;
`

const HeaderTitleWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const HeaderTitle = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-family: "Pretendard-Medium";
  font-style: normal;
  font-weight: 500;
`


function Header({ color, backgroundColor, title, left = 1, right = 1, statusBar = 'black'}) {
    const LeftComponent = left === 0 ? EmptyView : left === 1 ? color === 'white' ? WhiteLeft : DefaultLeft : X;
    const BellComponent = right === 1 ? color === 'white' ? WhiteBell : DefaultBell : EmptyView;
    const BasketComponent = right === 1 ? color === 'white' ? WhiteCart : DefaultCart : EmptyView;
    const [ nums, setNums ] = useState(0);
    const focus = useIsFocused();
    const routeList = useNavigation().getState().routes
    const currentPage = routeList[routeList.length-1].name


    useEffect(() => {
        if (focus === true) {
            console.log("(헤더)페이지 렌더링: ", currentPage);

            if (statusBar === 'black') {
                StatusBar.setBarStyle('dark-content');

                // Android만 backgroundColor 설정
                if (Platform.OS === 'android') {
                    StatusBar.setBackgroundColor("transparent");
                }
            } else {
                StatusBar.setBarStyle('light-content');
            }

            getData();
        }
    }, [focus]);




    const getData = async () => {
        const apiUrl = baseUrl + "/jat/app/basket/count";
        const jwt = await getToken();

        const requestOptions = {
            method: 'GET',
            headers: {
                'X-ACCESS-TOKEN': jwt,
            },
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();

            if (data.code === 1000) {
                setNums(data.result.basketCount);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }


    return (
        <View style={{ position: 'relative', backgroundColor: backgroundColor ? backgroundColor : null}}>

            <HeaderWrapper>
                <LeftComponent />
                <HeaderRightWrapper>
                    <BellComponent />
                    <BasketComponent nums={nums}/>
                </HeaderRightWrapper>
            </HeaderWrapper>
            <HeaderTitleWrapper>
                <HeaderTitle>{title}</HeaderTitle>
            </HeaderTitleWrapper>
        </View>
    );
}


const DefaultLeft = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.pop()}>
            <WithLocalSvg
                width={25}
                height={24}
                asset={DefaultLeftSVG} />
        </TouchableOpacity>
    )
}

const WhiteLeft = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.pop()}>
            <WithLocalSvg
                width={25}
                height={24}
                asset={WhiteLeftSVG}/>
        </TouchableOpacity>
    )
}

const DefaultBell = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('AlramList')}>
            <WithLocalSvg
                width={24}
                height={24}
                asset={DefaultBellSVG}/>
        </TouchableOpacity>
    )
}

const WhiteBell = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('AlramList')}>
            <WithLocalSvg
                width={24}
                height={24}
                asset={WhiteBellSVG}/>
        </TouchableOpacity>
    )
}

const DefaultCart = ({nums}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('BasketPage')}>
            <WithLocalSvg
                width={24}
                height={24}
                asset={DefaultCartSVG}/>
            <BasketQuantityBox>
                <BasketQuantityText>
                    {nums}
                </BasketQuantityText>
            </BasketQuantityBox>
        </TouchableOpacity>
    )
}

const WhiteCart = ({nums}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('BasketPage')}>
            <WithLocalSvg
                width={24}
                height={24}
                asset={WhiteCartSVG}/>
            <BasketQuantityBox>
                <BasketQuantityText>
                    {nums}
                </BasketQuantityText>
            </BasketQuantityBox>
        </TouchableOpacity>
    )
}

const X = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
            <WithLocalSvg
                width={34}
                height={24}
                asset={XSVG}/>
        </TouchableOpacity>

    )
}

const EmptyView = styled.View`
  width: 24px;
  height: 24px;
`

const BasketQuantityBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 12px;
  bottom: 14px;
  width: 17px;
  height: 17px;
  background: #8377E9;
  border-radius: 17px;
`

const BasketQuantityText = styled.Text`
  color: #FFF;
  text-align: center;
  font-family: 'Pretendard-Medium';
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
`


function areHeadEqual(prevProps, nextProps) {
    return (
        prevProps.color === nextProps.color &&
        prevProps.backgroundColor === nextProps.backgroundColor &&
        prevProps.title === nextProps.title &&
        prevProps.left === nextProps.left &&
        prevProps.right === nextProps.right &&
        prevProps.statusBar === nextProps.statusBar
    );
}

export default React.memo(Header, areHeadEqual);