import { SvgXml } from "react-native-svg";

const RankUp = () => {
  return (
    <SvgXml
      xml={`
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
  <path d="M8.25364 5.49977C8.01923 5.26543 7.70135 5.13379 7.36989 5.13379C7.03843 5.13379 6.72055 5.26543 6.48614 5.49977L2.99489 8.99102C2.82013 9.16584 2.70112 9.38854 2.65291 9.63098C2.6047 9.87342 2.62945 10.1247 2.72404 10.3531C2.81863 10.5815 2.9788 10.7767 3.18432 10.914C3.38983 11.0514 3.63145 11.1247 3.87864 11.1248H10.8611C11.1083 11.1247 11.35 11.0514 11.5555 10.914C11.761 10.7767 11.9212 10.5815 12.0157 10.3531C12.1103 10.1247 12.1351 9.87342 12.0869 9.63098C12.0387 9.38854 11.9197 9.16584 11.7449 8.99102L8.25364 5.49977Z" fill="#604EF8"/>
</svg>
        `}
    />
  );
};

export default RankUp;
