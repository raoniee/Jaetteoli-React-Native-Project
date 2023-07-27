import { SafeAreaView, Text, View } from "react-native";
import Header from "../../components/common/Header";

const MapFind = ({route}) => {

    const {jibun, road} = route.params

    return(
        <SafeAreaView>
            <View>
                <Header left={1} title='테스트 화면'/>
                <Text>{jibun}</Text>
                <Text>{road}</Text>
            </View>
        </SafeAreaView>
    )
}

export default MapFind;