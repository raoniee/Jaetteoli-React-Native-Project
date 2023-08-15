// react-native, expo
import React, {useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Platform
} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import {useRoute} from "@react-navigation/native";
// redux
import { useDispatch } from "react-redux";
import { basketAddAction } from "store/basketAdd";
// utils
import {statusBarHeight, totalHeight} from 'utils/dimensions'
import {multiApiAddBasket} from "./utils/multiApiAddBasket";
import {getMenuDetailInfo} from "./utils/getMenuDetailInfo";
import {postAddBasket} from "./utils/postAddBasket";
// styles
import styled from 'styled-components/native';
// images
import DownSVG from 'assets/images/down.svg';
import ArrowRightSVG from 'assets/images/arrow_right.svg';
import MinusSVG from 'assets/images/minus.svg';
import PlusSVG from 'assets/images/plus.svg';
import WarningSVG from 'assets/images/warning.svg';
// components
import CustomModaless from "components/Heo/modal/CustomModaless";
import CustomModal from "components/Heo/modal/CustomModal";
import Header from 'components/common/Header';


export default function MenuDetailPage({ navigation }) {
    const [ menuState, setMenuState ] = useState({
        storeIdx: 0,
        todaymenuIdx: 0,
        menuUrl: null,
        menuName: '',
        remain: 0,
        composition: '',
        description: '',
        originPrice: 0,
        discount: 0,
        todayPrice: 0
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const route = useRoute()
    const {storeIdx, menuIdx, from} = route.params
    const [ visibleModaless, setVisibleModaless ] = useState(false);
    const [ visibleModal, setVisibleModal ] = useState(false);

    useEffect(() => {
        handleGetMenuDetailInfo()
    }, [])

    const handleGetMenuDetailInfo = async () => {
        const result = await getMenuDetailInfo(menuIdx);
        if (result.status === 1)
            setMenuState(result.data)
    }

    const handleAddBasket = async (other = false) => {
        try {
            if (other) {
                // 다른 가게 모달창 뜬 경우
                const result = await postAddBasket(storeIdx, menuIdx, quantity, 1)
                if (result.status === 1) {
                    dispatch(basketAddAction({add: true}))
                    navigation.pop();
                }

            } else {
                // 일반적인 담기
                const result = await multiApiAddBasket(storeIdx, menuState.todaymenuIdx, quantity, from);
                switch (result.status) {
                    case 1:
                        // 매진
                        setVisibleModaless(true);
                        break;
                    case 2:
                        // 다른 가게
                        setVisibleModal(true)
                        break;
                    case 3:
                        // 개수 추가
                        // 가게 상세
                        dispatch(basketAddAction({add: true}))
                        navigation.pop()
                        break;
                    case 4:
                        // 개수 추가
                        // 그외 경로
                        navigation.pop()
                        break;
                    case 5:
                        // 메뉴 추가
                        dispatch(basketAddAction({add: true}))
                        navigation.pop()
                        break;
            }

            }
        } catch (error) {
            console.error("Error adding to basket:", error);
        }
    };

    return (
        <SafeAreaView>

            <FoodImg resizeMode="cover" source={{uri: menuState.menuUrl}} />
            <Header
                color="white"
                navigation={navigation}/>
            <Container showsVerticalScrollIndicator={false}>
                <MenuContainer>
                    <View>
                        <MenuInfoWrapper>
                            <MenuTitleSection>
                                <MenuTitleText1>
                                    {menuState.menuName}
                                </MenuTitleText1>
                                <MenuTitleText2>
                                    {menuState.composition}
                                </MenuTitleText2>
                            </MenuTitleSection>
                            <MenuDescriptionText numberOfLines={isExpanded ? undefined : 2}>
                                {menuState.description}
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
                                    {`재고 ${menuState.remain}개`}
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
                                        {menuState.originPrice.toLocaleString()}원
                                    </OriginalPriceText>
                                    <DiscountRateText>
                                        {menuState.discount} %
                                    </DiscountRateText>
                                </OriginalPriceSection>
                                <WithLocalSvg
                                    width={24}
                                    height={22.75}
                                    asset={ArrowRightSVG} />
                                <DiscountPriceText>
                                    {menuState.todayPrice.toLocaleString()}원
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
                                    if (quantity < menuState.remain)
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
                        <MenuOrderButton onPress={() => handleAddBasket()}>
                            <MenuOrderText>
                                {(menuState.todayPrice * quantity).toLocaleString()}원 담기
                            </MenuOrderText>
                        </MenuOrderButton>
                    </MenuOrderWrapper>
                </MenuContainer>
            </Container>

            <CustomModal isVisible={visibleModal}>
                <ModalWrapper>
                    <ModalContentSection>
                        <ModalTitle>
                            장바구니에 추가 하시겠습니까?
                        </ModalTitle>
                        <ModalText>
                            {`다른 가게의 메뉴입니다.\n 기존의 장바구니가 지워집니다.`}
                        </ModalText>
                    </ModalContentSection>
                    <ModalCheckSection>
                        <TouchableOpacity onPress={() => {
                            setVisibleModal(false)
                            navigation.pop()
                        }}>
                            <ModalCheckBox  color="#F8F8F8">
                                <ModalCheckText>
                                    아니오
                                </ModalCheckText>
                            </ModalCheckBox>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setVisibleModal(false)
                            handleAddBasket(true)
                        }}>
                            <ModalCheckBox>
                                <ModalCheckText>
                                    네
                                </ModalCheckText>
                            </ModalCheckBox>
                        </TouchableOpacity>
                    </ModalCheckSection>
                </ModalWrapper>
            </CustomModal>

            <ModalessSection>
                <CustomModaless
                    isVisible={visibleModaless}
                    setVisible={() => setVisibleModaless(false)}
                    text="해당 메뉴는 매진되었습니다."/>
            </ModalessSection>
        </SafeAreaView>
    )
}

const ModalessSection = styled.View`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
`

const FoodImg = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 333px;
`

const Container = styled.ScrollView`
  position: absolute;
  top: ${Platform.OS === 'ios' ? 227 + statusBarHeight : 227}px;
  left: 0;
  width: 100%;
  height: ${totalHeight - 227}px;
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

const ModalWrapper = styled.View`
  width: 100%;
  height: 313px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 76px;
  gap: 48px;
`

const ModalContentSection = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ModalTitle = styled.Text`
  color: #2F2F38;
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 111.111% */
`

const ModalText = styled.Text`
  color: #2F2F38;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 111.111% */
`

const ModalCheckSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 290px;
  justify-content: space-between;
`

const ModalCheckBox = styled.View`
  display: flex;
  width: 93px;
  height: 33px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${({color}) => color ? color : '#F5F3FF'};
`

const ModalCheckText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
`