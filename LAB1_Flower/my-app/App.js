import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {FlowerLandingPage} from './src/components/FlowerShop/FlowerLandingPage';

export default function App() {
  return (
    <View style={styles.container}>
    <FlowerLandingPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
