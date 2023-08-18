import styled from "styled-components/native";
import {windowWidth} from "../../../../utils/dimensions";

export const MenuTitleSection = styled.View`  
  width: 100%;
  margin-top: ${({main}) => main ? '30px': 0};
  padding: 7px 16px 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;

  background: #F7F5FD;
`

export const MenuTitleBox = styled.View`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MenuTitleText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 218.75% */
`

export const MenuWrapper = styled.View`
  width: 100%;
  padding: 20px 0 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;
`

export const MenuSection = styled.View`
  width: ${windowWidth-32}px;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`

export const MenuInfoWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MenuInfoSection = styled.View`
  width: 190px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const MenuInfoBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: -5px;
`

export const MenuInfoText1 = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 218.75% */
`

export const MenuInfoText2 = styled.Text`
  color: #777;
  font-family: "Pretendard-Regular";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 269.231% */
`

export const MenuQuantityBox = styled.View`
display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

export const MenuQuantityText = styled.Text`
  color: #F00;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 233.333% */
`

export const MenuInfoImg = styled.Image`
  width: 141px;
  height: 100px;
  border-radius: 5px;
`

// 메뉴 가격 파트는 메뉴 상세 페이지와 같은 컴포넌트
export const MenuPriceSection = styled.View`
  display: flex ;
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

export const OriginalPriceSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const OriginalPriceText = styled.Text`
  color: #555;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 250% */
  text-decoration-line: line-through;
`

export const DiscountPercentageText = styled.Text`
  color: #F00;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`

export const DiscountPriceText = styled.Text`
  color: #000;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`