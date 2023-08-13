// react-native, expo
import React from "react";
import {Path, Svg} from "react-native-svg";
// styles
import styled from "styled-components/native";

export default function CustomMarker() {

    return (
        <CustomMarkerPoint>
            <CustomMarkerSection>
                <Svg width="40" height="49" viewBox="0 0 40 49" fill="none">
                    <Path d="M20 47.9997C22.6752 47.9995 23.3529 41.2855 26.7059 39.0474C33.1615 34.7383 39 27.857 39 19.4642C39 8.98384 30.5861 1.05445 20.1189 1.00003C9.44447 0.944537 1 8.77627 1 19.4642C1 27.2975 3.71981 32.6566 13.2941 39.0474C16.6471 41.2855 17.3248 48 20 47.9997Z"
                          fill="white"
                          stroke="#604EF8"
                          strokeWidth="2"/>
                </Svg>
            </CustomMarkerSection>
        </CustomMarkerPoint>
    )
}


const CustomMarkerPoint = styled.View`
  position: relative;
  width: 100px;
  height: 100px;
`

const CustomMarkerSection = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  position: absolute;
  bottom: 0;
  left: 30px;
`