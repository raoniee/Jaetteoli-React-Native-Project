import React, {useEffect, useState} from "react";
import {Animated, Dimensions, TouchableWithoutFeedback} from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";

// 안드로이드
//const statusBarHeight = Constants.statusBarHeight;
//const windowHeight = Dimensions.get('window').height;


// IOS
const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height

const totalHeight = windowHeight;

export default function CustomModal({isVisible, onBackdropPress = () => {}, children}) {
    const opacity = useState(new Animated.Value(0))[0];
    const translateY = useState(new Animated.Value(totalHeight * 0.1))[0]
    const [ display, setDisplay ] = useState(isVisible);

    useEffect(() => {
        if (isVisible)
            setDisplay(isVisible)
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: isVisible ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: isVisible ? 0 : totalHeight * 0.1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (!isVisible && display)
                setDisplay(false)
        })
    }, [isVisible])
    return (
        <>
            {display &&
                <TouchableWithoutFeedback onPress={onBackdropPress}>
                    <SetPickupTimeContainer style={{ opacity }} >
                        <TouchableWithoutFeedback>
                            <SetPickupTimeWrapper style={{ transform: [{translateY}] }}>
                                {children}
                            </SetPickupTimeWrapper>
                        </TouchableWithoutFeedback>
                    </SetPickupTimeContainer>
                </TouchableWithoutFeedback>
            }

        </>
    )
}

const SetPickupTimeContainer = styled(Animated.View)`
  position: absolute;
  top:0;
  left:0;
  background: rgba(0, 0, 0, 0.50);
  width: 100%;
  height: ${totalHeight}px;
`

const SetPickupTimeWrapper = styled(Animated.View)`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: white;
  border-radius: 30px 30px 0 0;
`