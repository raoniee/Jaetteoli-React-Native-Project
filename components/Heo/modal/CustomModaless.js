// react-native, expo
import React, {useEffect, useRef} from "react";
import styled from "styled-components/native";
import {Animated} from "react-native";
// utils
import {totalHeight} from 'utils/dimensions'


export default function CustomModaless({isVisible, setVisible, text}) {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isVisible === true) {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true, // false로 설정
                }).start(() => {
                    setVisible()
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 0,
                        useNativeDriver: true
                    }).start()
                });
            }, 1000);
        }
    }, [isVisible])

    return isVisible &&
        (
            <BasketAddView style={{opacity: fadeAnim}}>
                <BasketAddText>
                    {text}
                </BasketAddText>
            </BasketAddView>
        )
}

const BasketAddView = styled(Animated.View)`
  position: absolute;
  top: ${totalHeight/2}px;
  left: 50%;
  margin-top: -23.5px;
  margin-left: -126.5px;
  display: flex;
  height: 47px;
  width: 253px;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.40);
`

const BasketAddText = styled.Text`
  color: #FFF;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`