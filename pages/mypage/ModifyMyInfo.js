import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ActionSheetIOS, Linking, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Color from '../../assets/colors/Color';
import Camera from '../../assets/images/Camera';
import ArrowRight from '../../assets/images/ArrowRight';
import profile from '../../assets/images/profile.png';
import Header from '../../components/common/Header';
import * as ImagePicker from 'expo-image-picker';
import Close from '../../assets/images/Close';
import Modal from 'react-native-modal';
import Button from '../../components/common/Button';
import { removeToken } from '../../utils/Cookie';

const ModifyMyInfo = () => {

    const navigation = useNavigation();

    const onPressModifyUserId = () => {
        navigation.navigate('ModifyUserId', { userId: userId });
    }

    const onPressModifyUserEmail = () => {
        navigation.navigate('ModifyUserEmail', { userEmail: userEmail });
    }

    const onPressModifyUserPhoneNum = () => {
        navigation.navigate('ModifyUserPhoneNum', { userPhoneNum: userPhoneNum });
    }

    const moveToWithdrawal = () => {
        navigation.navigate('Withdrawal');
    }


    // 사용자 정보 데이터
    const [userId, setUserId] = useState('김땡땡');
    const [userProfile, setUserProfile] = useState(null);
    const [userEmail, setUserEmail] = useState('abcd1234@gmail.com');
    const [userPhoneNum, setUserPhoneNum] = useState('01012345678');

    const deleteUserProfile = () => {
        setUserProfile(null)
    }

    // 미디어 라이브러리(사진 보관함) 권한 상태, 권한 요청 함수
    const [mediaLibrary, requestMediaLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
    // 카메라 권한 상태, 권한 요청 함수
    const [camera, requestCameraPermission] = ImagePicker.useCameraPermissions();

    // 미디어 라이브러리(사진 보관함) 열기
    const openMediaLibrary = async () => {

        // 미디어 라이브러리(사진 보관함) 권한이 정해지지 않은 경우 권한 요청 함수 실행
        if (mediaLibrary.status === 'undetermined') {
            const permission = await requestMediaLibraryPermission();
            if (!permission.granted) {
                setModalText({
                    title: `사진 보관함 접근 권한 허용을 안 하시면\n사진 보관함 내 사진에 접근이 불가능합니다.`,
                    contents: `사진 보관함 접근 허용을 원하시면 휴대폰 설정에서\n재떨이의 사진 보관함 접근 권한을 허용해 주세요.`
                })
                setModalVisible(true);
                return;
            }
        }

        // 미디어 라이브러리(사진 보관함) 권한이 없을 경우 리턴
        if (mediaLibrary.status === 'denied') {
            setModalText({
                title: `사진 보관함 접근 권한 허용을 안 하시면\n사진 보관함 내 사진에 접근이 불가능합니다.`,
                contents: `사진 보관함 접근 허용을 원하시면 휴대폰 설정에서\n재떨이의 사진 보관함 접근 권한을 허용해 주세요.`
            })
            setModalVisible(true);
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserProfile(result.assets[0].uri)
            console.log(result.assets[0].uri)
        }
    };

    // 카메라로 사진 찍기
    const takePhoto = async () => {
        // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if (camera.status === 'undetermined') {
            const permission = await requestCameraPermission();
            if (!permission.granted) {
                setModalText({
                    title: `카메라 접근 권한 허용을 안 하시면 사진 촬영이 불가능합니다.`,
                    contents: `사진 촬영을 원하시면 휴대폰 설정에서\n재떨이의 카메라 접근 권한을 허용해 주세요.`
                })
                setModalVisible(true);
                return;
            }
        }

        if (camera.status === 'denied') {
            setModalText({
                title: `카메라 접근 권한 허용을 안 하시면\n사진 촬영이 불가능합니다.`,
                contents: `사진 촬영을 원하시면 휴대폰 설정에서\n재떨이의 카메라 접근 권한을 허용해 주세요.`
            })
            setModalVisible(true);
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setUserProfile(result.uri);
        }
    };

    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['사진 보관함', '사진 찍기', '취소'],
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    openMediaLibrary();
                } else if (buttonIndex === 1) {
                    takePhoto();
                }
            }
        );
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState({
        title: `사진 보관함 접근 권한 허용을 안 하시면\n사진 보관함 내 사진에 접근이 불가능합니다.`,
        contents: `사진 보관함 접근 허용을 원하시면 휴대폰 설정에서\n재떨이의 사진 보관함 접근 권한을 허용해 주세요.`
    });

    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else if (Platform.OS === 'android') {
            Linking.openSettings();
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const closeLogoutModal = () => {
        setLogoutModalVisible(false);
    };

    const yesLogoutModal = async () => {
        await removeToken()
        navigation.popToTop()
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title='내 정보 수정' />
            <View style={styles.contents}>
                <View style={styles.InfoWrapper}>
                    <View style={styles.profile}>
                        {!userProfile && <Image source={profile} style={styles.profileImg}></Image>}
                        {userProfile && <Image source={{ uri: userProfile }} style={styles.profileImg}></Image>}
                        <TouchableOpacity onPress={showActionSheet} style={styles.camera}>
                            <Camera fill={Color.white} />
                        </TouchableOpacity>
                        {userProfile && <TouchableOpacity style={styles.deleteUserProfile} onPress={deleteUserProfile}><Text style={styles.deleteUserProfileText}>사진 삭제</Text></TouchableOpacity>}
                    </View>
                    <View style={styles.userInfoWrapper}>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.index}>닉네임</Text>
                            <View style={styles.userInfo}>
                                <Text style={styles.info}>{userId}</Text>
                                <TouchableOpacity onPress={onPressModifyUserId}><ArrowRight stroke={Color.lightGray}></ArrowRight></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.index}>이메일</Text>
                            <View style={styles.userInfo}>
                                <Text style={styles.info}>{userEmail}</Text>
                                <TouchableOpacity onPress={onPressModifyUserEmail}><ArrowRight stroke={Color.lightGray}></ArrowRight></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.index}>휴대폰 번호</Text>
                            <View style={styles.userInfo}>
                                <Text style={styles.info}>{userPhoneNum}</Text>
                                <TouchableOpacity onPress={onPressModifyUserPhoneNum}><ArrowRight stroke={Color.lightGray}></ArrowRight></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.logoutNsecession}>
                        <TouchableOpacity onPress={() => { setLogoutModalVisible(true) }}><Text style={styles.text}>로그아웃</Text></TouchableOpacity>
                        <Text style={styles.text}>|</Text>
                        <TouchableOpacity onPress={moveToWithdrawal}><Text style={styles.text}>회원탈퇴</Text></TouchableOpacity>
                    </View>
                </View>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={closeModal}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
                            <Close></Close>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{modalText.title}</Text>
                        <Text style={styles.modalContents}>{modalText.contents}</Text>
                        <Button title='설정하러 가기' backgroundColor={Color.darkPurple} color={Color.white} height={62} onPress={openAppSettings} margin='0 0 50 0' />
                    </View>
                </Modal>
                <Modal
                    isVisible={logoutModalVisible}
                    onBackdropPress={closeLogoutModal}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}
                >
                    <View style={styles.logoutModalContainer}>
                        <Text style={styles.logoutText}>로그아웃하시겠습니까?</Text>
                        <View style={styles.btnContainer}>
                            <Pressable
                                onPress={closeLogoutModal}
                                android_ripple={{ color: Color.lightPurple }}
                                style={({ pressed }) => pressed && styles.pressedItem}
                            >
                                <View style={[styles.modalButton, { backgroundColor: Color.brightGray }]}>
                                    <Text style={styles.modalButtonText}>아니오</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                onPress={yesLogoutModal}
                                android_ripple={{ color: Color.lightPurple }}
                                style={({ pressed }) => pressed && styles.pressedItem}
                            >
                                <View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>예</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Color.white,
    },
    contents: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    InfoWrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: 55,
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
    deleteUserProfile: {
        position: 'absolute',
        bottom: -30,
    },
    deleteUserProfileText: {
        fontFamily: 'Pretendard-Regular',
        color: Color.darkGray,
    },
    userInfoWrapper: {
        width: '100%',
        height: 330,
        justifyContent: 'space-between',
    },
    index: {
        paddingLeft: 20,
        fontSize: 16,
        fontFamily: 'Pretendard-SemiBold',
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
        fontFamily: 'Pretendard-Medium',
        color: Color.darkGray,
    },
    button: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 580,
        left: 20
    },
    modalContainer: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    closeModal: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'flex-end'
    },
    modalTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        lineHeight: 25,
    },
    modalContents: {
        marginTop: 20,
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        lineHeight: 20,
        color: Color.darkGray,
        marginBottom: 50,
    },
    logoutNsecession: {
        flexDirection: 'row',
        width: 107,
        height: 35,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 60,
    },
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
        color: Color.gray,
    },
    logoutModalContainer: {
        height: 313,
        width: '100%',
        backgroundColor: Color.white,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    logoutText: {
        marginTop: 116,
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
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
});

export default ModifyMyInfo;