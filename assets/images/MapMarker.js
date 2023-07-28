import { SvgXml } from "react-native-svg";

const MapMarker = (props) => {
  return (
    <SvgXml
      xml={`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 49" fill="none">
  <path d="M20 47.9997C22.6752 47.9995 23.3529 41.2855 26.7059 39.0474C33.1615 34.7383 39 27.857 39 19.4642C39 8.98384 30.5861 1.05445 20.1189 1.00003C9.44447 0.944537 1 8.77627 1 19.4642C1 27.2975 3.71981 32.6566 13.2941 39.0474C16.6471 41.2855 17.3248 48 20 47.9997Z" fill="white" stroke="#604EF8" stroke-width="2"/>
</svg>
        `}
    />
  );
};
export default MapMarker;
