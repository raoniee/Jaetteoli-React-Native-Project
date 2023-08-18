import { StyleSheet, ImageBackground, View, Text } from "react-native";
import Button from "../../components/common/Button";
import image from "../../assets/images/home_bg.png";
import Color from "../../assets/colors/Color";
import { NavigationContainer } from "@react-navigation/native"; // 네비게이션 컨테이너
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Stack 네비게이션
import { getToken } from "../../utils/Cookie";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {

  const [jwt, setJwt] = useState(""); // 토큰 상태 추가

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      console.log(fetchedToken)
      setJwt(fetchedToken);
    };

    fetchToken();
  }, []);

  const helloHandler = () => {
    if (jwt) {
      navigation.navigate("MainTabs");
    } else {
      navigation.navigate("LoginStart");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.imageDarker}>
          <View style={styles.textBtnWrapper}>
            <Text style={styles.text}>
              일상의 고민은{"\n"}여기에,{"\n"}재떨이
            </Text>
            <View style={styles.button}>
              <Button
                title="재떨이 시작하기"
                backgroundColor={Color.white}
                color={Color.darkPurple}
                height={62}
                onPress={helloHandler}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  imageDarker: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    opacity: "30%",
    justifyContent: "center",
  },
  textBtnWrapper: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontFamily: "Pretendard-Bold",
    color: Color.white,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
    width: "100%",
  },
  button: {
    width: "100%",
    position: "absolute",
    bottom: 150,
  },
});

export default Home;
