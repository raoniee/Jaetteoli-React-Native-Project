import React from "react";
import { SvgXml } from "react-native-svg";

const TabBarHeart = (props) => {
  return (
    <SvgXml xml={`
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path d="M10.3001 3.201C10.4882 3.39314 10.7458 3.50143 11.0147 3.50143C11.2836 3.50143 11.5412 3.39314 11.7293 3.201C13.2444 1.6534 14.7922 1.0575 16.1298 1.03097C17.4765 1.00424 18.7033 1.55129 19.5921 2.45919C21.3284 4.23266 21.8498 7.50331 18.8659 10.5511L11.0147 18.5706L3.16352 10.5511C0.148929 7.47196 0.667233 4.1884 2.39872 2.41981C3.28579 1.51374 4.51383 0.969213 5.8668 1.00135C7.21141 1.03329 8.77059 1.63868 10.3001 3.201Z" stroke=${props.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `} />
  )
};

export default TabBarHeart;