import { StyleSheet, View, Text } from 'react-native'
import colors from '../../assets/colors/Color'
import HomeIcon from '../../assets/images/HomeIcon'
import Search from '../../assets/images/Search'
import Order from '../../assets/images/Order'
import Subscribe from '../../assets/images/Subscribe'
import MyPage from '../../assets/images/MyPage'

const Nav = () => {
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.navItem}>
                    <HomeIcon stroke={colors.gray}></HomeIcon>
                    <Text style={styles.navItemText}>홈</Text>
                </View>
                <View style={styles.navItem}>
                    <Search stroke={colors.gray}></Search>
                    <Text style={styles.navItemText}>검색</Text>
                </View>
                <View style={styles.navItem}>
                    <Order stroke={colors.gray}></Order>
                    <Text style={styles.navItemText}>주문내역</Text>
                </View>
                <View style={styles.navItem}>
                    <Subscribe stroke={colors.gray}></Subscribe>
                    <Text style={styles.navItemText}>찜</Text>
                </View>
                <View style={styles.navItem}>
                    <MyPage stroke={colors.gray}></MyPage>
                    <Text style={styles.navItemText}>마이떨이</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 92,
        borderRadius: '30 30 0 0',
        backgroundColor: colors.white,
        shadowColor: colors.black,
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
    navItemText: {
        paddingTop: 5,
        color: colors.gray,
        fontSize: 11,
        fontWeight: 600,
    }
});

export default Nav;