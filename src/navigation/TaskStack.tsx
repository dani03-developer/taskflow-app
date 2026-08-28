import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskDetailScreen from "../screens/tasks/TaskDetailScreen";
import TasksScreen from '../screens/tasks/TasksScreen';
import { TasksStackParamList } from "../types";
const Stack =createNativeStackNavigator<TasksStackParamList>() //llamo a las funciones que nos da stackNavigator
 //crea una navegación entre estas dos pantallas, las conecta Stack.Navigator
const TaskStack = () => {
  return (
    <Stack.Navigator
     screenOptions={{
        headerShown:false
     }}
    >
        <Stack.Screen
            name="Tasks"
            component={TasksScreen}
        />
        <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
        />
    </Stack.Navigator>
  )
}

export default TaskStack