import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ArrowLeft from "../../assets/images/ArrowLeft";
import Color from "../../assets/colors/Color";
import SearchImg from "../../assets/images/SearchImg";
import Clock from "../../assets/images/Clock";
import RecentItem from "./item/RecentItem";
import { recentSearchData, popularSearchData } from "./dummy/dummy";
import Graph from "../../assets/images/Graph";
import PopularItem from "./item/PopularItem";

const BeforeSeach = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* 검색창 */}
        <View style={styles.arrowLeft}>
          <ArrowLeft stroke={Color.lightGray} />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchImg}>
            <SearchImg />
          </View>
          <TextInput
            placeholder="검색하기"
            style={styles.searchInputContainer}
          />
        </View>
      </View>
      <ScrollView>
        {/* 최근 검색어 */}
        <View style={styles.recentSearchOuterContainer}>
          <View style={styles.recentSearchInnerContainer}>
            <View style={styles.recentSearchTitleContainer}>
              <Clock />
              <Text style={styles.title}>최근 검색어</Text>
            </View>
            <View style={styles.allDeleteConatiner}>
              <Text style={styles.semiText}>전체삭제</Text>
            </View>
          </View>
          <View style={styles.recentSearchFlatContainer}>
            <FlatList
              data={recentSearchData}
              horizontal={true}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <RecentItem index={index} item={item} />;
              }}
            />
          </View>
        </View>

        {/* 인기 검색어 */}

        <View style={styles.popularOuterContainer}>
          <View style={styles.popularInnerContainer}>
            <View style={styles.popularTitleContainer}>
              <Graph />
              <Text style={styles.title}>인기 검색어</Text>
            </View>
            <View>
              <Text style={styles.semiText}>07.18 18:00 기준</Text>
            </View>
          </View>
          {/* flatlist*/}
          <View style={styles.popularSearchFlatContainer}>
            <FlatList
              data={popularSearchData}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <PopularItem index={index} item={item} />;
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
  },
  arrowLeft: {
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    marginRight: 16,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Color.white,
    ...Platform.select({
      ios: {
        shadowColor: Color.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  searchImg: {
    marginLeft: 26,
  },
  searchInputContainer: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: 500,
  },
  recentSearchOuterContainer: {
    marginTop: 32,
    marginLeft: 16,
  },
  recentSearchInnerContainer: {
    marginRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentSearchTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
  },
  allDeleteConatiner: {
    padding: 3,
  },
  semiText: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "500",
    color: Color.gray,
  },
  recentSearchFlatContainer: {
    marginTop: 20,
    border: 1,
  },
  popularOuterContainer: {
    marginTop: 74,
    marginBottom: 74,
  },
  popularInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  popularTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
  },
  popularSearchFlatContainer: {
    marginTop: 33,
    marginLeft: 12,
    marginRight: 17,
  },
});

export default BeforeSeach;
