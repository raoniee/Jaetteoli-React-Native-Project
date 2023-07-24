import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Nav from "./components/common/Nav";
import Home from "./components/home/Home";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Pretendard-Black": require("./assets/fonts/Pretendard-Black.ttf"),
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("./assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.ttf"),
    "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.ttf"),
    Pretendard: require("./assets/fonts/Pretendard-Regular.ttf"),
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
      <Home></Home>
      <Nav></Nav>
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
