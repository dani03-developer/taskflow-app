import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from "../../src/navigation/AppNavigator";
import { store } from '../../src/store/';
export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style='dark' />
        <SafeAreaView style={styles.safe} edges={['top']}>
          <AppNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>

  )

}
const styles = StyleSheet.create({
  safe: {
    flex: 1
  }
})
