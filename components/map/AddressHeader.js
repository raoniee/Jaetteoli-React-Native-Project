import styled from 'styled-components/native';
import {View, Text, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import WhiteLeftSVG from '../../assets/images/white_left.svg';
import WhiteBellSVG from '../../assets/images/white_bell.svg';
import WhiteCartSVG from '../../assets/images/white_cart.svg';
import DefaultLeftSVG from '../../assets/images/default_left.svg';
import DefaultBellSVG from '../../assets/images/default_bell.svg';
import DefaultCartSVG from '../../assets/images/default_cart.svg';
import XSVG from '../../assets/images/x.svg';
import { useNavigation } from '@react-navigation/native';
import ShopBasketPage from "../../pages/BasketPage/BasketPage";

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

export default function AddressHeader({ backgroundColor, title, onLeftPress}) {

    return (
        <View style={{ position: 'relative', backgroundColor: backgroundColor ? backgroundColor : null}}>
            <HeaderWrapper>
                <DefaultLeft onLeftPress={onLeftPress} />
            </HeaderWrapper>
            <HeaderTitleWrapper>
                <HeaderTitle>{title}</HeaderTitle>
            </HeaderTitleWrapper>
        </View>
    );
}


const DefaultLeft = ({onLeftPress}) => {
    return (
    <TouchableOpacity onPress={onLeftPress}>
        <WithLocalSvg
            width={25}
            height={24}
            asset={DefaultLeftSVG} />
    </TouchableOpacity>
    )
}



const EmptyView = styled.View`
  width: 24px;
  height: 24px;
`
