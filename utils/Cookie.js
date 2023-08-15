import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";

//storeData
export const setToken = async (jwt) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, jwt);
  } catch (e) {
    // saving error
    console.error(e.message);
  }
};

//getData
export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY);
    return value;
  } catch (e) {
    // error reading value
    console.error(e.message);
  }
};

//removeData
export const removeToken = async (TOKEN_KEY) => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error(e.message);
  }
};

const USERID_KEY = "userid";

//storeData
export const setUserID = async (uid) => {
  try {
    await AsyncStorage.setItem(USERID_KEY, uid);
  } catch (e) {
    // saving error
    console.error(e.message);
  }
};

//getData
export const getUserID = async () => {
  try {
    const value = await AsyncStorage.getItem(USERID_KEY);
    return value;
  } catch (e) {
    // error reading value
    console.error(e.message);
  }
};

//removeData
export const removeUserID = async (USERID_KEY) => {
  try {
    await AsyncStorage.removeItem(USERID_KEY);
  } catch (e) {
    console.error(e.message);
  }
};
