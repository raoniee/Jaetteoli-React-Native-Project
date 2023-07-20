import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './components/common/Nav';
import Home from './components/home/Home';


export default function App() {
  return (
    <View style={styles.container}>
      <Home></Home>
      <Nav></Nav>
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
