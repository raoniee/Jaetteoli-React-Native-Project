import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import Color from '../../assets/colors/Color';
import Check from '../../assets/images/Check';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';

const Withdrawal = () => {

    const [agree, setAgree] = useState(false)

    const toggleAgree = () => {
        setAgree((prevState) => !prevState);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title='회원탈퇴' right={0} />
            <View style={styles.contents}>
                <View style={styles.text}>
                    <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 18, lineHeight: 25, marginBottom: 5 }}>회원탈퇴 유의사항</Text>
                    <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 15, lineHeight: 25, color: Color.darkGray }}>회원 탈퇴 전에 꼭 확인하세요.</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    <Text style={{ lineHeight: 23 }}>· 재떨이 회원탈퇴 시 재떨이 서비스에 탈퇴되며, 회사가 운영하는 다른 제휴 서비스(ex. 재떨이 사장님 서비스)의 이용은 가능합니다.{"\n\n"}
                        · 재떨이 회원탈퇴 시 회원이 보유하고 있던 주문(결제)내역은 모두 소멸되며, 복구가 불가능합니다.{"\n\n"}
                        · 재떨이 회원탈퇴 후 재가입하더라도 탈퇴 전의 회원정보, 거래정보, 사전예약 주문(결제)내역 등은 복구되지 않습니다.{"\n\n"}
                        · 재떨이 회원은 떨이페이를 회원탈퇴 신청전에 환불 신청하거나 소진하여야 합니다. 회원이 환불 신청 없이 자진 탈퇴하고자 하는 경우, 회사는 유사성 떨이페이에 대한 소멸 동의를 받습니다.{"\n"}
                        · 재떨이 회원은 고객센터 전화문의를 통해 떨이페이에 대한 환불을 신청할 수 있습니다.{"\n\n"}
                        · 재떨이 회원이 탈퇴하려는 경우 결제 편의를 목적으로 회원이 지정(선택)한 부가 서비스(ex.떨이페이)가 해지되며, 해당 서비스 회원의 자격도 자동으로 상실(탈퇴)됩니다.{"\n\n"}
                        · 재떨이 회원탈퇴 시 회원정보 및 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는 복구가 불가능합니다. 다만 법령에 의하여 보관해야 하는 경우 또는 회원가입 남용, 서비스 부정사용 등을 위한 회사 내부정책에 의하여 보관해야 하는 정보는 회원탈퇴 후에도 일정기간 보관됩니다. 자세한 사항은 재떨이 개인정보 처리방침에서 확인하실 수 있습니다.{"\n\n"}
                    </Text>
                </ScrollView>
            </View>
            <View style={{ width: '100%', height: 16, backgroundColor: Color.lightPurple }}></View>
            <View style={styles.btnContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={toggleAgree}>
                        <View style={{ ...styles.agreeBox, backgroundColor: agree ? Color.purple : Color.white, borderColor: agree ? Color.purple : Color.lightGray, }}>
                            {agree && <Check width={21} height={21} stroke={Color.white}></Check>}
                        </View>
                    </TouchableOpacity>
                    <Text>유의사항을 모두 확인하였으며, 동의합니다.</Text>
                </View>
                <Button height={50} title='계정 삭제하기' backgroundColor={Color.darkPurple} color={Color.white} disabled={!agree} margin='30 0 0 0'></Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Color.white,
    },
    contents: {
        padding: 20,
    },
    text: {
        marginBottom: 20,
    },
    scrollView: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Color.gray,
        height: 448,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
    },
    btnContainer: {
        width: '100%',
        padding: 20,
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
})

export default Withdrawal;