import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import Button from '../common/Button';
import image from '../../assets/images/home_bg.png';
import Color from '../../assets/colors/Color';

const Home = () => {
    return(
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.imageDarker}>
                    <View style={styles.textBtnWrapper}>
                        <Text style={styles.text}>일상의 고민은{'\n'}여기에,{'\n'}재떨이</Text>
                        <Button title='재떨이 시작하기' backgroundColor={Color.white} color={Color.darkPurple} margin='0 0 150 0' height={62}/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    imageDarker: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        opacity: '30%',
        justifyContent: 'flex-end',
    },
    textBtnWrapper: {
        flex: 0.5,
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily:'Pretendard-Bold',
        color: Color.white,
        fontSize: 28,
        lineHeight: 36,
        letterSpacing: -0.3,
        width: '100%',
        paddingLeft: 20,
    },
});

export default Home;