import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActionSheetIOS, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Color from '../../assets/colors/Color';
import Camera from '../../assets/images/Camera';
import Button from '../../components/common/Button';
import StarStroke from '../../assets/images/StarStroke';
import Header from '../../components/common/Header';
import * as ImagePicker from 'expo-image-picker';
import Close from '../../assets/images/Close';
import Modal from 'react-native-modal';
import { baseUrl } from "../../utils/baseUrl";
import { getToken } from '../../utils/Cookie';

const WriteReview = () => {

    const navigation = useNavigation();

    // 주문 내역에서 넘어올 때 storeIdx, orderIdx을 받아옴
    const route = useRoute();
    const { storeIdx, orderIdx } = route.params;

    // 주문 정보 데이터
    const [orderInfo, setOrderInfo] = useState({});

    // 컴포넌트가 마운트 될 경우 주문 정보(가게 이름, 메뉴) api 요청
    useEffect(() => {
        getOrderInfo()
    }, []);

    // 주문 정보(가게 이름, 메뉴) api
    async function getOrderInfo() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': await getToken(),
            },
        };
        try {
            const response = await fetch(`${baseUrl}/jat/app/reviews/pre?orderIdx=${orderIdx}`, requestOptions);
            const data = await response.json();

            if (data.isSuccess) {
                setOrderInfo(data.result)
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // 리뷰 작성 데이터
    const [starRating, setStarRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewPic, setReviewPic] = useState('');

    const deleteReviewPic = () => {
        console.log(reviewPic)
        setReviewPic('');
    }

    // 리뷰 작성 api
    async function setComment() {
        const formData = new FormData();
        formData.append('storeIdx', storeIdx);
        formData.append('orderIdx', orderIdx);
        formData.append('stars', starRating);
        formData.append('contents', reviewText);
        if (reviewPic) {
            const uriParts = reviewPic.split('.');
            const fileType = uriParts[uriParts.length - 1];
            formData.append('reviewFile', {
                uri: reviewPic,
                name: `review.${fileType}`,
                type: `image/${fileType}`,
            });
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': await getToken(),
            },
            body: formData,
        };
        try {
            const response = await fetch(`${baseUrl}/jat/app/reviews`, requestOptions);
            const data = await response.json();

            if (data.isSuccess) {
                navigation.navigate('주문내역')
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log('서버가 아직 안켜져있습니다.')
            console.log(error)
        }
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
            setReviewPic(result.assets[0].uri)
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
            setReviewPic(result.uri);
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


    return (
        <SafeAreaView style={styles.container}>
            <Header left={2} right={0} backgroundColor={Color.white} title='리뷰쓰기' navigation={navigation} />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 40, }}>
                    <View style={styles.orderInfoNStar}>
                        <View style={styles.orderInfo}>
                            <Text style={styles.storeName}>{orderInfo.storeName}</Text>
                            <Text style={styles.orderMenu}>{orderInfo.menuNames}</Text>
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
                    </View>
                    {!reviewPic && <TouchableOpacity style={styles.addPicture} onPress={showActionSheet}>
                        <Camera fill={Color.purple}></Camera>
                        <Text style={styles.addPictureText}>사진 첨부하기</Text>
                    </TouchableOpacity>}
                    {reviewPic && <Image source={{ uri: reviewPic }} style={styles.reviewPic}></Image>}
                    {reviewPic && <TouchableOpacity style={styles.deleteReviewPic} onPress={deleteReviewPic}><Text style={styles.deleteReviewPicText}>사진 삭제</Text></TouchableOpacity>}
                </View>
                <TextInput placeholder='음식에 대한 리뷰를 남겨주세요!' placeholderTextColor={Color.lightGray} multiline style={styles.review} onChangeText={(value) => setReviewText(value)}></TextInput>
                <Button onPress={setComment} title='완료' backgroundColor={Color.darkPurple} color={Color.white} margin='50 0 0 0' height={50} disabled={reviewText === '' || starRating === 0}></Button>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: Color.white,
    },
    orderInfoNStar: {
        width: 194,
        justifyContent: 'flex-start',
    },
    orderInfo: {
        marginBottom: 10,
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
        lineHeight: 24,
        color: Color.darkGray,
    },
    star: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'flex-start'
    },
    addPicture: {
        width: 127,
        height: 127,
        borderColor: Color.lightGray,
        borderWidth: 1,
        borderRadius: 30,
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
    reviewPic: {
        width: 127,
        height: 127,
        borderRadius: 30,
    },
    deleteReviewPic: {
        position: 'absolute',
        right: 37,
        bottom: -30,
    },
    deleteReviewPicText: {
        fontFamily: 'Pretendard-Regular',
        color: Color.darkGray,
    }

})

export default WriteReview;