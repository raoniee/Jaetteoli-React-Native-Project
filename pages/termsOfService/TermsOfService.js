import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Color from '../../assets/colors/Color';
import ArrowRight from '../../assets/images/ArrowRight';
import Check from '../../assets/images/Check';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';

const TermsOfService = () => {

    const [location, setLocation] = useState(false);
    const [alram, setAlram] = useState(false);

    const locationAgree = () => {
        setLocation((prevState) => !prevState)
    }

    const alramAgree = () => {
        setAlram((prevState) => !prevState)
    }

    const allAgree = () => {
        if((location && !alram) ||  (!location && alram)) {
            setLocation(true)
            setAlram(true)
        } else {
            setLocation((prevState) => !prevState)
            setAlram((prevState) => !prevState)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header right={0} title='이용약관 동의' />
            <View style={styles.contents}>
                <Text style={styles.notice}>아래의 약관에 동의하신 후 재떨이 서비스를 이용해주세요</Text>
                <View style={styles.agreeAll}>
                    <TouchableOpacity onPress={allAgree}>
                        <View style={{ ...styles.agreeBox, backgroundColor: location && alram ? Color.purple : Color.white, borderColor: location && alram ? Color.purple : Color.lightGray, }}>
                            {(location && alram) && <Check width={21} height={21} stroke={Color.white}></Check> }
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
                        <TouchableOpacity><ArrowRight stroke={Color.gray} /></TouchableOpacity>
                        <Text style={styles.additionInfo}>주변 식당 검색에만 사용합니다.</Text>
                    </View>
                    <View style={styles.agreeItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={alramAgree}><Check width={24} height={24} stroke={alram ? Color.darkPurple : Color.gray}  /></TouchableOpacity>
                            <Text style={styles.text}>재떨이 알림 동의 (선택)</Text>
                        </View>
                        <TouchableOpacity><ArrowRight stroke={Color.gray} /></TouchableOpacity>
                        <Text style={styles.additionInfo}>서비스 알림을 전달 합니다.</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button title='시작하기' backgroundColor={Color.darkPurple} color={Color.white} height={62}></Button>
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
    }
});

export default TermsOfService;