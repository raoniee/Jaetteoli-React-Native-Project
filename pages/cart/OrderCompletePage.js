import {Animated, Dimensions, SafeAreaView} from "react-native";
import Header from "../../components/common/Header";
import Constants from "expo-constants";
import styled from "styled-components/native";
import {useEffect, useRef} from "react";
import { Svg, Path, Circle } from 'react-native-svg';



// 안드로이드
//const statusBarHeight = Constants.statusBarHeight;
//const windowHeight = Dimensions.get('window').height;


// IOS
const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = windowHeight - statusBarHeight;

export default function OrderCompletePage() {

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <Header left={2} right={0} backgroundColor='white'/>
            <Container>
                    <CheckMarkAnimation />
                    <CheckText>
                        주문이 완료되었습니다!
                    </CheckText>
            </Container>
        </SafeAreaView>
    )
}

const Container = styled.View`
  width: 100%;
  height: ${totalHeight-190}px;
  margin-bottom: 142px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
`

const CheckText = styled.Text`
  height: 35px;
  color: #555;
  text-align: center;
  font-family: "Pretendard-Medium";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px; /* 145.833% */
`

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function CheckMarkAnimation() {
    const checkAnim = useRef(new Animated.Value(70)).current;
    const circleAnim = useRef(new Animated.Value(314)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(checkAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.timing(circleAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    const strokeCheckOffset = checkAnim.interpolate({
        inputRange: [0, 70],
        outputRange: [0, 70]
    });

    const strokeCircleOffset = circleAnim.interpolate({
        inputRange: [0, 314],
        outputRange: [0, 314]
    });

    return (
        <Svg width={106} height={106} viewBox="0 0 106 106" fill="none">
            <AnimatedPath
                d="M39.75 53L48.5833 61.8333L66.25 44.1667"
                stroke="#604EF8"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={70}
                strokeDashoffset={strokeCheckOffset}
            />
            <AnimatedCircle
                cx={53}
                cy={53}
                r={40}
                stroke="#604EF8"
                strokeWidth={5}
                strokeDasharray={314}
                strokeDashoffset={strokeCircleOffset}
            />
        </Svg>
    );
}