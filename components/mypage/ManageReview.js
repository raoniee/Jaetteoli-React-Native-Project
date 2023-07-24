import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import ReviewItem from './ReviewItem';
import reveiwImg from '../../assets/images/reviewImg.png'
import Color from '../../assets/colors/Color';

const ManageReview = () => {

    // 사용자 리뷰 데이터
    const [reviewCount, setReviewCount] = useState(3);
    const [reviews, setReviews] = useState([
        {
            reviewIdx: 0,
            storeName: 'BBQ 울산대학교점',
            star: 5,
            contents: '너무너무 맛있습니다!',
            date: '2023-7-12',
            comment: '',
            reviewImg: '',
            orderMenu: [
                {
                    menuName: '황금올리브',
                    menuCount: 1,
                },
            ]
        },
        {
            reviewIdx: 1,
            storeName: '김치찜은 못참지 울산무거짐',
            star: 4,
            contents: '너무너무 맛있습니다!',
            date: '2023-3-12',
            comment: '',
            reviewImg: '',
            orderMenu: [
                {
                    menuName: '김치찜',
                    menuCount: 1,
                },
            ]
        },
        {
            reviewIdx: 2,
            storeName: '울산미주구리',
            star: 5,
            contents: '너무너무 맛있습니다!',
            comment: '김땡땡님, 소중한 리뷰 써주셔서 감사합니다!',
            date: '2022-7-12',
            reviewImg: reveiwImg,
            orderMenu: [
                {
                    menuName: '미주구리회',
                    menuCount: 1,
                },
                {
                    menuName: '알탕',
                    menuCount: 1,
                },
            ]
        },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.reviewCount}>
                    <Text style={styles.reviewCountText}>내가 쓴 리뷰 총 {reviewCount}개</Text>
                </View>
                {reviews.map((review) => (
                    <View key={review.reviewIdx}>
                        <ReviewItem review={review} />
                        <View style={styles.devider}></View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    reviewCount: {
        marginTop: 98,
        width: '100%',
        height: 75,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    reviewCountText: {
        fontSize: 18,
        fontFamily:'Pretendard-Medium',
        lineHeight: 35,
    },
    devider: {
        width: '100%',
        height: 1,
        backgroundColor: Color.lightGray
    }
})

export default ManageReview;