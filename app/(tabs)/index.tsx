import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootNavigator from "../../src/navigation/RootNavigator";
import { store } from '../../src/store/';
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    'inter-regular': require('../../src/assets/fonts/inter/Inter_24pt-Regular.ttf'),
    'inter-semibold': require('../../src/assets/fonts/inter/Inter_24pt-SemiBold.ttf'),
    'inter-bold': require('../../src/assets/fonts/inter/Inter_24pt-Bold.ttf'),
    'inter-medium': require('../../src/assets/fonts/inter/Inter_28pt-Medium.ttf'),
    'gaegu-bold': require('../../src/assets/fonts/gaegu/Gaegu-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();   // ya cargaron: ocultá el splash
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;   // mientras cargan, no dibujes nada
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style='dark' />
        <SafeAreaView style={styles.safe} edges={['top']}>
          <RootNavigator />
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
