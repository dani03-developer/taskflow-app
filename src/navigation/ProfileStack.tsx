import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import TaskDetailScreen from "../screens/tasks/TaskDetailScreen";
import { ProfileStackParamList } from "../types";

const Stack =createNativeStackNavigator<ProfileStackParamList>() //llamo a las funciones que nos da stackNavigator

const ProfileStack = () => {
  return (
    <Stack.Navigator
     screenOptions={{
        headerShown:false
     }}
    >
        <Stack.Screen
            name='Profile'
            component={ProfileScreen}
        />
        <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
        />
        <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
        />
    </Stack.Navigator>
  )
}

export default ProfileStack