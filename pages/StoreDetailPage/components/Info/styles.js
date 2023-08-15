import styled from "styled-components/native";

export const InfoWrapper = styled.View`
    width: 360px;
  display: flex;
  flex-direction: column;
  padding: ${({isFirst}) => isFirst ? '20px' : '33px'} 0;
  align-items: flex-start;
  gap: 20px;
`

export const InfoTitleText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 218.75% */
`

export const InfoSection = styled.View`
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
`

export const InfoBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

export const InfoText1 = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
`

export const InfoText2 = styled.Text`
width: 234px;
  color: #555;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`

export const InfoText3 = styled.Text`
width: 100%;
  color: #555;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`

export const Border = styled.View`
  width: 100%;
  height: 20px;
  background: #F7F5FD;
`
export const Border2 = styled.View`
  border-bottom-color: #AAA;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  width: 100%;
  height: 0;
`