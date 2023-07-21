import React from "react";
import { SvgXml } from "react-native-svg";

const Review = (props) => {
  return (
    <SvgXml xml={`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8H12M7 11H9M15 8H17M12 11H18M20 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V14C3 14.2652 3.10536 14.5196 3.29289 14.7071C3.48043 14.8946 3.73478 15 4 15H7V20L12 15H20C20.2652 15 20.5196 14.8946 20.7071 14.7071C20.8946 14.5196 21 14.2652 21 14V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4Z" stroke=${props.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `} />
  )
};

export default Review;