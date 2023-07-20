import React from "react";
import { SvgXml } from "react-native-svg";

const Order = (props) => {
  return (
    <SvgXml xml={`
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.668 5.50016V7.71849C20.668 9.16683 19.7513 10.0835 18.303 10.0835H15.168V3.67599C15.168 2.65849 16.0021 1.8335 17.0196 1.8335C18.0188 1.84266 18.9355 2.24599 19.5955 2.90599C20.2555 3.57516 20.668 4.49183 20.668 5.50016Z" stroke="${props.stroke}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.33203 6.41683V19.2502C2.33203 20.011 3.1937 20.4418 3.7987 19.9835L5.3662 18.8102C5.73286 18.5352 6.2462 18.5718 6.5762 18.9018L8.09786 20.4327C8.45536 20.7902 9.04203 20.7902 9.39953 20.4327L10.9395 18.8927C11.2604 18.5718 11.7737 18.5352 12.1312 18.8102L13.6987 19.9835C14.3037 20.4327 15.1654 20.0018 15.1654 19.2502V3.66683C15.1654 2.6585 15.9904 1.8335 16.9987 1.8335H6.91536H5.9987C3.2487 1.8335 2.33203 3.47433 2.33203 5.50016V6.41683Z" stroke="${props.stroke}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.75 11.9258H11.5" stroke="${props.stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.75 8.25928H11.5" stroke="${props.stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.99609 11.9165H6.00433" stroke="${props.stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.99609 8.25H6.00433" stroke="${props.stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `} />
  )
};

export default Order;