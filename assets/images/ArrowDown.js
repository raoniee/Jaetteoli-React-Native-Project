import React from "react";
import { SvgXml } from "react-native-svg";

const ArrowDown = (props) => {
  return (
    <SvgXml
      xml={`
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M8.5 10.1046L12.5 13.8954L16.5 10.1046" stroke="#777777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `}
    />
  );
};

export default ArrowDown;
