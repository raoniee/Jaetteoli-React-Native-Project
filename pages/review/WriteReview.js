import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Color from '../../assets/colors/Color';
import Camera from '../../assets/images/Camera';
import Button from '../../components/common/Button';
import StarStroke from '../../assets/images/StarStroke';

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
    });

    const [starRating, setStarRating] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.orderInfo}>
                <Text style={styles.storeName}>{orderInfo.storeName}</Text>
                <Text style={styles.orderMenu}>{orderInfo.orderMenu.map((orderMenu) => orderMenu.menuName).join(', ')}</Text>
            </View>
            {(starRating === 0) && <View style={styles.star}>
                <TouchableOpacity onPress={() => { setStarRating(1) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(2) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(3) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(4) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(5) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
            </View>}
            {(starRating === 1) && <View style={styles.star}>
                <TouchableOpacity onPress={() => { setStarRating(1) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(2) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(3) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(4) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(5) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
            </View>}
            {(starRating === 2) && <View style={styles.star}>
                <TouchableOpacity onPress={() => { setStarRating(1) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(2) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(3) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(4) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(5) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
            </View>}
            {(starRating === 3) && <View style={styles.star}>
                <TouchableOpacity onPress={() => { setStarRating(1) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(2) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(3) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(4) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(5) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
            </View>}
            {(starRating === 4) && <View style={styles.star}>
                <TouchableOpacity onPress={() => { setStarRating(1) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(2) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(3) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(4) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(5) }}><StarStroke stroke={Color.black} fill={Color.white}></StarStroke></TouchableOpacity>
            </View>}
            {(starRating === 5) && <View style={styles.star}>
                <TouchableOpacity onPress={() => { setStarRating(1) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(2) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(3) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(4) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
                <TouchableOpacity onPress={() => { setStarRating(5) }}><StarStroke stroke={Color.black} fill={Color.yellow}></StarStroke></TouchableOpacity>
            </View>}
            <View style={styles.addPicture}>
                <Camera fill={Color.purple}></Camera>
                <Text style={styles.addPictureText}>사진 첨부하기</Text>
            </View>
            <TextInput placeholder='음식에 대한 리뷰를 남겨주세요!' placeholderTextColor={Color.lightGray} multiline style={styles.review}></TextInput>
            <Button title='완료' backgroundColor={Color.darkPurple} color={Color.white} margin='50 0 0 0' height={50}></Button>
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
        fontFamily: 'Pretendard-SemiBold',
        lineHeight: 35,
    },
    orderMenu: {
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        lineHeight: 35,
        color: Color.darkGray,
    },
    star: {
        width: '100%',
        marginBottom: 45,
        flexDirection: 'row',
        justifyContent: 'center',
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
        fontFamily: 'Pretendard-Regular',
        lineHeight: 20,
        marginLeft: 5,
    },
    review: {
        width: '100%',
        height: 306,
        marginTop: 10,
        padding: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: Color.lightGray,
        borderWidth: 1,
        borderRadius: 30,
        textAlignVertical: 'top',
    }

})

export default WriteReview;