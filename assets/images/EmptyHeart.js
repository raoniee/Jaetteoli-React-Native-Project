import { SvgXml } from "react-native-svg";

const EmptyHeart = () => {
  return (
    <SvgXml
      xml={`
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
  <path d="M11.514 3.87636C5.08972 -2.65436 -3.08667 5.65746 3.33764 12.1882L11.514 20.5L19.6904 12.1882C26.0657 5.70733 17.8893 -2.60449 11.514 3.87636Z" stroke="#8377E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        `}
    />
  );
};

export default EmptyHeart;
