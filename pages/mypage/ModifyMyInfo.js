import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Color from '../../assets/colors/Color';
import Camera from '../../assets/images/Camera';
import ArrowRight from '../../assets/images/ArrowRight';
import profile from '../../assets/images/profile.png';
import Header from '../../components/common/Header';

const ModifyMyInfo = () => {

    // 사용자 정보 데이터
    const [userId, setUserId] = useState('김땡땡');
    const [userProfile, setUserProfile] = useState(null);
    const [userEmail, setUserEmail] = useState('abcd1234@gmail.com');
    const [userPhoneNum, setUserPhoneNum] = useState('01012345678');

    return (
        <SafeAreaView>
            <Header title='내 정보 수정'/>
            <View style={styles.container}>
            <View style={styles.InfoWrapper}>
                <View style={styles.profile}>
                    {!userProfile && <Image source={profile} style={styles.profileImg}></Image>}
                    {userProfile && <Image source={userProfile} style={styles.profileImg}></Image>}
                    <View style={styles.camera}>
                        <Camera fill={Color.white}></Camera>
                    </View>
                </View>
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.index}>닉네임</Text>
                        <View style={styles.userInfo}>
                            <Text style={styles.info}>{userId}</Text>
                            <ArrowRight stroke={Color.lightGray}></ArrowRight>
                        </View>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.index}>이메일</Text>
                        <View style={styles.userInfo}>
                            <Text style={styles.info}>{userEmail}</Text>
                            <ArrowRight stroke={Color.lightGray}></ArrowRight>
                        </View>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.index}>휴데폰 번호</Text>
                        <View style={styles.userInfo}>
                            <Text style={styles.info}>{userPhoneNum}</Text>
                            <ArrowRight stroke={Color.lightGray}></ArrowRight>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    InfoWrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 55,
    },
    profile: {
        width: 110,
        height: 110,
        borderRadius: '100%',
        borderColor: Color.lightPurple,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
        marginBottom: 50,
    },
    profileImg: {
        width: 98,
        height: 98,
        borderRadius: 100,
    },
    camera: {
        width: 35,
        height: 35,
        borderRadius: '100%',
        backgroundColor: Color.darkPurple,
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfoWrapper: {
        width: '100%',
        height: 330,
        justifyContent: 'space-between'
    },
    index: {
        paddingLeft: 20,
        fontSize: 16,
        fontFamily:'Pretendard-SemiBold',
        marginBottom: 10,
    },
    userInfo: {
        width: '100%',
        height: 62,
        borderRadius: 30,
        borderColor: Color.lightGray,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    info: {
        fontSize: 16,
        fontFamily:'Pretendard-Medium',
        color: Color.darkGray,
    }
});

export default ModifyMyInfo;