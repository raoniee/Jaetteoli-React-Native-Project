import { createContext, useState } from "react";

export const AgreeContext = createContext();

export function AgreeProvider({ children }) {
  const [allagree, setAllagree] = useState(false); //전체동의
  const [agreements, setAgreements] = useState({
    //개별동의 state
    mandatoryOne: false,
    mandatoryTwo: false,
    selectiveOne: false,
    isSns: false,
    isEmail: false,
    isPhone: false,
  });

  const handleAllagree = (value) => {
    console.log(value);
    setAllagree((prev) => !prev);
  };

  return (
    <AgreeContext.Provider value={{ allagree, handleAllagree }}>
      {children}
    </AgreeContext.Provider>
  );
}
