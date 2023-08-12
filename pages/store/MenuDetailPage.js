import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Alert,
    Platform
} from 'react-native';
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
import {useRoute} from "@react-navigation/native";
import CustomModaless from "../../components/modal/CustomModaless";
import CustomModal from "../../components/modal/CustomModal";

const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = Platform.OS === 'ios' ? windowHeight - statusBarHeight : windowHeight;

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
        getMenuInfo()
    }, [])

    // 메뉴 데이터 가져오기
    const getMenuInfo = (check = 0) => {
        const apiUrl = baseUrl+`/jat/app/menus/detail?todaymenuIdx=${menuIdx}`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'X-ACCESS-TOKEN': jwt,
            }
        }

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000 && !check) {
                    setMenuState(data.result)
                }
                else if (check){
                    // 매진인지 확인
                    if (data.result.remain === 0)
                        setVisibleModaless(true)
                    else
                        checkSameStore()
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const checkSameStore = () => {
        const apiUrl = baseUrl+"/jat/app/basket/same-store";

        const requestOptions = {
            method: 'POST',
            headers: {
                'X-ACCESS-TOKEN': jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeIdx: storeIdx
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000){
                    const ssc = data.result.sameStoreCheck
                    if (ssc){
                        setVisibleModal(true)
                    }
                    else
                        // 만약 중복되는 메뉴이다
                        // 그러면 장바구니 추가가 아니라 수정 API 사용
                        // 장바구니->메뉴 이렇게 갔으면
                        getBasket(ssc)
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
                storeIdx: storeIdx,
                todaymenuIdx: menuIdx,
                count: quantity,
                sameStoreCheck: sameStoreCheck
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000){
                    // 가게 상세에서 온건지, 장바구니에서 온건지 확인
                    if (from === 'StoreDetailPage')
                        dispatch(basketAddAction({add: true}))
                    navigation.pop();
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const getBasket = (ssc) => {
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
                    const basketList = data.result.basketItems
                    if (basketList){
                        const duplicateItem = basketList.find(item => item.todaymenuIdx === menuState.todaymenuIdx);
                        if (duplicateItem) {
                            // 중복된 메뉴일 경우 개수 추가
                            modifyBasket(duplicateItem.basketIdx, quantity);
                        }
                        else {
                            // 아니면 그냥 메뉴 추가
                            addBasket(ssc)
                        }
                    }
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }

    const modifyBasket = (basketIdx = 0, count = 0) => {
        const apiUrl = baseUrl + "/jat/app/basket";

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'X-ACCESS-TOKEN': jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                basketIdx: basketIdx,
                inDecrease: 1,
                patchStatus: 'count'
            })
        };

        for (let i = 0; i < count; i++) {
            fetch(apiUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.code === 1000 && i === count - 1) {
                        // 가게 상세에서 온건지, 장바구니에서 온건지 확인
                        if (from === 'StoreDetailPage')
                            dispatch(basketAddAction({add: true}))
                        navigation.pop();
                    }
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                })
        }
    }


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
                        <MenuOrderButton onPress={() => getMenuInfo(1)}>
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
                            addBasket(1)
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