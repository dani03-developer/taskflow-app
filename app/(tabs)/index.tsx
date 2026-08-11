import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from "../../src/screens/ProfileScreen";
import { colors } from '../../src/theme';
export default function App() {
  return (
    <SafeAreaView  style={styles.container}>
       <ProfileScreen></ProfileScreen>
    </SafeAreaView>
  )
   
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor: colors.backgroundColor,
    padding:16,
    gap:16
  }
})
