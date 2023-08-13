// react-native, expo
import React, {useEffect, useState} from "react";
import {Animated, Modal, TouchableWithoutFeedback} from "react-native";
import styled from "styled-components/native";
// utils
import {totalHeight} from 'utils/dimensions'

export default function CustomModal({isVisible, onBackdropPress = () => {}, children}) {
    const opacity = useState(new Animated.Value(0))[0];
    const opacity2 = useState(new Animated.Value(0))[0];
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
            Animated.sequence([
                Animated.delay(isVisible ? 0 : 200),
                Animated.timing(opacity2, {
                    toValue: isVisible ? 1: 0,
                    duration: 100,
                    useNativeDriver: true,
                })
            ]),
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

    return display && (
        <Modal
            transparent>
            <TouchableWithoutFeedback onPress={onBackdropPress}>
                <CustomModalContainer style={{ opacity }} />
            </TouchableWithoutFeedback>
            <CustomModalWrapper style={{ transform: [{translateY}], opacity: opacity2 }}>
                {children}
            </CustomModalWrapper>
        </Modal>
    )
}

const CustomModalContainer = styled(Animated.View)`
  position: absolute;
  top:0;
  left:0;
  background: rgba(0, 0, 0, 0.50);
  width: 100%;
  height: ${totalHeight}px;
`


const CustomModalWrapper = styled(Animated.View)`
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