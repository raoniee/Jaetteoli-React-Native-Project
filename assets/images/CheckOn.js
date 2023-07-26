import React from "react";
import { SvgXml } from "react-native-svg";

const CheckOn = (props) => {
  return (
    <SvgXml
      xml={`
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="12"
  viewBox="0 0 16 12"
  fill="none"
>
  <path
    d="M1 5.917L5.724 10.5L15 1.5"
    stroke="#604EF8"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`}
    />
  );
};

export default CheckOn;
