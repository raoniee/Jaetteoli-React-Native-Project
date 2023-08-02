import { SafeAreaView, StyleSheet, View, Text, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../../assets/colors/Color';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import { useRoute } from '@react-navigation/native';

const ModifyUserId = () => {
    const route = useRoute();
    const { userId } = route.params;

    const [changedUserId, setChangedUserId] = useState(userId.toString());
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(userId.toString() === changedUserId || changedUserId.trim() === '');
      }, [changedUserId, userId]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title='닉네임' right={0} />
            <View style={styles.contents}>
                <View>
                    <Text style={styles.text}>변경할 닉네임을 입력해주세요</Text>
                    <TextInput value={changedUserId} style={[styles.TextInput, { color: userId.toString() === changedUserId ? Color.gray : Color.black }]} onChangeText={(value) => setChangedUserId(value)}></TextInput>
                </View>
                <Button title='변경하기' height={50} backgroundColor={Color.darkPurple} color={Color.white} margin='0 0 55 0' disabled={isButtonDisabled}></Button>
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

export default ModifyUserId;