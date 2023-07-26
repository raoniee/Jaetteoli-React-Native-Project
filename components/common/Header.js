import styled from 'styled-components/native';
import {View, Text, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import Constants from 'expo-constants';
import WhiteLeftSVG from '../../assets/images/white_left.svg';
import WhiteBellSVG from '../../assets/images/white_bell.svg';
import WhiteCartSVG from '../../assets/images/white_cart.svg';
import DefaultLeftSVG from '../../assets/images/default_left.svg';
import DefaultBellSVG from '../../assets/images/default_bell.svg';
import DefaultCartSVG from '../../assets/images/default_cart.svg';

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
  margin: 5px 0;
  align-items: center;
  justify-content: center;
`

const HeaderTitle = styled.Text`
  color: #000;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px;
`

export default function Header({ navigation, color, title, cart = 1, bell = 1}) {
    const LeftComponent = color === 'white' ? WhiteLeft : DefaultLeft;
    const BellComponent = bell === 1 ? color === 'white' ? WhiteBell : DefaultBell : EmptyView;
    const BasketComponent = cart === 1 ? color === 'white' ? WhiteCart : DefaultCart : EmptyView;

    return (
        <View style={{ position: 'relative', backgroundColor: 'white'}}>
            <HeaderWrapper>
                <TouchableOpacity>
                    <LeftComponent />
                </TouchableOpacity>
                <HeaderRightWrapper>
                    <TouchableOpacity>
                        <BellComponent />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <BasketComponent />
                    </TouchableOpacity>
                </HeaderRightWrapper>
            </HeaderWrapper>
            <HeaderTitleWrapper>
                <HeaderTitle>{title}</HeaderTitle>
            </HeaderTitleWrapper>
        </View>
    );
}


const DefaultLeft = () => (
    <WithLocalSvg
        width={25}
        height={24}
        asset={DefaultLeftSVG} />
)

const WhiteLeft = () => (
    <WithLocalSvg
        width={25}
        height={24}
        asset={WhiteLeftSVG} />
)

const DefaultBell = () => (
    <WithLocalSvg
        width={24}
        height={24}
        asset={DefaultBellSVG} />
)

const WhiteBell = () => (
    <WithLocalSvg
        width={24}
        height={24}
        asset={WhiteBellSVG} />
)

const DefaultCart = () => (
    <WithLocalSvg
        width={24}
        height={24}
        asset={DefaultCartSVG} />
)

const WhiteCart = () => (
    <WithLocalSvg
        width={24}
        height={24}
        asset={WhiteCartSVG} />
)

const EmptyView = styled.View`
  width: 24px;
  height: 24px;
`
