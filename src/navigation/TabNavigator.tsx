import { Lucide } from "@react-native-vector-icons/lucide"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, TouchableOpacity } from "react-native"
import { colors } from '../theme'
import CalendarStack from './CalendarStack'
import PomodoroStack from './PomodoroStack'
import ProfileStack from './ProfileStack'
import TaskStack from "./TaskStack"
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarInactiveTintColor:colors.textGray,
                tabBarActiveTintColor: colors.textGray,
                tabBarStyle:{
                    backgroundColor: colors.backgroundColor,
                    borderTopWidth: 0,  
                 },
            }}
        >
            <Tab.Screen
                name='Tareas'
                component={TaskStack}
                options={{
                    tabBarIcon:()=><Lucide name={`square-check-big`} size={20} color={colors.textGray}/>
                }}
            />
            <Tab.Screen
                name='Pomodoro'
                component={PomodoroStack}
                options={{
                    tabBarIcon:()=><Lucide name={`loader-circle`} size={20} color={colors.textGray}/>
                }}
            />
            <Tab.Screen
                name='Agregar'
                component={()=>null}
                options={{
                    tabBarButton: ({ onPress, accessibilityState, testID }) => (
                        <TouchableOpacity
                            onPress={onPress}
                            accessibilityState={accessibilityState ?? undefined}
                            testID={testID}
                            style={styles.newTaskButton}
                        >
                            <Lucide name={'plus'} size={30} color={colors.backgroundColor} />
                        </TouchableOpacity>
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault() 
                        navigation.navigate('Tareas', {
                            screen: 'Tasks',
                            params: { openForm: true },
                        })
                    },
                })}
            />
            <Tab.Screen
                name='Calendario'
                component={CalendarStack}
                options={{
                    tabBarIcon:()=><Lucide name={`calendar-range`} size={20} color={colors.textGray}/>
                }}
            />
             <Tab.Screen
                name='Perfil'
                component={ProfileStack}
                options={{
                    tabBarIcon:()=><Lucide name={`user`} size={20} color={colors.textGray}/>
                }}
            />
        </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
    newTaskButton: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        backgroundColor: colors.text,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top:-15
    },
})

export default TabNavigator