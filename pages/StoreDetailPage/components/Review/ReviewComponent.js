// react-native, expo
import React, {useEffect, useState} from "react";
import {Path, Svg, WithLocalSvg} from "react-native-svg";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native";
// redux
// utils
import {getReviewInfo} from "../../utils/getReviewInfo";
import {patchReportReview} from "../../utils/patchReportReview";
// styles
import * as Styles from './styles'
// images
import CheckSVG from "assets/images/check.svg";
import SortBySVG from "assets/images/sort_by.svg";
// components
import CustomModal from "components/Heo/modal/CustomModal";

export default function ReviewComponent({storeIdx}) {
    const [ reviewState, setReviewState ] = useState({
        storeIdx: 0,
        starAverage: 0,
        reviewsTotal: 0,
        commentTotal: 0,
        starCountRatios: [
            {
                starRatio: 0
            },
            {
                starRatio: 0
            },
            {
                starRatio: 0
            },
            {
                starRatio: 0
            },
            {
                starRatio: 0
            }
        ],
        reviewItems: []
    });
    const [ onlyImage, setOnlyImage ] = useState(false);
    const [visibleSortByModal, setVisibleSortByModal] = useState(false)
    const [sortBy, setSortBy] = useState(1)
    useEffect(() => {
        fetchAndProcessReviewInfo()
    }, [])

    async function fetchAndProcessReviewInfo() {
        try {
            const reviewInfo = await getReviewInfo(storeIdx)
            setReviewState(reviewInfo)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <>
            <Styles.StarRatingWrapper>
                <Styles.StarRatingSection>
                    <Styles.StarRatingText>
                        {reviewState.starAverage}
                    </Styles.StarRatingText>
                    <Styles.StarRatingBox>
                        <Styles.EmptyStar>
                            <Styles.EmptyStar percentage={reviewState.starAverage * 10}>
                                <StarImage />
                            </Styles.EmptyStar>
                        </Styles.EmptyStar>
                        <Styles.EmptyStar>
                            <Styles.EmptyStar percentage={reviewState.starAverage > 1 ? (reviewState.starAverage - 1) * 10 : 0}>
                                <StarImage />
                            </Styles.EmptyStar>
                        </Styles.EmptyStar>
                        <Styles.EmptyStar>
                            <Styles.EmptyStar percentage={reviewState.starAverage > 2 ? (reviewState.starAverage - 2) * 10 : 0}>
                                <StarImage />
                            </Styles.EmptyStar>
                        </Styles.EmptyStar>
                        <Styles.EmptyStar>
                            <Styles.EmptyStar percentage={reviewState.starAverage > 3 ? (reviewState.starAverage - 3) * 10 : 0}>
                                <StarImage />
                            </Styles.EmptyStar>
                        </Styles.EmptyStar>
                        <Styles.EmptyStar>
                            <Styles.EmptyStar percentage={reviewState.starAverage > 4 ? (reviewState.starAverage - 4) * 10 : 0}>
                                <StarImage />
                            </Styles.EmptyStar>
                        </Styles.EmptyStar>
                    </Styles.StarRatingBox>
                </Styles.StarRatingSection>
                <Styles.StarRatingDistributionSection>
                    <Styles.StarRatingDistributionBox1>
                        <Styles.StarRatingDistributionText>
                            5점
                        </Styles.StarRatingDistributionText>
                        <Styles.StarRatingDistributionText>
                            4점
                        </Styles.StarRatingDistributionText>
                        <Styles.StarRatingDistributionText>
                            3점
                        </Styles.StarRatingDistributionText>
                        <Styles.StarRatingDistributionText>
                            2점
                        </Styles.StarRatingDistributionText>
                        <Styles.StarRatingDistributionText>
                            1점
                        </Styles.StarRatingDistributionText>
                    </Styles.StarRatingDistributionBox1>
                    <Styles.StarRatingDistributionBox2>
                        <Styles.StarRatingDistributionBar>
                            <Styles.StarRatingDistributionBarFill percentage={reviewState.starCountRatios[0].starRatio} />
                        </Styles.StarRatingDistributionBar>
                        <Styles.StarRatingDistributionBar>
                            <Styles.StarRatingDistributionBarFill percentage={reviewState.starCountRatios[1].starRatio} />
                        </Styles.StarRatingDistributionBar>
                        <Styles.StarRatingDistributionBar>
                            <Styles.StarRatingDistributionBarFill percentage={reviewState.starCountRatios[2].starRatio} />
                        </Styles.StarRatingDistributionBar>
                        <Styles.StarRatingDistributionBar>
                            <Styles.StarRatingDistributionBarFill percentage={reviewState.starCountRatios[3].starRatio} />
                        </Styles.StarRatingDistributionBar>
                        <Styles.StarRatingDistributionBar>
                            <Styles.StarRatingDistributionBarFill percentage={reviewState.starCountRatios[4].starRatio} />
                        </Styles.StarRatingDistributionBar>
                    </Styles.StarRatingDistributionBox2>
                    <Styles.StarRatingDistributionBox3>
                        <Styles.StarRatingDistributionBox1 style={{width: 100}}>
                            <Styles.StarRatingDistributionText>
                                {reviewState.starCountRatios[0].starRatio}%
                            </Styles.StarRatingDistributionText>
                            <Styles.StarRatingDistributionText>
                                {reviewState.starCountRatios[1].starRatio}%
                            </Styles.StarRatingDistributionText>
                            <Styles.StarRatingDistributionText>
                                {reviewState.starCountRatios[2].starRatio}%
                            </Styles.StarRatingDistributionText>
                            <Styles.StarRatingDistributionText>
                                {reviewState.starCountRatios[3].starRatio}%
                            </Styles.StarRatingDistributionText>
                            <Styles.StarRatingDistributionText>
                                {reviewState.starCountRatios[4].starRatio}%
                            </Styles.StarRatingDistributionText>
                        </Styles.StarRatingDistributionBox1>
                    </Styles.StarRatingDistributionBox3>
                </Styles.StarRatingDistributionSection>
            </Styles.StarRatingWrapper>
            <Styles.ReviewInfoWrapper>
                <Styles.ReviewInfoSection>
                    <Styles.ReviewInfoRecentCountText>
                        {`전체 리뷰 ${reviewState.reviewsTotal}개`}
                    </Styles.ReviewInfoRecentCountText>
                    <Styles.ReviewInfoReplyCountText>
                        {`사장님 댓글 ${reviewState.commentTotal}개`}
                    </Styles.ReviewInfoReplyCountText>
                </Styles.ReviewInfoSection>
                <Styles.ReviewInfoSection2>
                    <Styles.ReviewInfoTouch onPress={() => setOnlyImage(!onlyImage)}>
                        <Styles.ReviewInfoOnlyImageCheckBox selected={onlyImage}>
                            {onlyImage ?
                                <WithLocalSvg
                                    width={19}
                                    height={19}
                                    asset={CheckSVG}/> : null}
                        </Styles.ReviewInfoOnlyImageCheckBox>
                        <Styles.ReviewInfoText>
                            사진리뷰만 보기
                        </Styles.ReviewInfoText>
                    </Styles.ReviewInfoTouch>
                    <Styles.ReviewInfoTouch onPress={() => setVisibleSortByModal(true)}>
                        <Styles.ReviewInfoText>
                            {['최신순', '별점 높은 순', '별점 낮은 순'][sortBy-1]}
                        </Styles.ReviewInfoText>
                        <WithLocalSvg
                            width={13.17}
                            height={7.19}
                            asset={SortBySVG} />
                    </Styles.ReviewInfoTouch>
                </Styles.ReviewInfoSection2>
            </Styles.ReviewInfoWrapper>

            <ReviewComponent2
                reviewItems={reviewState.reviewItems}
                sortBy={sortBy}
                onlyImage={onlyImage}/>

            <SortByModal
                visibleModal={visibleSortByModal}
                setVisibleModal={setVisibleSortByModal}
                sortBy={sortBy}
                setSortBy={setSortBy}/>
        </>
    )
}

const ReviewComponent2 = ({reviewItems, sortBy, onlyImage}) => {
    const [visibleReportModal, setVisibleReportModal] = useState(false)
    const [reportReviewIdx, setReportReviewIdx] = useState(0)
    const review = [...reviewItems];

    if (sortBy === 1)
        review.sort((review1, review2) => review2.reviewIdx - review1.reviewIdx)
    else if (sortBy === 2)
        review.sort((review1, review2) => review2.star - review1.star)
    else if (sortBy === 3)
        review.sort((review1, review2) => review1.star - review2.star)

    return (
        <>
            {
                review.map((item) => {
                    return !onlyImage || item.review_url ? (
                        <ReviewWrapperMemoComponent
                            key={item.reviewIdx}
                            item={item}
                            setVisibleModal={setVisibleReportModal}
                            setReportReviewIdx={setReportReviewIdx}/>
                    ) : null;
                })
            }
            <ReportModal
                visibleModal={visibleReportModal}
                setVisibleModal={setVisibleReportModal}
                reviewIdx={reportReviewIdx}/>
        </>

    )
}

const ReviewWrapperMemoComponent = React.memo(({item, setVisibleModal, setReportReviewIdx}) => (
    <Styles.ReviewWrapper>
        <Styles.ReviewSection>
            <Styles.ReviewBox>
                <Styles.UserSection>
                    <Styles.UserImage
                        resizeMode="cover"
                        source={{uri: item.customerProfileUrl ?? 'https://s3-alpha-sig.figma.com/img/0b1c/cdaa/a30575a764567a374d6535d068a76cd5?Expires=1691366400&Signature=RU25a1vejlMhrknJLUTmimzavWhsKzj8-jQteqYwsHlLQjSxNEyV9l3l6jZJUirWJV1Mtqq2FTRmdcpmH3grOGOwdR2rS~UQ9BmKRlkckmXbDNa7RlBqrnaLZSJdYYP7LPzZqQHFy9cgDFGQW1sqdFY4kAMfLVMuNClkO968Pr64aiP3G2nci4NHqxByHm8zxmblhVqfZnzXePzKF9TXPjKMihu3wGDCIKYmAtlPwiT60M5Ub1NGXpXT5MYGqI9F7kAwsNJMYg60wsccwnCyn7CoZ3PhJMCDDX11YVAZpBTXTW3KgJKbudfAAv~h1p9jMuq5oDCzwSq9pkqTjrt9oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}/>
                    <Styles.UserBox>
                        <Styles.UserNameText numberOfLines={1} ellipsizeMode='tail'>
                            {item.customerName}
                        </Styles.UserNameText>
                        <Styles.UserStarRatingSection>
                            <Styles.StarRatingBox>
                                <Styles.EmptyStar>
                                    <Styles.EmptyStar percentage={item.star * 10}>
                                        <StarImage />
                                    </Styles.EmptyStar>
                                </Styles.EmptyStar>
                                <Styles.EmptyStar>
                                    <Styles.EmptyStar percentage={item.star > 1 ? (item.star - 1) * 10 : 0}>
                                        <StarImage />
                                    </Styles.EmptyStar>
                                </Styles.EmptyStar>
                                <Styles.EmptyStar>
                                    <Styles.EmptyStar percentage={item.star > 2 ? (item.star - 2) * 10 : 0}>
                                        <StarImage />
                                    </Styles.EmptyStar>
                                </Styles.EmptyStar>
                                <Styles.EmptyStar>
                                    <Styles.EmptyStar percentage={item.star > 3 ? (item.star - 3) * 10 : 0}>
                                        <StarImage />
                                    </Styles.EmptyStar>
                                </Styles.EmptyStar>
                                <Styles.EmptyStar>
                                    <Styles.EmptyStar percentage={item.star > 4 ? (item.star - 4) * 10 : 0}>
                                        <StarImage />
                                    </Styles.EmptyStar>
                                </Styles.EmptyStar>
                            </Styles.StarRatingBox>
                            <Styles.UserReviewDate>
                                {item.date}
                            </Styles.UserReviewDate>
                        </Styles.UserStarRatingSection>
                    </Styles.UserBox>
                </Styles.UserSection>
                {item.review_url &&
                    <Styles.UserReviewImage
                        key={item.reviewIdx}
                        resizeMode="cover"
                        source={{uri: item.review_url}} />
                }
                <Styles.UserReviewText>
                    {item.contents}
                </Styles.UserReviewText>
            </Styles.ReviewBox>
            <Styles.ReviewReportTouch onPress={() => {
                setReportReviewIdx(item.reviewIdx)
                setVisibleModal(true)
            }}>
                <Styles.ReviewReportText>
                    신고하기
                </Styles.ReviewReportText>
            </Styles.ReviewReportTouch>
            <Styles.ReviewMenuSection>
                {item.orderTodayMenu.map((item2, index) => (
                    <Styles.ReviewMenuBox key={index}>
                        <Styles.ReviewMenuText>
                            {item2}
                        </Styles.ReviewMenuText>
                    </Styles.ReviewMenuBox>
                ))}
            </Styles.ReviewMenuSection>
        </Styles.ReviewSection>
        {item.comment !== "" &&
            <Styles.ReplySection>
                <Styles.UserSection>
                    <Styles.UserImage
                        resizeMode="cover"
                        source={{uri: 'https://s3-alpha-sig.figma.com/img/0b1c/cdaa/a30575a764567a374d6535d068a76cd5?Expires=1691366400&Signature=RU25a1vejlMhrknJLUTmimzavWhsKzj8-jQteqYwsHlLQjSxNEyV9l3l6jZJUirWJV1Mtqq2FTRmdcpmH3grOGOwdR2rS~UQ9BmKRlkckmXbDNa7RlBqrnaLZSJdYYP7LPzZqQHFy9cgDFGQW1sqdFY4kAMfLVMuNClkO968Pr64aiP3G2nci4NHqxByHm8zxmblhVqfZnzXePzKF9TXPjKMihu3wGDCIKYmAtlPwiT60M5Ub1NGXpXT5MYGqI9F7kAwsNJMYg60wsccwnCyn7CoZ3PhJMCDDX11YVAZpBTXTW3KgJKbudfAAv~h1p9jMuq5oDCzwSq9pkqTjrt9oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}/>
                    <Styles.UserBox>
                        <Styles.UserNameText>
                            사장님
                        </Styles.UserNameText>
                    </Styles.UserBox>
                </Styles.UserSection>
                <Styles.UserReviewText>
                    {item.comment}
                </Styles.UserReviewText>
            </Styles.ReplySection>
        }
    </Styles.ReviewWrapper>
))

const SortByModal = ({visibleModal, setVisibleModal, sortBy, setSortBy}) => {
    const [sortByTouch, setSortByTouch] = useState(0)

    return (
        <CustomModal
            isVisible={visibleModal}
            onBackdropPress={() => setVisibleModal(false)}>
            <Styles.ModalTitleSection>
                <Styles.ModalTitleText2>
                    취소
                </Styles.ModalTitleText2>
                <Styles.ModalTitleText1>
                    정렬순
                </Styles.ModalTitleText1>
                <TouchableOpacity onPress={() => setVisibleModal(false)}>
                    <Styles.ModalTitleText2 visible={true}>
                        취소
                    </Styles.ModalTitleText2>
                </TouchableOpacity>
            </Styles.ModalTitleSection>
            <Styles.ModalSection>
                <TouchableWithoutFeedback
                    onPressIn={() => setSortByTouch(1)}
                    onPressOut={() => setSortByTouch(0)}
                    onPress={() => {
                        setSortBy(1)
                        setVisibleModal(false)
                    }}>
                    <Styles.ModalBox>
                        <Styles.ModalText selected={sortBy === 1 || sortByTouch === 1}>
                            최신순
                        </Styles.ModalText>
                        {sortBy === 1 && <CheckComponent/>}
                    </Styles.ModalBox>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPressIn={() => setSortByTouch(2)}
                    onPressOut={() => setSortByTouch(0)}
                    onPress={() => {
                        setSortBy(2)
                        setVisibleModal(false)
                    }}>
                    <Styles.ModalBox>
                        <Styles.ModalText selected={sortBy === 2 || sortByTouch === 2}>
                            별점 높은 순
                        </Styles.ModalText>
                        {sortBy === 2 && <CheckComponent/>}
                    </Styles.ModalBox>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPressIn={() => setSortByTouch(3)}
                    onPressOut={() => setSortByTouch(0)}
                    onPress={() => {
                        setSortBy(3)
                        setVisibleModal(false)
                    }}>
                    <Styles.ModalBox>
                        <Styles.ModalText selected={sortBy === 3 || sortByTouch === 3}>
                            별점 낮은 순
                        </Styles.ModalText>
                        {sortBy === 3 && <CheckComponent/>}
                    </Styles.ModalBox>
                </TouchableWithoutFeedback>
            </Styles.ModalSection>
        </CustomModal>
    )
}

const ReportModal = ({visibleModal, setVisibleModal, reviewIdx}) => {


    return (
        <CustomModal isVisible={visibleModal} onBackdropPress={() => setVisibleModal(false)}>
            <Styles.Modal2Wrapper>
                <Styles.Modal2Text>
                    신고하시겠습니까?
                </Styles.Modal2Text>
                <Styles.Modal2CheckSection>
                    <TouchableOpacity onPress={() => {
                        setVisibleModal(false)
                    }}>
                        <Styles.Modal2CheckBox  color="#F8F8F8">
                            <Styles.Modal2CheckText>
                                아니오
                            </Styles.Modal2CheckText>
                        </Styles.Modal2CheckBox>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        patchReportReview(reviewIdx)
                        setVisibleModal(false)
                    }}>
                        <Styles.Modal2CheckBox>
                            <Styles.Modal2CheckText>
                                네
                            </Styles.Modal2CheckText>
                        </Styles.Modal2CheckBox>
                    </TouchableOpacity>
                </Styles.Modal2CheckSection>
            </Styles.Modal2Wrapper>
        </CustomModal>
    )
}

const StarImage = () => (
    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <Path
            d="M12.7871 5.61458C12.7362 5.45543 12.6414 5.31386 12.5137 5.20614C12.3859 5.09841 12.2304 5.0289 12.0649 5.00558L9.11851 4.57741L7.80076 1.9075C7.72691 1.75764 7.61259 1.63145 7.47074 1.54321C7.32888 1.45497 7.16515 1.4082 6.99809 1.4082C6.83103 1.4082 6.66731 1.45497 6.52545 1.54321C6.38359 1.63145 6.26927 1.75764 6.19543 1.9075L4.87768 4.57741L1.93126 5.00558C1.76581 5.02952 1.61037 5.09929 1.48253 5.20701C1.35469 5.31472 1.25955 5.45607 1.20789 5.61506C1.15623 5.77404 1.15011 5.94432 1.19022 6.10661C1.23033 6.26889 1.31507 6.41671 1.43484 6.53333L3.56751 8.61174L3.06409 11.5465C3.03553 11.7111 3.05369 11.8805 3.11653 12.0353C3.17937 12.1902 3.28437 12.3243 3.41959 12.4225C3.55482 12.5206 3.71486 12.5789 3.88155 12.5907C4.04824 12.6025 4.21489 12.5673 4.36259 12.4892L6.99809 11.1026L9.63359 12.488C9.78138 12.5657 9.94797 12.6006 10.1145 12.5885C10.2811 12.5765 10.4409 12.5181 10.576 12.42C10.7112 12.3219 10.8161 12.1879 10.879 12.0332C10.9419 11.8785 10.9603 11.7093 10.9321 11.5447L10.4287 8.61058L12.5613 6.53333C12.6817 6.41701 12.7667 6.26905 12.8067 6.1065C12.8466 5.94396 12.8398 5.77343 12.7871 5.61458Z"
            fill="#F6C844"/>
    </Svg>
)

const CheckComponent = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M5 11.917L9.724 16.5L19 7.5"
            stroke="#604EF8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"/>
    </Svg>
)
