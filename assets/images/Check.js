import React from "react";
import { SvgXml } from "react-native-svg";

const Check = (props) => {
  return (
    <SvgXml
      xml={`
      <svg xmlns="http://www.w3.org/2000/svg" width="${props.width}" height="${props.height}" viewBox="0 0 24 24" fill="none">
        <path d="M5 11.917L9.724 16.5L19 7.5" stroke="${props.stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `}
    />
  );
};

export default Check;
