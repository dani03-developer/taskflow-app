import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import TaskDetailScreen from "../screens/tasks/TaskDetailScreen";
import { CalendarStackParamList } from "../types";
const Stack =createNativeStackNavigator<CalendarStackParamList>() //llamo a las funciones que nos da stackNavigator

const ClendarStack = () => {
  return (
    <Stack.Navigator
     screenOptions={{
        headerShown:false
     }}
    >
        <Stack.Screen
            name='Calendar'
            component={CalendarScreen}
        />
        <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
        />
    </Stack.Navigator>
  )
}

export default ClendarStack