import { SvgXml } from "react-native-svg";

const SearchImg = () => {
  return (
    <SvgXml
      xml={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19 19L15 15M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#777777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`}
    />
  );
};

export default SearchImg;
