import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text } from 'react-native';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import { useRoute, useNavigation } from '@react-navigation/native';
import Color from '../../assets/colors/Color';


const DetailInfo = () => {

    const route = useRoute();
    const { service } = route.params;

    const [headerTitle, setHeaderTitle] = useState('')
    const [contents, setContents] = useState('')

    useEffect(() => {
        setHeaderTitle(service == 'location' ? '위치기반 서비스 약관 동의' : (service == 'alram' ? '재떨이 알림 동의' : ''));
        setContents(service == 'location' ? `제 1 장 총칙

제 1 조 (목적)
본 약관은 재떨이가 운영하는 웹 사이트 (http://xxx.xxx.xxx)의 제반 서비스의 이용조건 및 절차에 관한 사항 및 기타 필요한 사항을 규정함을 목적으로 한다.
        
제 2 조 (용어의 정의)
본 약관에서 사용하는 용어는 다음과 같이 정의한다.
①회원 : 기본 회원 정보를 입력하였고, 회사와 서비스 이용계약을 체결하여 아이디를 부여받은 개인
②아이디(ID) : 회원식별과 회원의 서비스 이용을 위해 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합
③비밀번호(Password) : 회원이 통신상의 자신의 비밀을 보호하기 위해 선정한 문자와 숫자의 조합
④해지 : 회사 또는 회원에 의한 이용계약의 종료
        
제 3 조 (약관의 공시 및 효력과 변경)
①본 약관은 회원가입 화면에 게시하여 공시하며 회사는 사정변경 및 영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해 공시한다
②본 약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게 공시함으로써 효력을 발생한다.
        
제 4 조 (약관 외 준칙)
본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’, ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다.` : (service == 'alram' ? `제 1 장 총칙

제 1 조 (목적)
본 약관은 재떨이가 운영하는 웹 사이트 (http://xxx.xxx.xxx)의 제반 서비스의 이용조건 및 절차에 관한 사항 및 기타 필요한 사항을 규정함을 목적으로 한다.
        
제 2 조 (용어의 정의)
본 약관에서 사용하는 용어는 다음과 같이 정의한다.
①회원 : 기본 회원 정보를 입력하였고, 회사와 서비스 이용계약을 체결하여 아이디를 부여받은 개인
②아이디(ID) : 회원식별과 회원의 서비스 이용을 위해 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합
③비밀번호(Password) : 회원이 통신상의 자신의 비밀을 보호하기 위해 선정한 문자와 숫자의 조합
④해지 : 회사 또는 회원에 의한 이용계약의 종료
        
제 3 조 (약관의 공시 및 효력과 변경)
①본 약관은 회원가입 화면에 게시하여 공시하며 회사는 사정변경 및 영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해 공시한다
②본 약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게 공시함으로써 효력을 발생한다.
        
제 4 조 (약관 외 준칙)
본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’, ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다.` : ''))
    }, []);

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const dateFormatOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };

    const formattedDate = currentDateTime.toLocaleDateString(undefined, dateFormatOptions);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    const formattedTime = new Intl.DateTimeFormat(undefined, timeOptions).format(currentDateTime);
    const isMorning = currentDateTime.getHours() < 12;

    const navigation = useNavigation();

    const moveToTermsOfService = () => {
        if(service === 'location') {
            navigation.navigate("TermsOfService", { locationState: true, alramState: null })
        } else if(service === 'alram') {
            navigation.navigate("TermsOfService", { locationState: null, alramState: true })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header right={0} title={headerTitle} />
            <View style={styles.contents}>
                <View style={styles.dateNTime}>
                    <View style={styles.text}>
                        <Text>{formattedDate}</Text>
                        <Text>{formattedTime} {isMorning ? 'AM' : 'PM'}</Text>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <Text style={{ lineHeight: 23 }}>{contents}</Text>
                </ScrollView>
                <Button onPress={moveToTermsOfService} height={50} title='동의합니다' backgroundColor={Color.darkPurple} color={Color.white} margin='60 0 0 0'></Button>
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
        padding: 20,
        paddingTop: 56,
    },
    dateNTime: {
        width: '100%',
        alignItems: 'flex-end'
    },
    text: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        width: 162,
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
})

export default DetailInfo;