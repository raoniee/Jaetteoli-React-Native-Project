import { SvgXml } from "react-native-svg";

const Graph = () => {
  return (
    <SvgXml
      xml={`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 5V19H20M7 14L10 10L14 14L19 9M19 9H15.793M19 9V12.207" stroke="#604EF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        `}
    />
  );
};

export default Graph;
