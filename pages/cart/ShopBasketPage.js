import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform,
    TouchableWithoutFeedback, Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { WithLocalSvg } from 'react-native-svg';
import ArrowRightSVG from '../../assets/images/arrow_right.svg';
import MinusSVG from "../../assets/images/minus.svg";
import PlusSVG from "../../assets/images/plus.svg";
import CancelSVG from "../../assets/images/cancel.svg";
import Header from "../../components/common/Header";
import {baseUrl, jwt} from "../../utils/baseUrl";
import {basketAddAction} from "../../store/basketAdd";
import CustomModal from "../../components/modal/CustomModal";
import NetInfo from "@react-native-community/netinfo";
import CustomModaless from "../../components/modal/CustomModaless";

// 안드로이드
//const statusBarHeight = Constants.statusBarHeight;
//const windowHeight = Dimensions.get('window').height;


// IOS
const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = windowHeight - statusBarHeight;

export default function ShopBasketPage({ navigation }) {
    const [ basketState, setBasketState ] = useState({
        storeIdx: 0,
        storeName: '',
        storeUrl: null,
        totalMenuCount: 0,
        totalMenuPrice: 0,
        basketItems: []
    });
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ visibleModaless, setVisibleModaless] = useState(false);

    useEffect(() => {
        getBasketList();
    }, [])


    const getBasketList = () => {
        const apiUrl = baseUrl+"/jat/app/basket";

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
                    if (!data.result.basketItems)
                        data.result.basketItems = []
                    setBasketState(data.result)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const getOrder = () => {
        const apiUrl = baseUrl+"/jat/app/basket/order";

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

                    if (data.result.storeIdx === 0){
                        setVisibleModaless(true)
                    }
                    else
                        navigation.navigate('OrderPage' ,{
                            ...data.result,
                            storeUrl: basketState.storeUrl
                        })

                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    function cancel() {
        setVisibleModal(false)
    }

    async function checkConnection() {
        const state = await NetInfo.fetch()

        if (state.isConnected)
            getOrder()
        else
            setVisibleModal(true)
    }


    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <Header
                title='장바구니'
                backgroundColor='white'/>
            <ContainerScrollView showsVerticalScrollIndicator={false}>
                <Container>
                    <CartContainer>
                        <ShopWrapper>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('StoreDetailPage', {storeIdx: basketState.storeIdx})}>
                                <ShopSection>
                                    <ShopImage resizeMode="contain" source={{uri: basketState.storeUrl}} />
                                    <ShopText>
                                        {basketState.storeName}
                                    </ShopText>
                                </ShopSection>
                            </TouchableWithoutFeedback>
                        </ShopWrapper>
                        <MenuContainer>
                            {
                                basketState.basketItems.map(
                                    (items, index) => (
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuDetailPage', {
                                            storeIdx: items.storeIdx,
                                            menuIdx: items.todaymenuIdx,
                                        })}>
                                        <MenuWrapper>
                                            <CancelTouch>
                                                <WithLocalSvg
                                                    width={12}
                                                    height={12}
                                                    asset={CancelSVG} />
                                            </CancelTouch>
                                            <MenuImage resizeMode="cover" source={{uri: items.menuUrl}} />
                                                <MenuSection>
                                                    <MenuTitle>
                                                        {items.menuName}
                                                    </MenuTitle>
                                                    <OriginalPriceSection>
                                                        <OriginalPriceText>
                                                            {items.price.toLocaleString() + '원'}
                                                        </OriginalPriceText>
                                                        <DiscountRate>
                                                            {items.discount.toString() + ' %'}
                                                        </DiscountRate>
                                                    </OriginalPriceSection>
                                                    <DiscountSection>
                                                        <WithLocalSvg
                                                            width={24}
                                                            height={22.75}
                                                            asset={ArrowRightSVG} />
                                                        <DiscountPriceText>
                                                            {items.todayPrice.toLocaleString() + '원'}
                                                        </DiscountPriceText>
                                                    </DiscountSection>
                                                    <TouchableWithoutFeedback>
                                                        <QuantitySection>
                                                            <TouchableOpacity onPress={() => {
                                                                const temp = { ...basketState };
                                                                if (temp.basketItems[index].count > 1){
                                                                    temp.basketItems[index].count--;
                                                                    setBasketState(temp)
                                                                }
                                                            }}>
                                                                <WithLocalSvg
                                                                    width={22}
                                                                    height={20}
                                                                    asset={MinusSVG} />
                                                            </TouchableOpacity>
                                                            <QuantityText>
                                                                {items.count.toString()+ '개'}
                                                            </QuantityText>
                                                            <TouchableOpacity onPress={() => {
                                                                const temp = { ...basketState };
                                                                if (temp.basketItems[index].count < 99){
                                                                    temp.basketItems[index].count++;
                                                                    setBasketState(temp)
                                                                }
                                                            }}>
                                                                <WithLocalSvg
                                                                    width={22}
                                                                    height={20}
                                                                    asset={PlusSVG} />
                                                            </TouchableOpacity>
                                                        </QuantitySection>
                                                    </TouchableWithoutFeedback>

                                                </MenuSection>
                                        </MenuWrapper>
                                        </TouchableWithoutFeedback>
                                    )
                                )
                            }
                        </MenuContainer>
                    </CartContainer>
                    <CartOrderWrapper>
                        <CartOrderButton onPress={checkConnection}>
                            <CartOrderText>
                                주문하기
                            </CartOrderText>
                        </CartOrderButton>
                        <CartQuantitySection>
                            <CartQuantityText>
                                담은 갯수 : {basketState.totalMenuCount}개
                            </CartQuantityText>
                            <CartQuantityText>
                                /
                            </CartQuantityText>
                            <CartTotalPriceText>
                                총 {basketState.totalMenuPrice.toLocaleString()}원
                            </CartTotalPriceText>
                        </CartQuantitySection>
                    </CartOrderWrapper>
                </Container>
            </ContainerScrollView>

            <CustomModal
                isVisible={visibleModal}
                onBackdropPress={cancel}>
                <DisconnectedWrapper>
                    <DisconnectedText>
                        인터넷 연결을 확인하고 다시 시도해주세요.
                    </DisconnectedText>
                    <TouchableOpacity onPress={cancel}>
                        <DisconnectedCheckBox>
                            <DisconnectedCheckText>
                                확인
                            </DisconnectedCheckText>
                        </DisconnectedCheckBox>
                    </TouchableOpacity>
                </DisconnectedWrapper>
            </CustomModal>

            <CustomModaless
                isVisible={visibleModaless}
                setVisible={() => setVisibleModaless(false)}
                text='장바구니가 비어있습니다.'/>
        </SafeAreaView>
    )
}

