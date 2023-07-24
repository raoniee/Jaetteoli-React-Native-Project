import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './components/common/Nav';
import Home from './components/home/Home';
import ManageReview from './components/mypage/ManageReview';
import ModifyMyInfo from './components/mypage/ModifyMyInfo';
import MyPage from './components/mypage/MyPage';
import WriteReview from './components/review/WriteReview';


export default function App() {
  return (
    <View style={styles.container}>
      <WriteReview></WriteReview>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
