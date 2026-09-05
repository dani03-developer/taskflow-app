import { colors, fonts } from '@/src/theme'
import LottieView from 'lottie-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const AnimatedSplashScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, justifyContent:'center'}}>
            <Text style={styles.title}>Task flow</Text>
            </View>
            <View style={styles.lottieWrapper}>
            <LottieView
                source={require('../../assets/lotties/bepInicio.json')}
                autoPlay
                resizeMode='cover'
                loop={false}
                style={{ width: '100%', height:450 }}
            />
            </View>
        </SafeAreaView>
    )
  
}
export default AnimatedSplashScreen

const styles = StyleSheet.create({
    container: {
         flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    title:{
         textAlign: 'center',
        fontFamily: fonts.BepFont,
        fontSize: 40,
        color: colors.text,
    },
    lottieWrapper: {
    flex:1,
    justifyContent:'flex-end'
  },
})
