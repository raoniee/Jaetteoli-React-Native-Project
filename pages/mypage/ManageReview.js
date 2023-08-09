import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import reveiwImg from '../../assets/images/reviewImg.png'
import Color from '../../assets/colors/Color';
import ArrowRight from '../../assets/images/ArrowRight';
import Star from '../../assets/images/Star';
import profile from '../../assets/images/profile.png';
import Header from '../../components/common/Header';
import { baseUrl, jwt } from "../../utils/baseUrl";
import { useNavigation } from '@react-navigation/native';

const ManageReview = () => {

    // 사용자 리뷰 데이터
    const [reviews, setReviews] = useState([]);
    const [reviewCount, setReviewCount] = useState(0)

    // 컴포넌트가 마운트 될 경우 내가 쓴 리뷰 조회 api 요청
    useEffect(() => {
        getReviews();
    }, []);

    // 내가 쓴 리뷰 조회 api
    async function getReviews() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': jwt,
            },
        };
        try {
            const response = await fetch(`${baseUrl}/jat/app/reviews`, requestOptions);
            const data = await response.json();

            if (data.isSuccess) {
                setReviewCount(data.result.totalReviews);
                setReviews(data.result.myReviews);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // 리뷰 삭제하기 api
    async function deleteReview(reviewIdx) {
        const requestBody = {
            reviewIdx: reviewIdx,
        };

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': jwt,
            },
            body: JSON.stringify(requestBody),
        };
        try {
            const response = await fetch(`${baseUrl}/jat/app/reviews`, requestOptions);
            const data = await response.json();

            if (data.isSuccess) {
                // 삭제 후 사용자 리뷰 데이터를 다시 불러옴
                getReviews()
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log('서버가 아직 안켜져있습니다.')
            console.log(error)
        }
    }

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

    const navigation = useNavigation();

    const moveToStoreDetailPage = (storeIdx) => {
        navigation.navigate("StoreDetailPage", { storeIdx: storeIdx })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.reviewWrapper}>
                    <TouchableOpacity onPress={() => moveToStoreDetailPage(item.storeIdx)}>
                        <View style={styles.store}>
                            <Text style={styles.storeText}>{item.storeName}</Text>
                            <ArrowRight stroke={Color.black}></ArrowRight>
                        </View>
                    </TouchableOpacity>
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
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                    </View>
                    {item.reviewUrl && <Image source={{ uri: item.reviewUrl }} style={styles.reviewImg}></Image>}
                    <Text style={styles.contents}>{item.contents}</Text>
                </View>
                <TouchableOpacity style={styles.delete}><Text style={styles.deleteText}>삭제하기</Text></TouchableOpacity>
                <View style={styles.menuWrapper}>
                    {item.reviewMenus.map((menu, index) => (
                        <View style={styles.menu} key={index}><Text style={styles.menuText}>{menu}</Text></View>
                    ))}
                </View>
                {item.sellerComment && <View style={styles.comment}>
                    <View style={styles.profile}>
                        <Image source={profile} style={styles.profileImg}></Image>
                        <Text style={styles.profileText}>사장님</Text>
                    </View>
                    <Text style={styles.commentText}>{item.sellerComment}</Text>
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
                        <Text style={styles.reviewCountText}>내가 쓴 리뷰 총 {reviewCount}개</Text>
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
    },
    deleteText: {
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