// react-native, expo
import React, {useEffect, useState} from "react";
// utils
import {convertToKoreanTimeFormat} from '../../utils/convertToKoreanTimeFormat';
import {getStoreDetailInfo} from '../../utils/getStoreDetailInfo';
// styles
import {
    InfoWrapper,
    InfoTitleText,
    InfoSection,
    InfoBox,
    InfoText1,
    InfoText2,
    InfoText3,
    Border,
    Border2,
} from './styles';


export default function InfoComponent({storeIdx}) {
    const [ infoState, setInfoState ] = useState({
        storeIdx: 0,
        detailStoreInfo: {
            storeName: '',
            storeOpen: '',
            storeClose: '',
            breakday: '',
        },
        detailStatisticsInfo: {
            orderCount: 0,
            reviewCount: 0
        },
        detailSellerInfo: {
            sellerName: '',
            storeName: '',
            storeAddress: '',
            businessRegiNum: '',
        },
        detailIngredientInfo: ''
    });

    useEffect(() => {
        fetchAndProcessStoreDetailInfo()
    }, [])

    async function fetchAndProcessStoreDetailInfo() {
        try {
            const storeDetailInfo = await getStoreDetailInfo(storeIdx)
            setInfoState(storeDetailInfo)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <>
            <InfoWrapper isFirst={true}>
                <InfoTitleText>
                    가게 정보
                </InfoTitleText>
                <InfoSection>
                    <InfoBox>
                        <InfoText1>
                            상호명
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStoreInfo.storeName}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            운영시간
                        </InfoText1>
                        <InfoText2>
                            {`${convertToKoreanTimeFormat(infoState.detailStoreInfo.storeOpen)} ~ ${convertToKoreanTimeFormat(infoState.detailStoreInfo.storeClose)}`}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            휴무일
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStoreInfo.breakday}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            전화번호
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStoreInfo.storePhone}
                        </InfoText2>
                    </InfoBox>
                </InfoSection>
            </InfoWrapper>
            <Border />
            <InfoWrapper>
                <InfoTitleText>
                    가게 통계
                </InfoTitleText>
                <InfoSection>
                    <InfoBox>
                        <InfoText1>
                            최근 주문수
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStatisticsInfo.orderCount}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            전체 리뷰수
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStatisticsInfo.reviewCount}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            구독
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailStatisticsInfo.subscribeCount}
                        </InfoText2>
                    </InfoBox>
                </InfoSection>
            </InfoWrapper>
            <Border />
            <InfoWrapper>
                <InfoTitleText>
                    사업자 정보
                </InfoTitleText>
                <InfoSection>
                    <InfoBox>
                        <InfoText1>
                            대표자명
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailSellerInfo.sellerName}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            상호명
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailSellerInfo.storeName}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            사업자주소
                        </InfoText1>
                        <InfoText2>
                            {`${infoState.detailSellerInfo.storeAddress}\n위 주소는 사업자등록증에 표기된 정보입니다`}
                        </InfoText2>
                    </InfoBox>
                    <InfoBox>
                        <InfoText1>
                            사업자등록 번호
                        </InfoText1>
                        <InfoText2>
                            {infoState.detailSellerInfo.businessRegiNum}
                        </InfoText2>
                    </InfoBox>
                </InfoSection>
            </InfoWrapper>
            <Border />
            <InfoWrapper>
                <InfoTitleText>
                    원산지 표기
                </InfoTitleText>
                <InfoText3>
                    {infoState.detailIngredientInfo}
                </InfoText3>
            </InfoWrapper>
            <Border2 />
        </>
    )
}