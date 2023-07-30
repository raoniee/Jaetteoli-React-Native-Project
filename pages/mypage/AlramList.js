import { FlatList, SafeAreaView, StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Color from '../../assets/colors/Color';
import Alram from '../../assets/images/Alram';
import Header from '../../components/common/Header';

const AlramList = () => {

    const checkNotificationPermission = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            setIsEnabled(true)
            console.log('ㅇㅋ')
        } else if (status === 'denied') {
            setIsEnabled(false)
            console.log('ㄴㄴ')
        }
    };

    useEffect(() => {
        checkNotificationPermission();
    }, []);

    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = async () => {
        if (isEnabled) {
            // 알림 권한 해제하기
            if (Platform.OS === 'ios') {
                await Notifications.setNotificationCategoryAsync('default'); // 기본 알림 카테고리 사용
            } else if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Default',
                    importance: Notifications.AndroidImportance.DEFAULT,
                });
            }
        } else {
            // 알림 권한 요청하기
            await Notifications.requestPermissionsAsync();
        }
        checkNotificationPermission(); // 권한 상태 다시 확인
    };

    // 알람 데이터
    const [alrams, setAlrams] = useState([
        {
            alramIdx: 0,
            title: '오늘의 떨이',
            contents: `"던킨도너츠 무거점"이 떨이 상품들을 등록하였습니다. 맛있는 음식들이 여러분을 기다리고 있습니다!`
        },
        {
            alramIdx: 1,
            title: '주문완료',
            contents: `[주문번호 14번] 주문이 정상적으로 접수되었습니다. 가게에 방문 후 접수번호를 말씀해주세요.\n접수번호 : 14번`
        },
        {
            alramIdx: 2,
            title: '리뷰를 남겨주세요!',
            contents: `“던킨도너츠 무거점" 음식이 맛있으셨다면 다른 분들을 위해 리뷰를 남겨주세요. (리뷰 쓰기는 주문 이후 5일동안만 가능합니다.)`
        },
    ]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer} key={item.alramIdx}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemContents}>{item.contents}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title='알림센터' />
            <FlatList
                data={alrams}
                renderItem={renderItem}
                keyExtractor={item => item.alramIdx}
                ListHeaderComponent={
                    <View style={styles.pushAlramList}>
                        <View style={styles.pushAlram}>
                            <View style={styles.pushAlramTitle}>
                                <Alram stroke={Color.purple}></Alram>
                                <Text style={styles.pushAlramText}>푸시알림</Text>
                            </View>
                            <View style={styles.switch}>
                                <TouchableOpacity onPress={toggleSwitch}>
                                    <View
                                        style={[
                                            styles.track,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.thumb,
                                                {
                                                    backgroundColor: isEnabled ? Color.purple : Color.brightGray,
                                                    transform: [{ translateX: isEnabled ? 40 - 22 : 0 }],
                                                },
                                            ]}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.pushAlramListText}>알림목록</Text>
                    </View>
                }
            />
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
    pushAlramList: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 28,
    },
    pushAlram: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: Color.lightGray,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    pushAlramTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pushAlramText: {
        fontFamily: 'Pretendard-Medium',
        lineHeight: 35,
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    track: {
        width: 40,
        height: 18,
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: '#DCD8FD'
    },
    thumb: {
        width: 22,
        height: 22,
        borderRadius: '100%',
        elevation: 2,
    },
    pushAlramListText: {
        marginTop: 23,
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        lineHeight: 54.5,
        marginBottom: 5,
    },
    itemContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: Color.lightGray,
        borderRadius: 25,
    },
    itemTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 14,
        lineHeight: 35,
        color: Color.purple,
        marginBottom: 5
    },
    itemContents: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 13,
        lineHeight: 22,
    }
})

export default AlramList;