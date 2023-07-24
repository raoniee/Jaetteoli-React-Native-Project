import React from "react";
import { SvgXml } from "react-native-svg";

const ArrowLeft = (props) => {
  return (
    <SvgXml xml={`
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.624 6L9.68654 11.326C9.58845 11.4112 9.51004 11.5152 9.45638 11.6313C9.40272 11.7474 9.375 11.873 9.375 12C9.375 12.127 9.40272 12.2526 9.45638 12.3687C9.51004 12.4848 9.58845 12.5888 9.68654 12.674L15.624 18" stroke=${props.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `} />
  )
};

export default ArrowLeft;