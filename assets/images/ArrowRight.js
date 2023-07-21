import React from "react";
import { SvgXml } from "react-native-svg";

const ArrowRight = (props) => {
  return (
    <SvgXml xml={`
    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17.186L14.7 12.1385C14.7942 12.0577 14.8694 11.9592 14.921 11.8492C14.9725 11.7391 14.9991 11.6201 14.9991 11.4998C14.9991 11.3794 14.9725 11.2604 14.921 11.1503C14.8694 11.0403 14.7942 10.9418 14.7 10.861L9 5.81348" stroke=${props.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `} />
  )
};

export default ArrowRight;