import styled from "styled-components/native";

export const StarRatingWrapper = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-top: 35px;
`

export const StarRatingSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const StarRatingText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 109.375% */
`

export const StarRatingBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const EmptyStar = styled.View`
  width: ${({percentage}) => typeof percentage === 'number' ? 14/10*percentage : 14}px;
  height: 14px;
  overflow: hidden;
`

export const StarRatingDistributionSection = styled.View`
  display: flex;
  flex-direction: row;
  gap: 9px;
  align-items: center;
`

export const StarRatingDistributionBox1 = styled.View`
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`

export const StarRatingDistributionText = styled.Text`
  color: #000;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px; /* 19.2px */
  letter-spacing: 0.5px;
`

export const StarRatingDistributionBox2 = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const StarRatingDistributionBar = styled.View`
  width: 184px;
  height: 12px;
  border-radius: 5px;
  background: #F8F8F8;
  overflow: hidden;
`

export const StarRatingDistributionBarFill = styled.View`
  width: ${({percentage}) => 184/100*percentage}px;
  height: 12px;
  background: #F6C844;
  border-radius: 5px 0px 5px 5px;
`

export const StarRatingDistributionBox3 = styled.View`
  display: flex;
  width: 14px;
`

export const ReviewInfoWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;
`

export const ReviewInfoSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 360px;
  padding: 15px 0;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
`

export const ReviewInfoRecentCountText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-SemiBold";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 32px */
  letter-spacing: 0.5px;
`

export const ReviewInfoReplyCountText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25.6px; /* 25.6px */
  letter-spacing: 0.5px;
`

export const ReviewInfoSection2 = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

export const ReviewInfoTouch = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-right: 5px;
`

export const ReviewInfoOnlyImageCheckBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  height: 21px;
  border-radius: 5px;
  ${({selected}) => selected ? null : 'border: 1px solid #777;'}
  ${({selected}) => selected ? 'background: #8377E9;' : null}
`

export const ReviewInfoText = styled.Text`
  color: #2F2F38;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22.4px; /* 22.4px */
  letter-spacing: 0.5px;
`


export const ReviewWrapper = styled.View`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #AAA;
`

export const ReviewSection = styled.View`
  position: relative;
  display: flex;
  width: 360px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`

export const ReviewReportTouch = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
`

export const ReviewReportText = styled.Text`
  color: #AAA;
  text-align: right;
  font-family: "Pretendard-Medium";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 291.667% */
`

export const ReviewBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

export const UserSection = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
`

export const UserBox = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: -10px;
`

export const UserNameText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 233.333% */
`

export const UserStarRatingSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
`

export const UserReviewDate = styled.Text`
  color: rgba(0, 0, 0, 0.50);
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 291.667% */
`

export const UserReviewText = styled.Text`
  color: #000;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 233.333% */
`

export const UserReviewImage = styled.Image`
  margin: 10px 0 10px;
  width: 360px;
  height: 360px;
  border-radius: 30px;
`

export const UserImage = styled.Image`
  width: 43px;
  height: 43px;
  border-radius: 43px;
`

export const ReviewMenuSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  max-width: 360px;
  overflow: hidden;
  flex-wrap: wrap;
`

export const ReviewMenuBox = styled.View`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: #F5F3FF;
`

export const ReviewMenuText = styled.Text`
  color: #000;
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
`

export const ReplySection = styled.View`
  display: flex;
  width: 360px;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  border-radius: 30px;
  background: #F8F8F8;
`

export const ModalTitleSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 343px;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
`

export const ModalTitleText1 = styled.Text`
  color: #000;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`

export const ModalTitleText2 = styled.Text`
  color: ${({visible}) => visible ? '#555' : 'white'};
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`

export const ModalSection = styled.View`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  padding: 20px 0 109px;
`

export const ModalBox = styled.View`
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const ModalText = styled.Text`
  color: ${({selected}) => selected ? '#604EF8' : '#000'};
  font-family: ${({selected}) => selected ? "Pretendard-Medium" : "Pretendard-Regular"};
  font-size: 16px;
  font-style: normal;
  font-weight: ${({selected}) => selected ? 500 : 400};
  line-height: 20px; /* 125% */
`

export const Modal2Wrapper = styled.View`
  width: 100%;
  height: 313px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 116px;
  gap: 48px;
`

export const Modal2Text = styled.Text`
  color: #2F2F38;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 111.111% */
`

export const Modal2CheckSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 290px;
  justify-content: space-between;
`

export const Modal2CheckBox = styled.View`
  display: flex;
  width: 93px;
  height: 33px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${({color}) => color ? color : '#F5F3FF'};
`

export const Modal2CheckText = styled.Text`
  color: #000;
  font-family: "Pretendard-Medium";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
`