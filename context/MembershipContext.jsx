import { createContext, useEffect, useState } from "react";

export const MembershipContext = createContext();

export function MembershipProvider({ children }) {
  const [isChecked, setChecked] = useState(false);
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
  const [userInfo, setUserInfo] = useState({
    name: "",
    birthday: "",
    phone: "",
    userid: "",
    userpw: "",
    useremail: "",
    certificationNum: "",
  });

  console.log(userInfo);
  console.log(agreements);

  const [twoState, setTwoState] = useState(
    agreements.isSns && agreements.isEmail && agreements.isPhone
  );

  const changeCheck = () => {
    setChecked((prev) => !prev);
    handleAllagree(!isChecked);
  };

  const stateHandler = (name) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const descHandler = (name) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleAllagree = (isChecked) => {
    setAgreements((prev) =>
      Object.keys(prev).reduce((newAgreements, agreementKey) => {
        newAgreements[agreementKey] = isChecked;
        return newAgreements;
      }, {})
    );
    setAllagree(isChecked);
  };

  useEffect(() => {
    if (agreements.isSns && agreements.isPhone && agreements.isEmail) {
      setTwoState(true);
      if (
        agreements.mandatoryOne &&
        agreements.mandatoryTwo &&
        agreements.selectiveOne &&
        twoState
      ) {
        setAllagree(true);
        setChecked(true);
      } else {
        setAllagree(false);
        setChecked(false);
      }
    } else {
      setTwoState(false);
      setAllagree(false);
    }
  }, [agreements, twoState, allagree]);

  const twoAllChangeHandler = (type) => {
    if (type === "all") {
      setAgreements((prev) => ({
        ...prev,
        isSns: true,
        isEmail: true,
        isPhone: true,
      }));
    } else {
      setAgreements((prev) => ({
        ...prev,
        isSns: false,
        isEmail: false,
        isPhone: false,
      }));
    }
  };

  const takeCertificationNum = (result) => {
    setUserInfo((prev) => ({
      ...prev,
      certificationNum: result,
    }));
  };

  function takeRusult(event) {
    const { InfoType, text } = event;

    let processedData = text;

    // 데이터 저장
    setUserInfo((prev) => ({
      ...prev,
      [InfoType]: processedData,
    }));
  }

  return (
    <MembershipContext.Provider
      value={{
        isChecked,
        changeCheck,
        allagree,
        agreements,
        setAgreements,
        stateHandler,
        handleAllagree,
        twoAllChangeHandler,
        takeRusult,
        userInfo,
        setUserInfo,
        takeCertificationNum,
        descHandler,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}
