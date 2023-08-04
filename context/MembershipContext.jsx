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
  const [getnumber, setGetnumber] = useState(false);
  const [validcheck, setValidCheck] = useState(false);
  const [userInfo, setUserInfo] = useState({
    agreements: [],
    name: "",
    birthday: "",
    phone: "",
    userid: "",
    userpw: "",
    useremail: "",
  });

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
    setChecked((prev) => !prev);
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

  // const handleIndividualAgree = (name) => {
  //   if (name === "selectiveTwo") {
  //     return;
  //   }
  //   setAgreements((prev) => ({
  //     ...prev,
  //     [name]: true,
  //   }));
  // };

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
      } else {
        setAllagree(false);
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

  // const takeRusult = (InfoType, result) => {
  //   setUserInfo((prev) => ({
  //     ...prev,
  //     [InfoType]: result,
  //   }));
  // };

  function takeRusult(event) {
    const { InfoType, text } = event;

    let processedData = text;

    // // 조건에 따른 value 변환
    // if (type === "text") {
    //   processedData = value.toUpperCase();
    // } else if (type === "number") {
    //   processedData = value * 2;
    // }
    // console.log(InfoType);
    // console.log(processedData);

    // 데이터 저장
    setUserInfo((prev) => ({
      ...prev,
      [InfoType]: processedData,
    }));
  }

  const handlePhoneBTN = () => {
    if (!getnumber) {
      if (
        userInfo.name.trim() === "" &&
        userInfo.birthday.trim() === "" &&
        userInfo.phone.trim() === ""
      ) {
        setValidCheck(false);
        alert("빈칸 확인해주세요");
        return;
      } else {
        setValidCheck(true);
      }
    }
  };

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
        getnumber,
        setGetnumber,
        handlePhoneBTN,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}
