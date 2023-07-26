import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderHistory from "./pages/orderhistory/OrderHistory";
import Home from "./pages/home/Home";
import MyPage from "./pages/mypage/MyPage";
import Subscribe from "./pages/subscribe/Subscribe";
import Color from "./assets/colors/Color";
import { Ionicons } from "@expo/vector-icons";
import HomeIcon from "./assets/images/Home";
import OrderIcon from "./assets/images/Order";
import ProfileIcon from "./assets/images/Profile";
import { StatusBar } from "react-native";
import AfterSearch from "./pages/search/AfterSearch";
import BeforeSeach from "./pages/search/BeforeSearch";
import OrderDetail from "./pages/orderhistory/OrderDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
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
      await SplashScreen.hideAsync();
    }
    if (fontsLoaded) {
      hideSplashScreen();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <NavigationContainer>
        {/* NavigationContainer를 추가하여 Navigation 기능을 제공합니다. */}
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              borderWidth: 1,
              borderBottomWidth: 0,
              borderColor: "#E5E5E5",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: "white", // 배경을 투명하게 설정
              elevation: 0, // 안드로이드에서 기본 그림자를 제거
              position: "absolute",
              overflow: "hidden",
              zIndex: 10,
            },
            tabBarActiveTintColor: Color.darkPurple, // 탭이 활성화되었을 때 글자 색상
            tabBarInactiveTintColor: Color.gray, // 탭이 비활성화되었을 때 글자 색상
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="홈"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => <HomeIcon stroke={color} />,
            }}
          />
          <Tab.Screen
            name="검색"
            component={SearchStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
              ),
              tabBarVisible: false, // 검색 화면에서 바텀 네비게이션을 숨기기 위해 추가
            }}
          />
          <Tab.Screen
            name="주문내역"
            component={OrderHistoryStack}
            options={{
              tabBarIcon: ({ color, size }) => <OrderIcon stroke={color} />,
            }}
          />
          <Tab.Screen
            name="구독"
            component={SubscribeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="마이떨이"
            component={MyPage}
            options={{
              tabBarIcon: ({ color, size }) => <ProfileIcon stroke={color} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AfterSearch" component={AfterSearch} />
      <Stack.Screen name="BeforeSearch" component={BeforeSeach} />
    </Stack.Navigator>
  );
}

function OrderHistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
}

function SubscribeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Subscribe" component={Subscribe} />
    </Stack.Navigator>
  );
}
