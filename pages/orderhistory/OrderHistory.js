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
import { orderHistoryData } from "../../components/orderhistory/dummy/dummy";
import Close from "../../assets/images/Close";
import Color from "../../assets/colors/Color";
import ArrowRight from "../../assets/images/ArrowRight";
import { useState } from "react";
import Header from "../../components/common/Header";

const OrderHistory = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePressClose = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const yesModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const moveOrderDetail = () => {
    navigation.navigate("OrderDetail");
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
          data={orderHistoryData}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => {
            return (
              <View index={index} style={styles.orderItemContainer}>
                {/* 날짜 */}
                <View style={styles.dateOuterContainer}>
                  <View style={styles.dateInnerContainer}>
                    <Text style={styles.date}>{item.date}</Text>
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
                      style={({ pressed }) => pressed && styles.pressedItem}
                    >
                      <View style={styles.menuTop}>
                        <Text style={styles.title}>{item.name}</Text>
                        <ArrowRight stroke="#2F2F38" />
                      </View>
                    </Pressable>
                    <View style={styles.describeContainer}>
                      <Text style={styles.describe}>{item.describe}</Text>
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
                {item.review && (
                  <Pressable
                    android_ripple={{ color: Color.lightPurple }}
                    style={({ pressed }) => pressed && styles.pressedItem}
                  >
                    <View style={styles.reviewContainer}>
                      <Text>리뷰쓰기 ({item.review}일 남음)</Text>
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
  bottomMargin:{
    paddingBottom:105
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
