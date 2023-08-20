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
        setContents(service == 'location' ? `다음은 재떨이의 제품에 대하여 제공하고 있는 위치기반 서비스에 적용되는 이용조건입니다. 아래 이용조건은 이동통신사업자의 가입신청서에 포함된 위치정보 수집동의 및 모바일 단말기 이용조건과 함께 적용됩니다.

1. 서비스의 요금
        
재떨이는 별도의 특별한 정함이 없는 한, 재떨이의 위치기반 서비스를 이용자에게 추가 이용 요금 없이 제공합니다. 별도의 요금을 부과하고자 하는 경우, 재떨이는 이용자에게 사전에 요금 및 이용조건을 고지하고 동의를 받습니다. 재떨이의 위치기반 서비스는 Wi-Fi 무선인터넷을 사용하지 않고, 가입하신 이동통신사의 무선인터넷(3G 또는 Wibro 등)에 연결하여 사용하는 경우 별도의 무선 데이터 통화료가 부과됩니다. 무선 인터넷 사용료에 대한 자세한 안내는 가입하신 이동통신사에 문의하시기 바랍니다. 제3자 개발자들에 의하여 제공되는 프로덕트나 서비스의 경우, 해당 제3자 개발자들의 이용약관에 따른 서비스 요금을 제3자 개발자들이 부과할 수 있습니다.
        
2. 서비스의 내용
        
단말기 등의 위치를 토대로 위치나 경로를 보여주거나 찾을 수 있도록 하는 서비스 및 이를 기반으로 제공되는 응용 서비스 (이러한 위치와 경로를 전송, 공유, 저장, 게시할 수 있도록 하는 등의 기능 포함)
이용자의 위치나 경로를 이용한 검색∙콘텐츠 표시 서비스 및 이를 기반으로 한 응용서비스 (위치기반 검색어를 제안∙완성하거나, 위치나 경로를 토대로 한 검색결과, 광고, 게시물, 콘텐츠 기타 정보를 제공∙표시하는 등의 기능 포함)
게시물, 콘텐츠 기타 정보를 위치나 경로와 연결하여 생성, 전송, 저장, 정리, 제안, 게시, 기타 처리하거나, 이를 검색, 분류, 공유할 수 있도록 하는 등의 서비스 및 이를 기반으로 하는 응용서비스
주변 사람이나 사물의 근접을 탐지하여, 사람이나 사물간의 정보 전송, 공유 또는 위치 확인 등 다양한 기능을 가능케 하는 서비스 및 이를 기반으로 하는 응용서비스
단말기 등의 위치나 경로를 바탕으로 운동위치∙경로, 운동량 등 운동정보를 계산하거나 표시∙저장하고, 이용자가 이를 게시∙전송∙공유하거나 다른 콘텐츠 및 기타 정보와 연결할 수 있도록 하는 서비스 및 이를 기반으로 하는 응용서비스
이용자가 설정해 둔 위치에서 알림, 메시지, 기타 콘텐츠 게시 등 일정한 기능이 작동하도록 하는 서비스 및 이를 기반으로 한 응용서비스
기타 재떨이 또는 외부 개발자들이 개발한 위치기반 서비스
유용하고 의미 있는 경험을 제공하는 것은 재떨이 서비스의 핵심이며, 위치 정보는 이 과정에서 중요한 역할을 합니다. 사용자의 현재 및 기록된 위치 정보는 운전 경로 제공, 검색결과에 사용자 주변 장소 표시, 음식점이 붐비는 시간대 알려 주기, 맞춤설정 지도, 사용자가 방문한 장소를 기반으로 한 추천, 휴대전화 찾기, 실시간 출퇴근길 교통정보 업데이트, 유용한 광고 등 비롯하여 위의 다양한 재떨이 서비스에서 더욱 관련성 높고 유용한 정보를 제공하는 데 도움이 됩니다. 또한 이러한 위치 정보는 사용자에게 맞는 언어로 웹사이트를 표시하고 재떨이 서비스의 보안을 강화하는 등 핵심적인 제품 기능에도 도움이 됩니다.
        
재떨이 개인정보처리방침에는 사용자가 위치 정보를 포함한 재떨이 제품과 서비스를 사용할 때 재떨이에서 정보를 어떻게 활용하는지가 보다 자세하게 설명되어 있습니다.
        
재떨이는 위치기반 서비스의 세부적인 내용 및 종류에 대하여는 개별 이용약관을 정할 수 있으며, 이용자에게 해당 이용약관의 사본을 제공하고 해당 약관에 정한 바에 따라 동의를 받습니다. 외부개발자가 제공하는 프로덕트 및 서비스에 대하여는 해당 외부개발자의 이용약관을 따릅니다.
        
3. 위치정보
        
GPS기능이 탑재되었거나, Wi-Fi 기능이 탑재된 단말기 또는 Cell ID에 기반한 단말기 등을 비롯하여 위치정보수집기능이 부가된 재떨이 또는 제휴사의 제품은 주기적으로 이동통신 및 Wi-Fi 기지국에 대한 위치정보를 수집합니다. 이러한 정보는, 나중에 재떨이 Account 또는 다른 개인정보와 결합되어 위치기반 서비스에 이용되지 않는 한, 익명의 정보로 전화번호 등 이용자를 식별할 수 있는 정보를 포함하지 않습니다. 일부 서비스의 경우, 주기적으로 단말기를 통해 수집된 위치정보가 재떨이의 서버로 전송되어 재떨이의 위치정보의 정확도를 향상시키는데 사용됩니다.
        
4. 이용자의 권리
        
재떨이는 https://policies.재떨이.com/ 에서 볼 수 있는 개인정보처리방침에 정해진 바에 따라 위치정보를 수집, 이용 및 공유합니다. 이용자는 직접 위치기반 서비스의 설정을 변경하는 방식을 활용하여, 위치정보의 이용제공목적, 제공받는 자의 범위 및 위치기반 서비스의 일부에 대하여 동의를 유보할 수 있습니다. 또한, 이용자는 직접 단말기의 환경설정을 변경하는 방식을 통하여 언제든지 위치정보 이용제공에 대한 동의의 전부 또는 일부를 철회할 수 있습니다.
        
재떨이는 이용자의 동의 없이 위치정보를 제3자에게 제공하지 않습니다. 만약 위치정보의 보호 및 이용 등에 관한 법률(“위치정보법”) 또는 다른 한국의 법률에 의하여 위치정보를 제3자에게 제공하게 된다면, 한국의 관련 법률에 정한 바에 따라, 이용자에게 즉시 알려드립니다. 이용자는 위치정보법 또는 다른 한국의 법률에서 허용하는 바에 따라, 제3자에게 제공된 이유 및 내용에 대하여 열람, 고지, 오류 정정을 요구할 수 있습니다.
        
재떨이 Account에 로그인이 필요한 일부 위치기반 서비스와 관련하여, 이용자가 본 이용약관에 동의함으로써, 이용자는 만 14세 이상이라는 점에 대하여 재떨이에 대하여 확인하여 주고 보증하는 것으로 봅니다.
        
재떨이는 이용자가 요청하는 경우, 지체 없이 수집된 개인위치정보 및 그러한 개인위치정보와 연관된 관련 이용기록을 파기하기 위한 조치를 취합니다.
        
5. 위치정보 및 위치정보 수집∙이용∙제공사실 확인자료의 보유
        
이용자가 재떨이 계정에 로그인한 상태이고 웹 및 앱 활동 또는 위치기록 설정을 활성화하였거나 위치정보를 저장하도록 동의한 경우, 이용자의 위치정보는 재떨이 의 서비스에 저장 및 사용될 수 있습니다. 재떨이 은 이를 통하여 이용자에게 보다 개인화된 경험 등을 제공할 수 있습니다. 이용자는 myactivity.재떨이.com 에서 웹 및 앱 활동 및 위치기록 상 이용자의 활동과 관련된 정보를 수동으로 삭제하거나, 자동 삭제 옵션(3 개월/18 개월/36 개월)을 선택하거나, 정보가 더 이상 저장되지 않도록 하거나, 기타 설정을 할 수 있습니다. 재떨이 은 신규로 가입한 이용자의 경우 웹 및 앱 활동 및 위치기록의 기본 보관 기간을 모두 18 개월로 설정해 두고 있습니다.
        
재떨이는 이용자에 대한 위치정보의 수집∙이용∙제공사실을 위치정보시스템에 자동으로 기록, 보존하며, 6개월 이상 보관합니다. 이용자가 개인위치정보의 수집∙ 이용 또는 제공에 대한 동의를 전부 또는 일부 철회한 경우에는 법률에 따라 보존해야 하는 경우를 제외하고 지체 없이 위치정보 수집∙이용∙제공과 관련한 데이터(동의의 일부 철회의 경우에는 철회와 관련된 부분)를 파기합니다.
        
6. 법률준수
        
이용자는 재떨이의 위치정보사업 및 위치기반 서비스제공과 관련하여 위치정보법 제15조 내지 제26조의 규정을 위반한 행위로 손해를 입은 경우에 위치정보법 제27조에 따라 손해배상을 청구할 수 있습니다.
        
8. 사업자 정보 및 위치정보관리책임자
        
위치기반 서비스와 관련하여 문제사항이 있을 경우에는 아래 구글코리아 유한회사로 연락주시기 바랍니다.
        
재떨이
전화번호: 010-9778-8973` : (service == 'alram' ? `제 1 장 총칙

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
본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’, ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다.` : '')))
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