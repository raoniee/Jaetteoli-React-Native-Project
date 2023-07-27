import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useState } from 'react';
import reveiwImg from '../../assets/images/reviewImg.png'
import Color from '../../assets/colors/Color';
import ArrowRight from '../../assets/images/ArrowRight';
import Star from '../../assets/images/Star';
import profile from '../../assets/images/profile.png';
import Header from '../../components/common/Header';

const ManageReview = () => {

    // 사용자 리뷰 데이터
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

    const getDateDifference = (dateString) => {
        const currentDate = new Date();
        const targetDate = new Date(dateString);

        const yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
        const monthDiff = currentDate.getMonth() - targetDate.getMonth();
        const dayDiff = currentDate.getDate() - targetDate.getDate();

        if (yearDiff > 0) {
            return `${yearDiff}년 전`;
        } else if (monthDiff > 0) {
            return `${monthDiff}개월 전`;
        } else if (dayDiff > 0) {
            return `${dayDiff}일 전`;
        } else if (dayDiff === 0) {
            return '오늘';
        } else {
            return;
        }
    };

    const renderItem = ({ item }) => {
        return(
        <View style={styles.itemContainer}>
            <View style={styles.reviewWrapper}>
                <View style={styles.store}>
                    <Text style={styles.storeText}>{item.storeName}</Text>
                    <ArrowRight stroke={Color.black}></ArrowRight>
                </View>
                <View>
                    <View style={styles.star}>
                        <View style={{ width: 5 * 15, flexDirection: 'row', overflow: 'hidden', position: 'absolute' }}>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                        </View>
                        <View style={{ width: item.star * 15, flexDirection: 'row', overflow: 'hidden' }}>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                        </View>
                        <Text style={styles.date}>{getDateDifference(item.date)}</Text>
                    </View>
                </View>
                {item.reviewImg && <Image source={item.reviewImg} style={styles.reviewImg}></Image>}
                <Text style={styles.contents}>{item.contents}</Text>
            </View>
            <Text style={styles.delete}>삭제하기</Text>
            <View style={styles.menuWrapper}>
                {item.orderMenu.map((menu, index) => (
                    <View style={styles.menu} key={index}><Text style={styles.menuText}>{menu.menuName}</Text></View>
                ))}
            </View>
            {item.comment && <View style={styles.comment}>
                <View style={styles.profile}>
                    <Image source={profile} style={styles.profileImg}></Image>
                    <Text style={styles.profileText}>사장님</Text>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
            </View>
            }
        </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title='리뷰관리' />
            <FlatList 
                data={reviews} 
                renderItem={renderItem} 
                keyExtractor={item => item.reviewIdx}
                ListHeaderComponent={
                    <View style={styles.reviewCount}>
                      <Text style={styles.reviewCountText}>내가 쓴 리뷰 총 {reviews.length}개</Text>
                    </View>
                  }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Color.white,
    },
    reviewCount: {
        marginTop: 10,
        width: '100%',
        height: 75,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    reviewCountText: {
        fontSize: 18,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 35,
    },
    devider: {
        width: '100%',
        height: 1,
        backgroundColor: Color.lightGray
    },
    itemContainer: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center'
    },
    store: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeText: {
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
        lineHeight: 35,
    },
    star: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35
    },
    date: {
        position: 'absolute', left: 5 * 15 + 11,
        color: Color.lightGray,
        fontSize: 12,
        fontFamily: 'Pretendard-Regular',
        lineHeight: 35
    },
    contents: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
        lineHeight: 35,
        marginBottom: 10,
    },
    delete: {
        position: 'absolute',
        top: 20,
        right: 16,
        color: Color.lightGray,
        fontSize: 12,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 35
    },
    reviewImg: {
        width: 360,
        height: 360,
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 10,
    },
    menuWrapper: {
        flexDirection: 'row'
    },
    menu: {
        backgroundColor: Color.lightPurple,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 18,
        marginRight: 5,
    },
    menuText: {
        fontSize: 12,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 20,
    },
    comment: {
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: Color.brightGray,
        borderRadius: 18,
        marginTop: 20,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImg: {
        width: 43,
        height: 43,
    },
    profileText: {
        fontSize: 15,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 35,
        marginLeft: 15,
    },
    commentText: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
        lineHeight: 35
    }
})

export default ManageReview;