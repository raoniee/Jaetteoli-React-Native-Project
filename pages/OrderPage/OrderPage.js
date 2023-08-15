// react-native, expo
import React, {useState} from "react";
import {SafeAreaView, TouchableOpacity} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {WithLocalSvg} from "react-native-svg";
import * as Clipboard from "expo-clipboard";
import {useRoute} from "@react-navigation/native";
// utils
import {postOrderPay} from "./utils/postOrderPay";
// styles
import styled from "styled-components/native";
// images
import LocationSVG from 'assets/images/location.svg';
import WalletSVG from 'assets/images/wallet.svg';
import ClockSVG from 'assets/images/clock.svg';
import PhoneSVG from 'assets/images/phone.svg';
import PencilSVG from 'assets/images/pencil.svg';
import CreditCardSVG from 'assets/images/credit-card.svg';
import RightSVG from 'assets/images/right.svg';
import CheckSVG from 'assets/images/check.svg';
import Ellipse1 from 'assets/images/Ellipse1.svg';
import Ellipse0 from 'assets/images/Ellipse0.svg';
// components
import Header from "components/common/Header";
import CustomModal from "components/Heo/modal/CustomModal";
import CustomModaless from "components/Heo/modal/CustomModaless";


export default function OrderPage({ navigation }) {
    const [ safeCheck, setSafeCheck ] = useState(false)
    const [ selectCredit, setSelectCredit ] = useState(0);
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ visibleModaless, setVisibleModaless ] = useState(false);
    const [ date, setDate ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ request, setRequest ] = useState("");
    const route = useRoute()
    const {storeIdx, storeName, storeAddress, storePhone, orderPrice, storeUrl} = route.params;

    const PhoneSafeCheckComponent = safeCheck ? PhoneSafeCheckBox : PhoneSafeUnCheckBox;
    const CreditSVG1 = selectCredit === 1 ? Ellipse1 : Ellipse0;
    const CreditSVG2 = selectCredit === 2 ? Ellipse1 : Ellipse0;
    const CreditSVG3 = selectCredit === 3 ? Ellipse1 : Ellipse0;

    function cancel() {
        setVisibleModal(false)
    }

    function save() {
        setVisibleModal(false)
        setDate(selectedDate);
    }

    function onChange(event, selectedDate) {
        // 기존 모달창에서 취소버튼을 눌렀을 경우
        // onChange가 호출이 됨
        // 이 때, 시간을 선택하지 않았을 때 selectedDate에는 undefined값이 들어가기에
        // 이걸 고려하여 유효한 값이 설정되게 하는 코드 1줄 추가한 것
        const currentDate = selectedDate || date;
        setSelectedDate(currentDate)
    }

    async function handleOrderPay() {
        const result = await postOrderPay(storeIdx, request, date);
        if (result.status === 1)
            navigation.navigate('OrderCompletePage')
        else if (result.status === 2)
            setVisibleModaless(true)
        // 3은 주문 실패
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <Header
                left={1}
                right={1}
                backgroundColor='white'
                title='주문하기'
                navigation={navigation}/>
            <Container showsVerticalScrollIndicator={false}>
                <OrderWrapper gap={10}>
                    <ShopWrapper>
                        <ShopImage resizeMode="contain" source={{uri: storeUrl}} />
                        <ShopText>
                            {storeName}
                        </ShopText>
                    </ShopWrapper>
                    <ShopAddressWrapper>
                        <WithLocalSvg asset={LocationSVG} />
                        <ShopAddressText>
                            {storeAddress}
                        </ShopAddressText>
                        <ShopAddressCopyTouch onPress={() => Clipboard.setStringAsync(storeAddress)}>
                            <ShopAddressCopyText>
                                복사
                            </ShopAddressCopyText>
                        </ShopAddressCopyTouch>
                    </ShopAddressWrapper>
                </OrderWrapper>
                <OrderWrapper gap={15}>
                    <CommonTextSection>
                        <WithLocalSvg
                            width={24}
                            height={24}
                            asset={ClockSVG} />
                        <CommonText>
                            픽업 예정 시간
                        </CommonText>
                    </CommonTextSection>
                    <TouchableOpacity onPress={() => setVisibleModal(true)}>
                        <PickupTimeSection>
                            <PickupTimeText>
                                {date.toLocaleTimeString(undefined, {hour12: true, hour: '2-digit', minute: '2-digit'})}
                            </PickupTimeText>
                                <WithLocalSvg
                                    width={24}
                                    height={22.75}
                                    asset={RightSVG} />
                        </PickupTimeSection>
                    </TouchableOpacity>
                </OrderWrapper>
                <OrderWrapper gap={15}>
                    <CommonTextSection>
                        <WithLocalSvg
                            width={24}
                            height={24}
                            asset={PhoneSVG} />
                        <CommonText>
                            010-1234-5678
                        </CommonText>
                        <PhoneChangeTouch>
                            <PhoneChangeText>
                                변경
                            </PhoneChangeText>
                        </PhoneChangeTouch>
                    </CommonTextSection>
                    <PhoneSafeCheckSection>
                        <PhoneSafeCheckTouch onPress={() => setSafeCheck(!safeCheck)}>
                            <PhoneSafeCheckComponent>
                                {safeCheck ?
                                    <WithLocalSvg
                                        width={19}
                                        height={19}
                                        asset={CheckSVG}/> : null}
                            </PhoneSafeCheckComponent>
                            <PhoneSafeText>
                                안심번호 사용
                            </PhoneSafeText>
                        </PhoneSafeCheckTouch>
                    </PhoneSafeCheckSection>

                </OrderWrapper>
                <OrderWrapper gap={15}>
                    <CommonTextSection>
                        <WithLocalSvg
                            width={18}
                            height={18}
                            asset={PencilSVG} />
                        <CommonText>
                            요청사항
                        </CommonText>
                    </CommonTextSection>
                    <RequestSection>
                        <RequestTextInput
                            placeholder="예) 일회용 수저 2개 챙겨주세요!"
                            value={request}
                            onChangeText={(event) => {
                                setRequest(event)
                        }}/>
                    </RequestSection>
                </OrderWrapper>
                <OrderWrapper gap={29}>
                    <CommonTextSection>
                        <WithLocalSvg
                            width={18}
                            height={17.68}
                            asset={WalletSVG} />
                        <CommonText>
                            결제사항
                        </CommonText>
                    </CommonTextSection>
                    <CreditWrapper>
                        <CreditSection>
                            <CreditTouch onPress={() => setSelectCredit(1)}>
                                <WithLocalSvg
                                    width={21}
                                    height={21}
                                    asset={CreditSVG1} />
                                <CreditText select={selectCredit===1}>
                                    떨이페이
                                </CreditText>
                            </CreditTouch>
                            <CreditCardSection>
                                <CreditCardBox>
                                    <CreditCardText>
                                        카드, 계좌 등록하기
                                    </CreditCardText>
                                </CreditCardBox>
                            </CreditCardSection>
                        </CreditSection>
                        <CreditTouch onPress={() => setSelectCredit(2)}>
                            <WithLocalSvg
                                width={21}
                                height={21}
                                asset={CreditSVG2} />
                            <CreditText select={selectCredit===2}>
                                만나서 카드 결제
                            </CreditText>
                        </CreditTouch>
                        <CreditTouch onPress={() => setSelectCredit(3)}>
                            <WithLocalSvg
                                width={21}
                                height={21}
                                asset={CreditSVG3} />
                            <CreditText select={selectCredit===3}>
                                만나서 현금 결제
                            </CreditText>
                        </CreditTouch>
                    </CreditWrapper>

                </OrderWrapper>
                <OrderWrapper gap={15}>
                    <CommonTextSection>
                        <WithLocalSvg
                            width={24}
                            height={24}
                            asset={CreditCardSVG} />
                        <CommonText>
                            결제금액
                        </CommonText>
                    </CommonTextSection>
                    <CreditTotalPriceSection>
                        <CreditTotalPriceText>
                            총 {orderPrice.toLocaleString()}원
                        </CreditTotalPriceText>
                    </CreditTotalPriceSection>
                </OrderWrapper>
                <PaymentWrapper>
                    <PaymentButton onPress={handleOrderPay}>
                        <PaymentText>
                            결제하기
                        </PaymentText>
                    </PaymentButton>
                </PaymentWrapper>
            </Container>

            <CustomModal
                isVisible={visibleModal}
                onBackdropPress={cancel}>
                <SetPickupTimeWrapper>
                    <SetPickupTimeSection1>
                        <TouchableOpacity onPress={cancel}>
                            <SetPickupTimeEditText>
                                취소
                            </SetPickupTimeEditText>
                        </TouchableOpacity>
                        <SetPickupTimeTitleText>
                            시간설정
                        </SetPickupTimeTitleText>
                        <TouchableOpacity
                            onPress={save}>
                            <SetPickupTimeEditText>
                                저장
                            </SetPickupTimeEditText>
                        </TouchableOpacity>
                    </SetPickupTimeSection1>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'time'}
                        is24Hour={false}
                        display="spinner"
                        onChange={onChange}/>
                </SetPickupTimeWrapper>
            </CustomModal>

            <CustomModaless
                isVisible={visibleModaless}
                setVisible={() => setVisibleModaless(false)}
                text='떨이 메뉴 재고가 부족합니다.'/>
        </SafeAreaView>
    )
}

