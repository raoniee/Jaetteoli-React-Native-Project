// react-native, expo
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {WithLocalSvg} from "react-native-svg";
// utils
import {getMenuInfo} from '../../utils/getMenuInfo'
// styles
import {
    StoreTextBox,
    StoreText,
    MenuTitleSection,
    MenuTitleBox,
    MenuTitleText,
    MenuWrapper,
    MenuSection,
    MenuInfoWrapper,
    MenuInfoSection,
    MenuInfoBox,
    MenuInfoText1,
    MenuInfoText2,
    MenuQuantityBox,
    MenuQuantityText,
    MenuInfoImg,
    MenuPriceSection,
    OriginalPriceSection,
    OriginalPriceText,
    DiscountPercentageText,
    DiscountPriceText,
} from './styles';
// images
import DownSVG from "assets/images/down.svg";
import WarningSVG from "assets/images/warning.svg";
import ArrowRightSVG from "assets/images/arrow_right.svg";

export default function MenuComponent({storeIdx}) {
    const [ menuState, setMenuState ] = useState({
        storeIdx: null,
        mainMenuList: [],
        sideMenuList: []
    });
    const [ isExpanded, setIsExpanded ] = useState(false);

    useEffect(() => {
        fetchAndProcessMenuInfo()
    }, [])

    async function fetchAndProcessMenuInfo() {
        try {
            const menuInfo = await getMenuInfo(storeIdx)
            setMenuState(menuInfo)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <>
            <StoreTextBox>
                <StoreText numberOfLines={isExpanded ? undefined : 5}>
                    매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류도 업그레이드 되었어요.가격이상의 퀄리티와 맛으로 보답하겠습니다.
                    매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류 매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류도 업그레이드 되었어요.가격이상의 퀄리티와 맛으로 보답하겠습니다.
                    매장 확장이전과 메뉴 개편으로 새롭게 출발합니다.
                    칼국수 재료와 조개류
                </StoreText>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <WithLocalSvg
                        style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg'}] }}
                        width={24}
                        height={22.75}
                        asset={DownSVG} />
                </TouchableOpacity>
            </StoreTextBox>
            <MenuComponent2 menuList={menuState.mainMenuList} storeIdx={storeIdx} main={true}/>
            <MenuComponent2 menuList={menuState.sideMenuList} storeIdx={storeIdx} main={false}/>
        </>
    )
}

function MenuComponent2 ({menuList, storeIdx, main = false}) {
    const [ isExpanded, setIsExpanded ] = useState(true);
    const navigation = useNavigation();

    return(
        <>
            <MenuTitleSection main={main}>
                <MenuTitleBox>
                    <MenuTitleText>
                        {main ? '메인메뉴' : '사이드 메뉴'}
                    </MenuTitleText>
                    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                        <WithLocalSvg
                            style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg'}] }}
                            width={24}
                            height={22.75}
                            asset={DownSVG} />
                    </TouchableOpacity>
                </MenuTitleBox>
            </MenuTitleSection>
            {isExpanded &&
                menuList.map((item, _) => (
                    <TouchableWithoutFeedback
                        key={item.todaymenuIdx}
                        onPress={() => navigation.navigate('MenuDetailPage', {
                            storeIdx: storeIdx,
                            menuIdx: item.todaymenuIdx,
                            from: 'StoreDetailPage'
                        })}>
                        <MenuWrapper>
                            <MenuSection>
                                <MenuInfoWrapper>
                                    <MenuInfoSection>
                                        <MenuInfoBox>
                                            <MenuInfoText1>
                                                {item.menuName}
                                            </MenuInfoText1>
                                            <MenuInfoText2>
                                                {item.composition}
                                            </MenuInfoText2>
                                        </MenuInfoBox>
                                        <MenuQuantityBox>
                                            <WithLocalSvg
                                                width={13.5}
                                                height={13.5}
                                                asset={WarningSVG}/>
                                            <MenuQuantityText>
                                                재고 {item.remain}개
                                            </MenuQuantityText>
                                        </MenuQuantityBox>
                                    </MenuInfoSection>
                                    <MenuInfoImg
                                        resizeMode="cover"
                                        source={{uri: item.menuUrl}}/>
                                </MenuInfoWrapper>
                                <MenuPriceSection>
                                    <OriginalPriceSection>
                                        <OriginalPriceText>
                                            {item.originPrice.toLocaleString()}원
                                        </OriginalPriceText>
                                        <DiscountPercentageText>
                                            {item.discount} %
                                        </DiscountPercentageText>
                                    </OriginalPriceSection>
                                    <WithLocalSvg
                                        width={24}
                                        height={22.75}
                                        asset={ArrowRightSVG}/>
                                    <DiscountPriceText>
                                        {item.todayPrice.toLocaleString()}원
                                    </DiscountPriceText>
                                </MenuPriceSection>
                            </MenuSection>
                        </MenuWrapper>
                    </TouchableWithoutFeedback>
                ))
            }
        </>
    )
}