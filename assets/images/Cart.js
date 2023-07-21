import React from "react";
import { SvgXml } from "react-native-svg";

const Cart = (props) => {
  return (
    <SvgXml xml={`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17C7.89543 17 7 17.8954 7 19C7 20.1046 7.89543 21 9 21C10.1046 21 11 20.1046 11 19C11 17.8954 10.1046 17 9 17ZM9 17H17M9 17L8 13M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM8 13H18L20 6H6M8 13L6 6M6 6L5.208 3H4" stroke=${props.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `} />
  )
};

export default Cart;