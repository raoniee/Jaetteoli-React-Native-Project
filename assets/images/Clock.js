import { SvgXml } from "react-native-svg";

const Clock = () => {
  return (
    <SvgXml
      xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12L15.276 15.276M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#604EF8" stroke-width="2" stroke-linejoin="round"/>
          </svg>`}
    />
  );
};

export default Clock;
