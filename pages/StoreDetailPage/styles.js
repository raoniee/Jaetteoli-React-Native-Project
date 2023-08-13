import styled from "styled-components/native";

export const Container = styled.FlatList`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const StoreDetailWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const StoreInformationSection = styled.View`
width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 41px 10px 0;
`

export const StoreNameSection = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
`

export const StoreNameText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
`

export const StoreRatingSection = styled.View`
display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
`

export const EmptyView = styled.View`
  width: ${({percentage}) => typeof percentage === 'number' ? 22/10*percentage : 22}px;
  height: 22px;
  overflow: hidden;
`

export const StoreRatingText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 194.444% */
`

export const StoreWantedBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;

  width: 109px;
  height: 41px;
  border-radius: 20px;
  background-color: white;
  
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  
  elevation: 6;
  
  margin-left: 12px;
  margin-top: 12.5px;
`

export const StoreWantedText = styled.Text`
  color: #777;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 233.333% */
`

export const StoreInformationSection2 = styled.View`
width: 360px;
  flex-direction: row;
  padding: 32px 0 5px;
  gap: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const StoreInformationTouch = styled.TouchableOpacity`
    display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const StoreInformationTouchSVGBox = styled.View`
  display: flex;
  width: 24px;
  height: 26px;
  justify-content: center;
  align-items: center;
`

export const StoreInformationTouchText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 250% */
`

export const StoreMap = styled.View`
  width: 360px;
  height: 134px;
  border-radius: 20px;
  border: 1px solid #AAA;
  margin-top: 20px;
`

export const StoreAddressWrapper = styled.View`
    width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 17px;
`

export const StoreAddressSection = styled.View`
    display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
`

export const StoreAddressTextBox = styled.View`
display: flex;
  flex-direction: column;
`

export const StoreAddressText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`

export const StoreAddressCopyText = styled.Text`
  color: #777;
  font-family: "Pretendard-Medium";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  text-decoration-line: underline;
`

export const NavigationBar = styled.View`
  width: 360px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MenuBox = styled.TouchableOpacity`
  display: flex;
  width: 107px;
  height: 25px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const MenuText = styled.Text`
  color: ${({selected}) => selected ? '#000' : '#777'};
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.6px;
`

export const Line = styled.View`
  width: 111px;
  height: 0;
  background: #604EF8;
  border: 1.5px solid #604EF8;
  border-radius: 1.5px;
`