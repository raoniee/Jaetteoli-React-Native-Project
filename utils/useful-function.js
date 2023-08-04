// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 휴대폰전화번호 형식인지 확인 (true 혹은 false 반환)
export const validatePhoneNumber = (number) => {
  return /^\d{3}\d{4}\d{4}$/.test(number);
};

// 생년월일 형식인지 확인 (true 혹은 false 반환)
export const validateBirthDay = (birthday) => {
  return /^\d{4}\.\d{2}\.\d{2}$/.test(birthday);
};

// 아이디 형식인지 확인 (true 혹은 false 반환)
export const validateID = (id) => {
  return /^[a-zA-z0-9]{4,20}$/.test(id);
};

// 비밀번호 형식인지 확인 (true 혹은 false 반환)
export const validatePassWord = (pw) => {
  return /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/.test(pw);
};

// 비밀번호 형식인지 확인 (true 혹은 false 반환)
export const validateName = (name) => {
  const length = name.length >= 2;
  const kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(name);
  if (length && kor) {
    return true;
  } else {
    return false;
  }
};
