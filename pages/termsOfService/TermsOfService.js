import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../../assets/colors/Color';
import ArrowRight from '../../assets/images/ArrowRight';
import Check from '../../assets/images/Check';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';
import Close from '../../assets/images/Close';
import { useNavigation, useRoute } from '@react-navigation/native';

const TermsOfService = () => {

    // 요청 권한 선택 여부
    const [location, setLocation] = useState(false);
    const [alram, setAlram] = useState(false);

    const locationAgree = () => {
        setLocation((prevState) => !prevState)
    }

    const alramAgree = () => {
        setAlram((prevState) => !prevState)
    }

    const allAgree = () => {
        if ((location && !alram) || (!location && alram)) {
            setLocation(true)
            setAlram(true)
        } else {
            setLocation((prevState) => !prevState)
            setAlram((prevState) => !prevState)
        }
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLinkingVisible, setModalLinkingVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
        setModalLinkingVisible(false);
    };

    const requestNotificationPermission = async () => {
        await Notifications.requestPermissionsAsync();
    };

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setModalVisible(true);
            setModalLinkingVisible(true);
        }
    };

    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else if (Platform.OS === 'android') {
            Linking.openSettings();
        }
    };

    const startBtnHandler = async () => {
        if (!location) {
            setModalVisible(true);
            return;
        } else {
            if (alram) {
                await requestNotificationPermission();
            }
            await requestLocationPermission();
        }
    };

    const navigation = useNavigation();

    const moveToDetailInfo = (service) => {
        navigation.navigate("DetailInfo", { service: service })
    }

    const route = useRoute();
    useEffect(() => {
        if (route.params) {
            const { locationState, alramState } = route.params;
            if (locationState) {
                setLocation(true);
            }
            if (alramState) {
                setAlram(true);
                console.log(alram)
            }
        }
    }, [route.params]); 

    return (
        <SafeAreaView style={styles.container}>
            <Header right={0} title='이용약관 동의' />
            <View style={styles.contents}>
                <Text style={styles.notice}>아래의 약관에 동의하신 후 재떨이 서비스를 이용해주세요</Text>
                <View style={styles.agreeAll}>
                    <TouchableOpacity onPress={allAgree}>
                        <View style={{ ...styles.agreeBox, backgroundColor: location && alram ? Color.purple : Color.white, borderColor: location && alram ? Color.purple : Color.lightGray, }}>
                            {(location && alram) && <Check width={21} height={21} stroke={Color.white}></Check>}
                        </View>
                    </TouchableOpacity>
                    <Text>전체동의</Text>
                </View>
                <View style={styles.agreeTermsOfService}>
                    <View style={styles.agreeItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={locationAgree}><Check width={24} height={24} stroke={location ? Color.darkPurple : Color.gray} /></TouchableOpacity>
                            <Text style={styles.text}>위치기반 서비스 약관동의 (필수)</Text>
                        </View>
                        <TouchableOpacity onPress={() => moveToDetailInfo('location')}><ArrowRight stroke={Color.gray} /></TouchableOpacity>
                        <Text style={styles.additionInfo}>주변 식당 검색에만 사용합니다.</Text>
                    </View>
                    <View style={styles.agreeItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={alramAgree}><Check width={24} height={24} stroke={alram ? Color.darkPurple : Color.gray} /></TouchableOpacity>
                            <Text style={styles.text}>재떨이 알림 동의 (선택)</Text>
                        </View>
                        <TouchableOpacity onPress={() => moveToDetailInfo('alram')}><ArrowRight stroke={Color.gray} /></TouchableOpacity>
                        <Text style={styles.additionInfo}>서비스 알림을 전달 합니다.</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button title='시작하기' backgroundColor={Color.darkPurple} color={Color.white} height={62} onPress={startBtnHandler}></Button>
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
                        <Text style={styles.modalTitle}>위치 정보 허용을 안 하시면{'\n'}재떨이 서비스 이용이 불가능합니다.</Text>
                        <Text style={styles.modalContents}>{modalLinkingVisible ? '위치 정보 사용을 원하시면 휴대폰 설정에서 재떨이의 위치 정보 접근 권한을 허용해 주세요.' : '재떨이 서비스 이용을 원하신다면 재떨이의 위치 정보 접근 권한을 허용해 주세요.'}</Text>
                        {modalLinkingVisible && <Button title='설정하러 가기' backgroundColor={Color.darkPurple} color={Color.white} height={62} onPress={openAppSettings} margin='0 0 50 0' />}
                    </View>
                </Modal>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Color.white
    },
    contents: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    notice: {
        fontFamily: 'Pretendard-Medium',
        color: Color.gray,
        fontSize: 12,
        lineHeight: 13.2,
        marginTop: 20,
        textAlign: 'center'
    },
    agreeAll: {
        width: '100%',
        height: 49,
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: Color.lightGray,
        marginTop: 65,
    },
    agreeBox: {
        width: 21,
        height: 21,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    agreeTermsOfService: {
        marginTop: 50,
        width: '100%',
    },
    agreeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 46.5
    },
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        lineHeight: 15.4,
        marginLeft: 10,
    },
    additionInfo: {
        position: 'absolute',
        bottom: -16,
        left: 35,
        fontFamily: 'Pretendard-Medium',
        fontSize: 13,
        lineHeight: 14.3,
        color: Color.gray
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
    }
});

export default TermsOfService;