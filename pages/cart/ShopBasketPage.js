import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform,
    TouchableWithoutFeedback
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

// 안드로이드
//const statusBarHeight = Constants.statusBarHeight;
//const windowHeight = Dimensions.get('window').height;


// IOS
const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = windowHeight - statusBarHeight;

export default function ShopBasketPage({ navigation }) {


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
                console.log(data)
                if (data.code === 1000){
                    console.log(data)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
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
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('StoreDetailPage')}>
                                <ShopSection>
                                    <ShopImage resizeMode="cover" source={{uri: 'https://s3-alpha-sig.figma.com/img/dc3f/fab0/770d06d808e97bcc6bba2bed883bf55b?Expires=1691366400&Signature=jj0WemQiRINpwE~sArwik3nGMq9~aui8gwfowCfoJhyvRC5IzaGzCSCVNw04Onb1C2Rqb-J2wNgMsSCcOWyMhOgFjs5c0e6tK2EaDiAZkP4yowcisYjci2UK7VudXYhNzUoMepJ32oh6-TKK9-U~zLWk41bec14hyfph~TGcWvcTijoLYh5Mu3-cBxDM00nkqNaCGbBEZkBtVm-l85Zi~e8xQbtxY6aatxhoSSTJQmV8iZf0w0GPYVPLCt6SgJqmVbSxeg1l1P6DbT1qE9h~Dbo-wrBE1WjUNqmIkA8po1dY9PBzIg2oW745z8idsAEZUKWbqk5-UTA0it2OTuAbhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}} />
                                    <ShopText>
                                        울산미주구리
                                    </ShopText>
                                </ShopSection>
                            </TouchableWithoutFeedback>
                        </ShopWrapper>
                        <MenuContainer>
                            <MenuWrapper>
                                <CancelTouch>
                                    <WithLocalSvg
                                        width={12}
                                        height={12}
                                        asset={CancelSVG} />
                                </CancelTouch>
                                <MenuImage resizeMode="cover" source={{uri: 'https://s3-alpha-sig.figma.com/img/dc3f/fab0/770d06d808e97bcc6bba2bed883bf55b?Expires=1691366400&Signature=jj0WemQiRINpwE~sArwik3nGMq9~aui8gwfowCfoJhyvRC5IzaGzCSCVNw04Onb1C2Rqb-J2wNgMsSCcOWyMhOgFjs5c0e6tK2EaDiAZkP4yowcisYjci2UK7VudXYhNzUoMepJ32oh6-TKK9-U~zLWk41bec14hyfph~TGcWvcTijoLYh5Mu3-cBxDM00nkqNaCGbBEZkBtVm-l85Zi~e8xQbtxY6aatxhoSSTJQmV8iZf0w0GPYVPLCt6SgJqmVbSxeg1l1P6DbT1qE9h~Dbo-wrBE1WjUNqmIkA8po1dY9PBzIg2oW745z8idsAEZUKWbqk5-UTA0it2OTuAbhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}} />
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuDetailPage')}>
                                    <MenuSection>
                                        <MenuTitle>
                                            도다리 1KG
                                        </MenuTitle>
                                        <OriginalPriceSection>
                                            <OriginalPriceText>
                                                40,000원
                                            </OriginalPriceText>
                                            <DiscountRate>
                                                50 %
                                            </DiscountRate>
                                        </OriginalPriceSection>
                                        <DiscountSection>
                                            <WithLocalSvg
                                                width={24}
                                                height={22.75}
                                                asset={ArrowRightSVG} />
                                            <DiscountPriceText>
                                                20,000원
                                            </DiscountPriceText>
                                        </DiscountSection>
                                        <QuantitySection>
                                            <TouchableOpacity>
                                                <WithLocalSvg
                                                    width={22}
                                                    height={20}
                                                    asset={MinusSVG} />
                                            </TouchableOpacity>
                                            <QuantityText>
                                                2개
                                            </QuantityText>
                                            <TouchableOpacity>
                                                <WithLocalSvg
                                                    width={22}
                                                    height={20}
                                                    asset={PlusSVG} />
                                            </TouchableOpacity>
                                        </QuantitySection>
                                    </MenuSection>
                                </TouchableWithoutFeedback>
                            </MenuWrapper>
                        </MenuContainer>

                    </CartContainer>
                    <CartOrderWrapper>
                        <CartOrderButton onPress={() => navigation.navigate('OrderPage')}>
                            <CartOrderText>
                                주문하기
                            </CartOrderText>
                        </CartOrderButton>
                        <CartQuantitySection>
                            <CartQuantityText>
                                담은 갯수 : 2개
                            </CartQuantityText>
                            <CartQuantityText>
                                /
                            </CartQuantityText>
                            <CartTotalPriceText>
                                총 40,000원
                            </CartTotalPriceText>
                        </CartQuantitySection>
                    </CartOrderWrapper>
                </Container>
            </ContainerScrollView>

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
  justify-content: center;
  align-items: center;
  height: 35px;
  padding:0 22px;
  gap: 40px;
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
