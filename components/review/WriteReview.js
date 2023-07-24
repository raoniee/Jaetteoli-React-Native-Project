import { StyleSheet, View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import Color from '../../assets/colors/Color';
import Camera from '../../assets/images/Camera';

const WriteReview = () => {
    const [orderInfo, setOrderInfo] = useState({
        storeName: '울산미주구리',
        orderMenu: [
            {
                menuName: '도다리',
                menuCount: 1,
            },
            {
                menuName: '공깃밥',
                menuCount: 1,
            },
        ]
    })

    return (
        <View style={styles.container}>
            <View style={styles.orderInfo}>
                <Text style={styles.storeName}>{orderInfo.storeName}</Text>
                <Text style={styles.orderMenu}>{orderInfo.orderMenu.map((orderMenu) => orderMenu.menuName).join(', ')}</Text>
            </View>
            <View style={styles.star}>

            </View>
            <View style={styles.addPicture}>
                <Camera fill={Color.purple}></Camera>
                <Text style={styles.addPictureText}>사진 첨부하기</Text>
            </View>
            <TextInput placeholder='음식에 대한 리뷰를 남겨주세요!' placeholderTextColor={Color.lightGray} multiline style={styles.review}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    orderInfo: {
        marginTop: 155,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        height: 70,
    },
    storeName: {
        fontSize: 18,
        fontFamily:'Pretendard-SemiBold',
        lineHeight: 35,
    },
    orderMenu: {
        fontSize: 16,
        fontFamily:'Pretendard-Regular',
        lineHeight: 35,
        color: Color.darkGray,
    },
    star: {
        marginBottom: 45,
    },
    addPicture: {
        width: '100%',
        height: 45,
        borderColor: Color.lightGray,
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPictureText: {
        color: Color.purple,
        fontSize: 14,
        fontFamily:'Pretendard-Regular',
        lineHeight: 20,
        marginLeft: 5,
    },
    review: {
        width: '100%',
        height: 306,
        marginTop: 10,
        padding: 20,
        borderColor: Color.lightGray,
        borderWidth: 1,
        borderRadius: 30,
        textAlignVertical: 'top',
    }

})

export default WriteReview;