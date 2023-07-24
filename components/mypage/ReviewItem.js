import { StyleSheet, View, Text, Image } from 'react-native';
import Color from '../../assets/colors/Color';
import ArrowRight from '../../assets/images/ArrowRight';
import Star from '../../assets/images/Star';
import profile from '../../assets/images/profile.png';

const ReviewItem = (props) => {
    const getDateDifference = (dateString) => {
        const currentDate = new Date();
        const targetDate = new Date(dateString);

        const yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
        const monthDiff = currentDate.getMonth() - targetDate.getMonth();
        const dayDiff = currentDate.getDate() - targetDate.getDate();

        if (yearDiff > 0) {
            return `${yearDiff}년 전`;
        } else if (monthDiff > 0) {
            return `${monthDiff}개월 전`;
        } else if (dayDiff > 0) {
            return `${dayDiff}일 전`;
        } else if (dayDiff === 0) {
            return '오늘';
        } else {
            return;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.reviewWrapper}>
                <View style={styles.store}>
                    <Text style={styles.storeText}>{props.review.storeName}</Text>
                    <ArrowRight stroke={Color.black}></ArrowRight>
                </View>
                <View>
                    <View style={styles.star}>
                        <View style={{ width: 5 * 15, flexDirection: 'row', overflow: 'hidden', position: 'absolute' }}>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                            <Star fill={Color.lightGray}></Star>
                        </View>
                        <View style={{ width: props.review.star * 15, flexDirection: 'row', overflow: 'hidden' }}>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                            <Star fill={Color.yellow}></Star>
                        </View>
                        <Text style={styles.date}>{getDateDifference(props.review.date)}</Text>
                    </View>
                </View>
                {props.review.reviewImg && <Image source={props.review.reviewImg} style={styles.reviewImg}></Image>}
                <Text style={styles.contents}>{props.review.contents}</Text>
            </View>
            <Text style={styles.delete}>삭제하기</Text>
            <View style={styles.menuWrapper}>
                {props.review.orderMenu.map((menu, index) => (
                    <View style={styles.menu} key={index}><Text style={styles.menuText}>{menu.menuName}</Text></View>
                ))}
            </View>
            {props.review.comment && <View style={styles.comment}>
                <View style={styles.profile}>
                    <Image source={profile} style={styles.profileImg}></Image>
                    <Text style={styles.profileText}>사장님</Text>
                </View>
                <Text style={styles.commentText}>{props.review.comment}</Text>
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center'
    },
    reviewWrapper: {
    },
    store: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeText: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 35,
    },
    star: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35
    },
    date: {
        position: 'absolute', left: 5 * 15 + 11,
        color: Color.lightGray,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 35
    },
    contents: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 35,
        marginBottom: 10,
    },
    delete: {
        position: 'absolute',
        top: 20,
        right: 16,
        color: Color.lightGray,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 35
    },
    reviewImg: {
        width: 360,
        height: 360,
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 10,
    },
    menuWrapper: {
        flexDirection: 'row'
    },
    menu: {
        backgroundColor: Color.lightPurple,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 18,
        marginRight: 5,
    },
    menuText: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 20,
    },
    comment: {
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: Color.brightGray,
        borderRadius: 18,
        marginTop: 20,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImg: {
        width: 43,
        height: 43,
    },
    profileText: {
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 35,
        marginLeft: 15,
    },
    commentText: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 35
    }
})

export default ReviewItem