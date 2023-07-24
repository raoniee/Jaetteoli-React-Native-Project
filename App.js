import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Nav from "./components/common/Nav";
import Home from "./components/home/Home";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import WriteReview from './components/review/WriteReview';
import ManageReview from './components/mypage/ManageReview';
import MyPage from './components/mypage/MyPage';
import ModifyMyInfo from './components/mypage/ModifyMyInfo';

export default function App() {
  let [fontsLoaded] = useFonts({
    "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.ttf"), // 100
    "Pretendard-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.ttf"), // 200
    "Pretendard-Light": require("./assets/fonts/Pretendard-Light.ttf"), // 300
    "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.ttf"), //400
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.ttf"), // 500
    "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.ttf"), // 600
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.ttf"), // 700
    "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.ttf"), // 800
    "Pretendard-Black": require("./assets/fonts/Pretendard-Black.ttf"), //900
    Pretendard: require("./assets/fonts/Pretendard-Regular.ttf"), //400
  });

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync(); //splash screen 닫기
    }
    if (fontsLoaded) {
      //font 로드완료
      hideSplashScreen();
    }
  }, [fontsLoaded]); //fontsLoaded 상태 변경 마다 실행.

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
