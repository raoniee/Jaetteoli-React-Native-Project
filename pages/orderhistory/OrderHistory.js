import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Close from "../../assets/images/Close";
import Color from "../../assets/colors/Color";
import ArrowRight from "../../assets/images/ArrowRight";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useIsFocused } from "@react-navigation/native";
import { baseUrl, jwt } from "../../utils/baseUrl";
import { formatPriceWithCurrency } from "../../utils/format";

const OrderHistory = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [initData, setInitData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("주문 내역 목록 api 호출");
      const fetchOrderHistory = async () => {
        try {
          const response = await fetch(`${baseUrl}/jat/app/orders`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-ACCESS-TOKEN": jwt,
            },
          });
          const data = await response.json();
          if (!data.isSuccess) {
            console.log(data.message);
            return;
          }
          setInitData(data.result);
        } catch (err) {
          console.log(err);
        }
      };
      fetchOrderHistory();
    }
  }, [isFocused]);

  const handlePressClose = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const yesModal = () => {
    if (selectedItem) {
      // 선택된 아이템을 initData에서 제거
      setInitData((prevData) =>
        prevData.filter((item) => item.key !== selectedItem.key)
      );
      //주문 내역 삭제 api 호출
      console.log("주문 내역 삭제 api 호출");
    }
    setModalVisible(false);
    setSelectedItem(null);
  };

  const moveToDetailStore = (storeIdx) => {
    navigation.navigate("StoreDetailPage", { storeIdx: storeIdx });
  };

  const moveOrderDetail = () => {
    navigation.navigate("OrderDetail");
  };

  const moveToWriteReview = (orederIdx, storeIdx) => {
    navigation.navigate("WriteReview", { orderIdx: orederIdx, storeIdx: storeIdx });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={0}
        right={1}
        backgroundColor="white"
        title="주문내역"
        color={Color.lightGray}
      />
      <View style={styles.line} />
      <View style={styles.bottomMargin}>
        <FlatList
          data={initData}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => {
            let weekDay = "";
            switch (item.weekDay) {
              case 0:
                weekDay = "(일)";
                break;
              case 1:
                weekDay = "(월)";
                break;
              case 2:
                weekDay = "(화)";
                break;
              case 3:
                weekDay = "(수)";
                break;
              case 4:
                weekDay = "(목)";
                break;
              case 5:
                weekDay = "(금)";
                break;
              case 6:
                weekDay = "(토)";
                break;
            }
            // API 날짜 문자열을 "."으로 분리하여 배열
            const apiDateArray = item.orderDate.split(".");

            // 배열의 요소를 숫자로 변환하여 Date 객체로 사용
            const apiYear = parseInt(apiDateArray[0]);
            const apiMonth = parseInt(apiDateArray[1]) - 1; // JavaScript에서 월은 0부터 시작
            const apiDay = parseInt(apiDateArray[2]) + 4;
            const apiDate = new Date(apiYear, apiMonth, apiDay);
            // 오늘 날짜를 생성합니다.
            const today = new Date();

            // 한국 시간대 오프셋을 설정합니다. (한국 표준시 +09:00, 분 단위로 설정)
            const koreaTimeOffset = 9 * 60; // 분 단위로 설정

            // UTC 날짜에 한국 시간대 오프셋을 적용하여 한국 날짜 및 시간을 얻습니다.
            const apiKoreaDate = new Date(
              apiDate.getTime() + koreaTimeOffset * 60 * 1000
            );
            const todayKoreaDate = new Date(
              today.getTime() + koreaTimeOffset * 60 * 1000
            );
            // 년, 월, 일 정보를 추출합니다.
            const year = todayKoreaDate.getFullYear();
            const month = todayKoreaDate.getMonth(); // JavaScript에서 월은 0부터 시작하므로 +1을 해줍니다.
            const day = todayKoreaDate.getDate();

            const ayear = apiKoreaDate.getFullYear();
            const amonth = apiKoreaDate.getMonth(); // JavaScript에서 월은 0부터 시작하므로 +1을 해줍니다.
            const aday = apiKoreaDate.getDate();

            let daysDifference = -1;
            if (year === ayear && month === amonth) {
              daysDifference = aday - day;
            }
            // 결과를 출력합니다.
            console.log("api: ", ayear, amonth, aday);
            console.log("today:", year, month, day);

            // 결과를 출력합니다.
            console.log("두 날짜 간의 차이 (일):", daysDifference);
            const isReview =
              daysDifference >= 0 && daysDifference <= 5 ? true : false;
            return (
              <View index={item.orderIdx} style={styles.orderItemContainer}>
                {/* 날짜 */}
                <View style={styles.dateOuterContainer}>
                  <View style={styles.dateInnerContainer}>
                    <Text style={styles.date}>
                      {item.orderDate} {weekDay}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handlePressClose(item)} // Close 아이콘 누를 때 모달 열기
                    android_ripple={{ color: Color.lightGray }}
                    style={({ pressed }) => pressed && styles.pressedItem}
                  >
                    <Close />
                  </Pressable>
                </View>
                {/* 메뉴명 */}
                <View style={styles.menuOuterContainer}>
                  <View style={styles.imgContainer}>
                    <Image
                      source={require("../../components/orderhistory/dummy/image1.png")}
                      resizeMode="stretch"
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Pressable
                      onPress={() => moveToDetailStore(item.storeIdx)}
                      style={({ pressed }) => pressed && styles.pressedItem}
                    >
                      <View style={styles.menuTop}>
                        <Text style={styles.title}>{item.storeName}</Text>
                        <ArrowRight stroke="#2F2F38" />
                      </View>
                    </Pressable>
                    <View style={styles.describeContainer}>
                      <Text style={styles.describe}>
                        {item.menuName} {formatPriceWithCurrency(item.price)} 외
                        {item.orderItemCount}개
                      </Text>
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressedItem}
                        onPress={moveOrderDetail}
                      >
                        <View style={styles.orderDetailContainer}>
                          <Text style={styles.orderDetail}>주문상세보기</Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {/* 리뷰 */}
                {isReview && (
                  <Pressable
                    onPress={() => moveToWriteReview(item.orderIdx, item.storeIdx)}
                    android_ripple={{ color: Color.lightPurple }}
                    style={({ pressed }) => pressed && styles.pressedItem}
                  >
                    <View style={styles.reviewContainer}>
                      <Text>리뷰쓰기 ({daysDifference}일 남음)</Text>
                    </View>
                  </Pressable>
                )}
              </View>
            );
          }}
        />
      </View>
      {/* 모달창 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {/* 모달 내용 */}
          {selectedItem && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                주문내역을 삭제하시겠습니까?
              </Text>
              <View style={styles.btnContainer}>
                <Pressable
                  onPress={closeModal}
                  android_ripple={{ color: Color.lightPurple }}
                  style={({ pressed }) => pressed && styles.pressedItem}
                >
                  <View style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>닫기</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={yesModal}
                  android_ripple={{ color: Color.lightPurple }}
                  style={({ pressed }) => pressed && styles.pressedItem}
                >
                  <View style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>예</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
  },
  bottomMargin: {
    paddingBottom: 95,
  },
  orderItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 30,
  },
  dateOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInnerContainer: {
    paddingVertical: 11,
  },
  date: {
    color: Color.lightGray,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
  },
  pressedItem: {
    opacity: 0.5,
  },
  menuOuterContainer: {
    flexDirection: "row",
    marginTop: 10,
    height: 65,
  },
  imgContainer: {
    width: 65,
    height: 65,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  menuTop: {
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    color: Color.black,
    marginBottom: 7,
  },
  describeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  describe: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
  },
  orderDetailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Color.purple,
    borderRadius: 18,
  },
  orderDetail: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Color.white,
  },
  reviewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#ECE9FF",
    marginTop: 25,
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
    paddingTop: 70,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
    marginTop: 45,
    marginBottom: 80,
  },
  modalButton: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#ECE9FF",
    borderRadius: 30,
    width: 85,
  },
  modalButtonText: {
    color: Color.black,
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
  },
});

export default OrderHistory;
