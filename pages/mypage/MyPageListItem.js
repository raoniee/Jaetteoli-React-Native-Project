import { StyleSheet, View, Text } from 'react-native';
import Color from '../../assets/colors/Color';
import ArrowRight from '../../assets/images/ArrowRight';

const MyPageListItem = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.name}</Text>
            <ArrowRight stroke={Color.lightGray}></ArrowRight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '93%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        fontFamily:'Pretendard-Regular',
        lineHeight: 35,
        marginLeft: 10,
    },
})

export default MyPageListItem;