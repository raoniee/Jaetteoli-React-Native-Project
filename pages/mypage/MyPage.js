import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Color from '../../assets/colors/Color';
import Alram from '../../assets/images/Alram';
import ArrowRight from '../../assets/images/ArrowRight';
import Order from '../../assets/images/Order';
import Review from '../../assets/images/Review';
import Subscribe from '../../assets/images/Subscribe';
import MyPageListItem from './MyPageListItem';
import profile from '../../assets/images/profile.png'
import Header from '../../components/common/Header';

const MyPage = () => {

    const navigation = useNavigation()

    const onPress = (navigate) => {
        navigation.navigate(navigate)
    }

    // 사용자 정보 데이터
    const [userId, setUserId] = useState('김땡땡');
    const [userProfile, setUserProfile] = useState(null);

    return (
        <SafeAreaView style={styles.container}>

            <Header left={0} right={1} color='white' backgroundColor={Color.purple} navigation={navigation} statusBar='white' />
            <View style={styles.background}>
                <View style={styles.profile}>
                    {!userProfile && <Image source={profile} style={styles.profileImg}></Image>}
                    {userProfile && <Image source={userProfile} style={styles.profileImg}></Image>}
                </View>
                <TouchableOpacity onPress={() => onPress('ModifyMyInfo')}>
                    <View style={styles.profileId}>
                        <Text style={styles.userId}>{userId}</Text>
                        <ArrowRight stroke={Color.white}></ArrowRight>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.listWrapper}>
                <View style={styles.list}>
                    <TouchableOpacity onPress={() => onPress('구독')}>
                        <View style={styles.listItem}>
                            <Subscribe stroke={Color.darkPurple}></Subscribe>
                            <MyPageListItem name='구독'></MyPageListItem>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPress('주문내역')}>
                        <View style={styles.listItem}>
                            <Order stroke={Color.darkPurple}></Order>
                            <MyPageListItem name='주문내역'></MyPageListItem>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPress('AlramList')}>
                        <View style={styles.listItem}>
                            <Alram stroke={Color.darkPurple}></Alram>
                            <MyPageListItem name='알림센터'></MyPageListItem>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPress('ManageReview')}>
                        <View style={styles.listItem}>
                            <Review stroke={Color.darkPurple}></Review>
                            <MyPageListItem name='리뷰관리'></MyPageListItem>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Color.purple,
    },
    background: {
        flex: 0.4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        width: 110,
        height: 110,
        borderRadius: 100,
        borderColor: Color.white,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
    },
    profileImgNone: {
        width: 98,
        height: 98,
        borderRadius: 50,
        backgroundColor: Color.white,
    },
    profileImg: {
        width: 98,
        height: 98,
        borderRadius: 100,
    },
    profileId: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    userId: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Pretendard-Medium',
        lineHeight: 35,
        color: Color.white,
    },
    listWrapper: {
        flex: 0.6,
        width: '100%',
        backgroundColor: Color.white,
    },
    list: {
        width: '90%',
        height: 305,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: Color.white,
        borderRadius: 30,
        position: 'absolute',
        top: -30,
        shadowColor: Color.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'space-around'
    },
    listItem: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default MyPage;