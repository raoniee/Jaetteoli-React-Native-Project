import { StyleSheet, View, Text } from 'react-native'
import Color from '../../assets/colors/Color'
import Home from '../../assets/images/Home'
import Search from '../../assets/images/Search'
import Order from '../../assets/images/Order'
import Subscribe from '../../assets/images/Subscribe'
import MyPage from '../../assets/images/MyPage'

const Nav = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.navItem}>
                    <Home stroke={props.status === 'home' ? Color.darkPurple : Color.gray}></Home>
                    <Text style={{
                        paddingTop: 5,
                        color: props.status === 'home' ? Color.darkPurple : Color.gray,
                        fontSize: 11,
                        fontWeight: 600,
                    }}>홈</Text>
                </View>
                <View style={styles.navItem}>
                    <Search stroke={props.status === 'search' ? Color.darkPurple : Color.gray}></Search>
                    <Text style={{
                        paddingTop: 5,
                        color: props.status === 'search' ? Color.darkPurple : Color.gray,
                        fontSize: 11,
                        fontWeight: 600,
                    }}>검색</Text>
                </View>
                <View style={styles.navItem}>
                    <Order stroke={props.status === 'order' ? Color.darkPurple : Color.gray}></Order>
                    <Text style={{
                        paddingTop: 5,
                        color: props.status === 'order' ? Color.darkPurple : Color.gray,
                        fontSize: 11,
                        fontWeight: 600,
                    }}>주문내역</Text>
                </View>
                <View style={styles.navItem}>
                    <Subscribe stroke={props.status === 'subscribe' ? Color.darkPurple : Color.gray}></Subscribe>
                    <Text style={{
                        paddingTop: 5,
                        color: props.status === 'subscribe' ? Color.darkPurple : Color.gray,
                        fontSize: 11,
                        fontWeight: 600,
                    }}>찜</Text>
                </View>
                <View style={styles.navItem}>
                    <MyPage stroke={props.status === 'myPage' ? Color.darkPurple : Color.gray}></MyPage>
                    <Text style={{
                        paddingTop: 5,
                        color: props.status === 'myPage' ? Color.darkPurple : Color.gray,
                        fontSize: 11,
                        fontWeight: 600,
                    }}>마이떨이</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 92,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Color.white,
        shadowColor: Color.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        bottom: 0
    },
    nav: {
        width: '100%',
        height: '100%',
        paddingTop: 12,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navItem: {
        alignItems: 'center',
    },
});

export default Nav;