import { SafeAreaView, StyleSheet, View, Text, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../../assets/colors/Color';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import { useRoute } from '@react-navigation/native';

const ModifyUserPhoneNum = () => {
    const route = useRoute();
    const { userPhoneNum } = route.params;

    const [changedUserPhoneNum, setChangedUserPhoneNum] = useState(userPhoneNum.toString());
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(userPhoneNum.toString() === changedUserPhoneNum || changedUserPhoneNum.trim() === '');
      }, [changedUserPhoneNum, userPhoneNum]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title='휴대폰 번호' right={0} />
            <View style={styles.contents}>
                <View>
                    <Text style={styles.text}>변경할 휴대폰 번호를 입력해주세요</Text>
                    <TextInput value={changedUserPhoneNum} style={[styles.TextInput, { color: userPhoneNum.toString() === changedUserPhoneNum ? Color.gray : Color.black }]} onChangeText={(value) => setChangedUserPhoneNum(value)}></TextInput>
                </View>
                <Button title='인증번호 받기' height={50} backgroundColor={Color.darkPurple} color={Color.white} margin='0 0 55 0' disabled={isButtonDisabled}></Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Color.white
    }, 
    contents: {
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
    },
    text: {
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        lineHeight: 35,
    },
    TextInput: {
        width: '100%',
        height: 45,
        borderRadius: 30,
        backgroundColor: Color.brightGray,
        paddingLeft: 20,
        paddingRight: 20,
    }
})

export default ModifyUserPhoneNum;