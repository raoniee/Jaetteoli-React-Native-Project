import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { orderDetailData } from "../../components/orderhistory/dummy/dummy";
import ArrowRight from "../../assets/images/ArrowRight";
import Color from "../../assets/colors/Color";
import Phone from "../../assets/images/Phone";
import Store from "../../assets/images/Store";
import ArrowLineRight from "../../assets/images/ArrowLineRight";
import { formatPriceWithCurrency } from "../../components/common/format/format";
import Header from "../../components/common/Header";
import { useNavigation } from "@react-navigation/native";

const OrderDetail = () => {
  const navigation = useNavigation();
  const [detailData, setDetailData] = useState([]);
  useEffect(() => {
    console.log("주문 상세 조회 api 호출");
    setDetailData(orderDetailData);
  }, []);

  const moveToDetailStore = () => {
    navigation.navigate("StoreDetailPage");
  };

  const line = <View style={styles.line}></View>;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={1}
        right={1}
        backgroundColor="white"
        title="주문상세"
        color={Color.lightGray}
      />
      <ScrollView style={styles.bottomMargin}>
        <View style={styles.storeOuterContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{detailData.date}</Text>
          </View>
          <View style={styles.storeInnerContainer}>
            <View>
              <Pressable
                android_ripple={{ color: Color.lightPurple }}
                style={({ pressed }) => pressed && styles.pressedItem}
              >
                <View style={styles.storeContainer}>
                  <Text style={styles.nameText}>{detailData.name}</Text>
                  <ArrowRight stroke="#2F2F38" />
                </View>
              </Pressable>
              <Text style={styles.describeText}>{detailData.describe}</Text>
            </View>
            <View style={styles.storeRightContainer}>
              <Pressable
                android_ripple={{ color: Color.lightPurple }}
                style={({ pressed }) => pressed && styles.pressedItem}
              >
                <View style={styles.phoneContainer}>
                  <Phone stroke={Color.purple} />
                  <Text style={styles.phoneText}>가게전화</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={moveToDetailStore}
                android_ripple={{ color: Color.lightPurple }}
                style={({ pressed }) => pressed && styles.pressedItem}
              >
                <View style={styles.storeLookContainer}>
                  <Store stroke={Color.purple} />
                  <Text style={[styles.storeText]}>가게보기</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        {line}
        <View style={styles.menuOuterContainer}>
          <Text style={styles.menuTitle}>메뉴</Text>
          <FlatList
            data={detailData["menu"]}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Text style={styles.menuCountText}>
                    {item.name} {item.count}개
                  </Text>
                  <View style={styles.priceOuterContainer}>
                    <View style={styles.originPriceContainer}>
                      <Text style={styles.originPriceText}>
                        {formatPriceWithCurrency(item.originPrice)}
                      </Text>
                      <Text style={styles.discountRatioText}>
                        {item.discountRatio}%
                      </Text>
                    </View>
                    <ArrowLineRight stroke={Color.lightGray} />
                    <Text style={styles.discountPriceText}>
                      {formatPriceWithCurrency(item.discountPrice)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {line}
        <View style={styles.paymentPriceOuterContainer}>
          <Text style={styles.paymentPriceTitle}>결제금액</Text>
          <View style={styles.paymentPriceContainer}>
            <Text style={styles.basketCountText}>
              담은 개수 : {detailData.basketCount}개 /{" "}
            </Text>
            <Text style={styles.totalPriceText}>
              총 {formatPriceWithCurrency(detailData.totalPrice)}
            </Text>
          </View>
        </View>
        {line}
        <View style={styles.paymentMethodOuterContainer}>
          <Text style={styles.paymentPriceTitle}>결제방법</Text>
          <Text style={styles.paymentMethodText}>
            {detailData.paymentMethod}
          </Text>
        </View>
        {line}
        <View style={styles.userRequestOuterContainer}>
          <Text style={styles.userRequestTitle}>요청사항</Text>
          <View style={styles.userRequestContainer}>
            <Text style={styles.userRequestText}>{detailData.userRequest}</Text>
          </View>
        </View>
        {line}
        <View style={styles.orderPhoneOuterContainer}>
          <Text style={styles.orderPhoneTitle}>전화번호</Text>
          <View style={styles.orderPhoneContainer}>
            <Text style={styles.safePhoneText}>{detailData.safePhone}</Text>
            <Text style={styles.userPhoneText}>{detailData.userPhone}</Text>
          </View>
        </View>
        {line}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
  },
  bottomMargin: {
    marginBottom: 80,
  },
  storeOuterContainer: {
    marginTop: 15,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
  dateContainer: {
    paddingVertical: 20,
  },
  date: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.50)",
  },
  storeInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  storeContainer: {
    flexDirection: "row",
  },
  pressedItem: {
    opacity: 0.5,
  },
  nameText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: Color.black,
  },
  describeText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    marginTop: 6,
    color: Color.darkGray,
  },
  storeRightContainer: {
    flexDirection: "row",
  },
  phoneContainer: {
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  storeLookContainer: {
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
  phoneText: {
    fontFamily: "Pretendard-Medium",
    marginTop: 4,
    fontSize: 14,
  },
  storeText: {
    fontFamily: "Pretendard-Medium",
    marginTop: 9,
    fontSize: 14,
  },
  line: {
    width: "100%",
    height: 20,
    backgroundColor: Color.middlePurple,
  },
  menuOuterContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
  menuTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    paddingBottom: 10,
  },
  menuCountText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    paddingVertical: 15,
    color: Color.black,
  },
  priceOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 50,
    backgroundColor: Color.brightGray,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 7,
    marginBottom: 12,
  },
  originPriceContainer: {
    flexDirection: "row",
  },
  originPriceText: {
    textDecorationLine: "line-through",
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: Color.darkGray,
  },
  discountRatioText: {
    color: Color.red,
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    marginLeft: 5,
  },
  discountPriceText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: Color.black,
  },
  paymentPriceOuterContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
  paymentPriceTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    paddingBottom: 10,
  },
  paymentPriceContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  basketCountText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: Color.darkGray,
  },
  totalPriceText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 18,
    color: Color.black,
  },
  paymentMethodOuterContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  paymentMethodText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Color.darkGray,
  },
  userRequestOuterContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
  userRequestTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    paddingBottom: 10,
  },
  userRequestContainer: {
    marginTop: 15,
  },
  userRequestText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Color.darkGray,
  },
  orderPhoneOuterContainer: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: Color.white,
  },
  orderPhoneTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    paddingBottom: 10,
  },
  orderPhoneContainer: {
    marginTop: 15,
  },
  safePhoneText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Color.darkGray,
  },
  userPhoneText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Color.darkGray,
    marginTop: 10,
  },
});

export default OrderDetail;
