import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import reveiwImg from '../../assets/images/reviewImg.png'
import Color from '../../assets/colors/Color';
import ArrowRight from '../../assets/images/ArrowRight';
import Star from '../../assets/images/Star';
import profile from '../../assets/images/profile.png';
import Header from '../../components/common/Header';
import { baseUrl } from "../../utils/baseUrl";
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { getToken } from '../../utils/Cookie';

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
                'X-ACCESS-TOKEN': await getToken(),
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

    const [modalVisible, setModalVisible] = useState(false);
    const [reviewIdx, setReviewIdx] = useState(null);

    const openModal = (reviewIdx) => {
        setModalVisible(true);
        setReviewIdx(reviewIdx);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // 리뷰 삭제하기 api
    async function deleteReview(reviewIdx) {
        const requestBody = {
            reviewIdx: reviewIdx,
        };

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': await getToken(),
            },
            body: JSON.stringify(requestBody),
        };
        try {
            const response = await fetch(`${baseUrl}/jat/app/reviews`, requestOptions);
            const data = await response.json();

            if (data.isSuccess) {
                // 삭제 후 사용자 리뷰 데이터를 다시 불러옴
                closeModal();
                getReviews();
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
                <TouchableOpacity onPress={() => { openModal(item.reviewIdx) }} style={styles.delete}><Text style={styles.deleteText}>삭제하기</Text></TouchableOpacity>
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
            <Modal
                isVisible={modalVisible}
                onBackdropPress={closeModal}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.text}>리뷰를 삭제하시면 재작성이 불가합니다.{'\n'}삭제하시겠습니까?</Text>
                    <View style={styles.btnContainer}>
                        <Pressable
                            onPress={closeModal}
                            android_ripple={{ color: Color.lightPurple }}
                            style={({ pressed }) => pressed && styles.pressedItem}
                        >
                            <View style={[styles.modalButton, { backgroundColor: Color.brightGray }]}>
                                <Text style={styles.modalButtonText}>아니오</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            android_ripple={{ color: Color.lightPurple }}
                            style={({ pressed }) => pressed && styles.pressedItem}
                            onPress={() => deleteReview(reviewIdx)}
                        >
                            <View style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>예</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menu: {
        backgroundColor: Color.lightPurple,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 18,
        marginRight: 5,
        marginBottom: 8,
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
    },
    closeModal: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'flex-end'
    },
    modalContainer: {
        height: 313,
        width: '100%',
        backgroundColor: Color.white,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    text: {
        marginTop: 116,
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        lineHeight: 23,
        textAlign: 'center'
    },
    btnContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 48,
    },
    modalButton: {
        alignItems: 'center',
        backgroundColor: Color.lightPurple,
        borderRadius: 30,
        width: 93,
        height: 33,
        justifyContent: 'center',
    },
    modalButtonText: {
        color: Color.black,
        fontSize: 14,
        fontFamily: "Pretendard-Regular",
    },
})

export default ManageReview;