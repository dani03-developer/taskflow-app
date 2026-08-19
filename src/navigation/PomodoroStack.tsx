import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PomodoroScreen from "../screens/pomodoro/PomodoroScreen";
const Stack =createNativeStackNavigator() //llamo a las funciones que nos da stackNavigator

const ClendarStack = () => {
  return (
    <Stack.Navigator
     screenOptions={{
        headerShown:false
     }}
    >
        <Stack.Screen
            name='PomodoroHome'
            component={PomodoroScreen}
        />
    </Stack.Navigator>
  )
}

export default ClendarStack