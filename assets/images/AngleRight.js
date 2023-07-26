import React from "react";
import { SvgXml } from "react-native-svg";

const AngleRight = (props) => {
  return (
    <SvgXml
      xml={`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9 17.686L14.7 12.6385C14.7942 12.5577 14.8694 12.4592 14.921 12.3492C14.9725 12.2391 14.9991 12.1201 14.9991 11.9998C14.9991 11.8794 14.9725 11.7604 14.921 11.6503C14.8694 11.5403 14.7942 11.4418 14.7 11.361L9 6.31348" stroke="#777777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}
    />
  );
};

export default AngleRight;
