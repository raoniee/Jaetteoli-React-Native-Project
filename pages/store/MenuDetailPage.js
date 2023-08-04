import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View, Text, Button, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, Alert} from 'react-native';
import Constants from 'expo-constants';
import { WithLocalSvg } from 'react-native-svg';
import DownSVG from '../../assets/images/down.svg';
import ArrowRightSVG from '../../assets/images/arrow_right.svg';
import MinusSVG from '../../assets/images/minus.svg';
import PlusSVG from '../../assets/images/plus.svg';
import WarningSVG from '../../assets/images/warning.svg';
import Header from '../../components/common/Header';
import { useDispatch } from "react-redux";
import { basketAddAction } from "../../store/basketAdd";
import {baseUrl, jwt} from "../../utils/baseUrl";

// 안드로이드
//const statusBarHeight = Constants.statusBarHeight;
//const windowHeight = Dimensions.get('window').height;

// IOS
const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = windowHeight;

export default function MenuDetailPage({ navigation, storeIdx, menuIdx }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [discountRate, setDiscountRate] = useState(50)
    const [originalPrice, setOriginalPrice] = useState(40000);
    const [discountPrice, setDiscountPrice] = useState(20000);
    const dispatch = useDispatch();


    const checkSameStore = () => {
        const apiUrl = baseUrl+"/jat/app/basket/same-store";

        const requestOptions = {
            method: 'POST',
            headers: {
                'X-ACCESS-TOKEN': jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeIdx: 2
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const ssc = data.sameStoreCheck
                if (data.code === 1000){
                    if (ssc){
                        Alert.alert(
                            "장바구니에 추가 하시겠습니까?",
                            "다른 가게의 메뉴입니다.\n 기존의 장바구니가 지워집니다.",
                            [
                                {
                                    text: "네",
                                    onPress: () => addBasket(ssc, storeIdx)
                                },
                                {
                                    text: "아니오",
                                    onPress: () => navigation.pop()
                                }
                            ],
                            { cancelable: false}
                        )
                    }
                    else
                        addBasket(ssc)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const addBasket = (sameStoreCheck) => {
        const apiUrl = baseUrl+"/jat/app/basket";

        const requestOptions = {
            method: 'POST',
            headers: {
                'X-ACCESS-TOKEN': jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeIdx: 2,
                todaymenuIdx: 1,
                count: 2,
                sameStoreCheck: 0
            })
        };
        return;

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === 1000){
                    dispatch(basketAddAction({add: true}))
                    navigation.pop();
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }


    return (
        <SafeAreaView>
            <FoodImg resizeMode="cover" source={{uri: 'https://s3-alpha-sig.figma.com/img/d396/b86b/28f9a26c66ec21b7fb0e47c1a6d0971f?Expires=1690761600&Signature=PgokyQeLzYtWB959gYiSJmnLqMiWHjTrHfi0zghq7m-7kAEt3HLr52nnhFPcqak6wBd3hKSRb2PtUr0vwjcBb~TVu2Ll3gpbdEwGILPd5INOzCNmy3~TDL2sL3gvRKflnTbP0rakY1DmXMil5WqERb4AzD9a7EMK2K5DTXqcAcWaNvxk1CXzTTMG3mVuuEADdwWToGRX1cy62rr51n8k8-5vBFzK~FDgqXjYRDc5~HIEVX2y04DA2nKpCxXuceHblajsxSKDI3qkUSA3u0VK2VjwO7ActmNh7dRYCfqUFA9faHD3y2s~T4ZsMD-mqz7UrxPcQvUCEzsukPJWAKKiXA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}} />
            <Header
                color="white"
                navigation={navigation}/>
            <Container showsVerticalScrollIndicator={false}>
                <MenuContainer>
                    <View>
                        <MenuInfoWrapper>
                            <MenuTitleSection>
                                <MenuTitleText1>
                                    도다리
                                </MenuTitleText1>
                                <MenuTitleText2>
                                    상추, 깻잎, 마늘, 고추, 된장 포함
                                </MenuTitleText2>
                            </MenuTitleSection>
                            <MenuDescriptionText numberOfLines={isExpanded ? undefined : 2}>
                                식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다. 식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다.식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다. 식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다.식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다. 식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다.식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다. 식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다.식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다. 식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다.식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다. 식사와 술안주 대용으로 골라먹는 재미와 든든한 한끼를 준비해 봤습니다.
                            </MenuDescriptionText>
                            <MenuDescriptionButton onPress={() => setIsExpanded(!isExpanded)}>
                                <WithLocalSvg
                                    style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg'}] }}
                                    width={24}
                                    height={22.75}
                                    asset={DownSVG} />
                            </MenuDescriptionButton>
                            <QuantityLeftSection>
                                <WithLocalSvg
                                    width={13.5}
                                    height={13.5}
                                    asset={WarningSVG} />
                                <QuantityLeftText>
                                    재고 3개
                                </QuantityLeftText>
                            </QuantityLeftSection>
                        </MenuInfoWrapper>
                        <MenuPriceWrapper>
                            <MenuPriceText>
                                가격
                            </MenuPriceText>
                            <MenuPriceSection>
                                <OriginalPriceSection>
                                    <OriginalPriceText>
                                        {originalPrice.toLocaleString()}원
                                    </OriginalPriceText>
                                    <DiscountRateText>
                                        {discountRate} %
                                    </DiscountRateText>
                                </OriginalPriceSection>
                                <WithLocalSvg
                                    width={24}
                                    height={22.75}
                                    asset={ArrowRightSVG} />
                                <DiscountPriceText>
                                    {discountPrice.toLocaleString()}원
                                </DiscountPriceText>
                            </MenuPriceSection>
                        </MenuPriceWrapper>
                        <MenuQuantityWrapper>
                            <MenuQuantityText>
                                수량
                            </MenuQuantityText>
                            <MenuQuantitySection>
                                <TouchableOpacity onPress={() => {
                                    if (quantity > 1)
                                        setQuantity(quantity-1)
                                }}>
                                    <WithLocalSvg
                                        width={22}
                                        height={20}
                                        asset={MinusSVG} />
                                </TouchableOpacity>
                                <MenuQuantityText2>
                                    {quantity}개
                                </MenuQuantityText2>
                                <TouchableOpacity onPress={() => {
                                    if (quantity < 99)
                                        setQuantity(quantity + 1)
                                }}>
                                    <WithLocalSvg
                                        width={22}
                                        height={20}
                                        asset={PlusSVG} />
                                </TouchableOpacity>
                            </MenuQuantitySection>
                        </MenuQuantityWrapper>
                    </View>
                    <MenuOrderWrapper>
                        <MenuOrderButton onPress={() => checkSameStore()}>
                            <MenuOrderText>
                                {(discountPrice * quantity).toLocaleString()}원 담기
                            </MenuOrderText>
                        </MenuOrderButton>
                    </MenuOrderWrapper>
                </MenuContainer>
            </Container>

        </SafeAreaView>
    )
}

const FoodImg = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 333px;
`

const Container = styled.ScrollView`
  position: absolute;
  top: 281px;
  left: 0;
  width: 100%;
  height: ${totalHeight - 223 - statusBarHeight}px;
  border-radius: 30px 30px 0 0;
  background: white;
`

const MenuContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100%;
`

const MenuInfoWrapper = styled.View`
  position: relative;
  width: 360px;
  display: flex;
  padding: 30px 0 25px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`

const QuantityLeftSection = styled.View`
  position: absolute;
  height: 35px;
  top: 24px;
  right: 0;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: flex-end;
  align-items: center;
`

const QuantityLeftText = styled.Text`
  color: #F00;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
`

const MenuTitleSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
`

const MenuTitleText1 = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
`

const MenuTitleText2 = styled.Text`
  color: #777777;
  font-family: "Pretendard-Medium";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px;
`

const MenuDescriptionText = styled.Text`
  color: #555;
  font-family: "Pretendard-Medium";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  padding-bottom: 33px;
`

const MenuDescriptionButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 25px;
  right: 0;
`

const MenuPriceWrapper = styled.View`
  box-sizing: border-box;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 30px;
  gap: 10px;
`

const MenuPriceText = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px;
`

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

const DiscountRateText = styled.Text`
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



const MenuQuantityWrapper = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MenuQuantityText = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`

const MenuQuantitySection = styled.View`
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

const MenuQuantityText2 = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
`

const MenuOrderWrapper = styled.View`
    padding: 40px 0;
`

const MenuOrderButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #604EF8;
`

const MenuOrderText = styled.Text`
  color: #FFF;
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`