const ContainerScrollView = styled.ScrollView`
  background: #FFF;
  height: ${totalHeight-44}px;
`

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`

const CartContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ShopWrapper = styled.View`
  display: flex;
  width: 360px;
  margin: 18px 0 22px;
  flex-direction: row;
  justify-content: flex-start;
`

const ShopSection = styled.View`
  display: flex;
  height: 35px;
  gap: 10px;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

const ShopImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`

const ShopText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`

const MenuContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const MenuWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 360px;
  height: 203px;
  border-radius: 30px;
  background: #FFF;
  padding: 14px 29px 15px 12px;

  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 0px;
      shadow-opacity: 0.1;
      shadow-radius: 12px;
    `,
    android: `
      elevation: 5;
    `,
  })}
`

const MenuImage = styled.Image`
  width: 118px;
  height: 84px;
  border-radius: 5px;
`

const MenuSection = styled.View`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
`

const MenuTitle = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px;
  margin-bottom: 15px;
`

const OriginalPriceSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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

const DiscountRate = styled.Text`
  color: #F00;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 250% */
`

const DiscountSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 19px;
  margin-bottom: 19px;
`

const DiscountPriceText = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 218.75% */
`

const QuantitySection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  width: 187px;
  padding:0 22px;
  border-radius: 15px;
  background: #F8F8F8;
`

const QuantityText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
`

const CancelTouch = styled.TouchableOpacity`
  position: absolute;
  top: 19px;
  right: 17px;
`

const CartQuantitySection = styled.View`
  position: absolute;
  width: 200px;
  top: 108px;
  right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const CartQuantityText = styled.Text`
  color: #555;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`

const CartTotalPriceText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
`


const CartOrderWrapper = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  width: 360px;
  margin: 0 auto;
  padding: 163px 0 40px;
`

const CartOrderButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #604EF8;
`

const CartOrderText = styled.Text`
  color: #FFF;
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`

const DisconnectedWrapper = styled.View`
  width: 100%;
  height: 313px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 116px;
  gap: 48px;
`

const DisconnectedText = styled.Text`
  color: #2F2F38;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 111.111% */
`

const DisconnectedCheckBox = styled.View`
  display: flex;
  width: 93px;
  height: 33px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #F5F3FF;
`

const DisconnectedCheckText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
`