const Container = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background: #FFF;
`

const OrderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.gap}px;
  border-bottom-width: 1px;
  border-bottom-color: #AAA;
  padding: 30px 0;
`

const ShopWrapper = styled.View`
  display: flex;
  width: 360px;
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

const ShopAddressWrapper = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ShopAddressText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
  padding: 0 15px 0 6px;
`

const ShopAddressCopyTouch = styled.TouchableOpacity`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: #F5F3FF;
`

const ShopAddressCopyText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
`

const CommonTextSection = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 360px;
  align-items: center;
  gap: 10px
`

const CommonText = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
`

const PickupTimeSection = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  width: 360px;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background: #F5F3FF;
`

const PickupTimeText = styled.Text`
  color: #2F2F38;
  padding: 0 10px;
  font-family: "Pretendard-Medium";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
`

const PhoneChangeTouch = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 2px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background: #F5F3FF;
`

const PhoneChangeText = styled.Text`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
`

const PhoneSafeCheckSection = styled.View`
  display: flex;
  width: 360px;
  align-items: flex-start;
`

const PhoneSafeCheckTouch = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const PhoneSafeCheckBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  height: 21px;
  border-radius: 5px;
  background: #8377E9;
`

const PhoneSafeUnCheckBox = styled.View`
  width: 21px;
  height: 21px;
  border-radius: 5px;
  border: 1px solid #777;
`

