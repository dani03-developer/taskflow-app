import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PomodoroScreen from "../screens/pomodoro/PomodoroScreen";
import { PomodoroStackParamList } from "../types";
const Stack =createNativeStackNavigator<PomodoroStackParamList>() //llamo a las funciones que nos da stackNavigator

const PomodoroStack = () => {
  return (
    <Stack.Navigator
     screenOptions={{
        headerShown:false
     }}
    >
        <Stack.Screen
            name='Pomodoro'
            component={PomodoroScreen}
        />
    </Stack.Navigator>
  )
}

export default PomodoroStack