const PhoneSafeText = styled.Text`
  color: #777;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`

const RequestSection = styled.View`
  display: flex;
  width: 360px;
  padding: 13px 20px;
  align-items: flex-start;
  border-radius: 15px;
  background: #F5F3FF;
`

const RequestTextInput = styled.TextInput`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`

const CreditWrapper = styled.View`
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`

const CreditSection = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`

const CreditCardSection = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
`

const CreditCardBox = styled.TouchableOpacity`
  display: flex;
  width: 274px;
  height: 173px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px dashed #777;
  background: #F5F3FF;
`

const CreditCardText = styled.Text`
  color: #777;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`

const CreditTouch = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const CreditText = styled.Text`
  color: ${(props) => props.select ? 'black' : '#777'};
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
`


const CreditTotalPriceSection = styled.View`
  display: flex;
  width: 360px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const CreditTotalPriceText = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 194.444% */
`


const PaymentWrapper = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  padding: 60px 0 58px;
`

const PaymentButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #604EF8;
`

const PaymentText = styled.Text`
  color: #FFF;
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`

const SetPickupTimeWrapper = styled.View`
    width: 100%;
  height: 415px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SetPickupTimeSection1 = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px 25px;
  justify-content: space-between;
  align-items: center;
`

const SetPickupTimeTitleText = styled.Text`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
`

const SetPickupTimeEditText = styled.Text`
  color: #555;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`
