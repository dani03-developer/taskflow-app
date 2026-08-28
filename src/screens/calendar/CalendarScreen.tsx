import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarComponent from '../../components/Calendar';
import TaskList from "../../components/TaskList";
import { getTodayString, selectAllTask } from "../../features/tasks/TasksSlice";
import { useAppSelector } from "../../store/hooks/hooks";
import { colors, screenStyles, textSize } from '../../theme';
import { CalendarStackParamList } from '../../types/index';
type NavigationProp = NativeStackNavigationProp<
  CalendarStackParamList,
  'Calendar'
>
type CalendarRouteProp = RouteProp<CalendarStackParamList, 'Calendar'>
const CalendarScreen =({navigation, route}:{navigation: NavigationProp, route: CalendarRouteProp})=>{
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null)
  const tasks = useAppSelector(selectAllTask)
  const handleTaskPress = useCallback(
    (taskId:string)=>{
      navigation.navigate('TaskDetail', {taskId})
    },[navigation]
  )
  const tareasDelDia = useMemo(() => {
    const fechaActual = getTodayString()
    if (!fechaSeleccionada) return tasks.filter((task)=>task.date === fechaActual )  // sin fecha elegida, mostrás todas
    return tasks.filter((task) => task.date === fechaSeleccionada)
}, [tasks, fechaSeleccionada])
    return(
        <View style={screenStyles.container}>
            <View style={screenStyles.spacingContainer}>
                <Text style={styles.title}>Calendario</Text>
                <CalendarComponent onSelectDate={(date) => setFechaSeleccionada(date.dateString)}></CalendarComponent>
                <Text style={styles.title}>Tareas:</Text>
            </View>
            <TaskList tasks={tareasDelDia} filter="todo" onTaskPress={handleTaskPress} />
        </View>
    );
}
const styles = StyleSheet.create({
  title:{
    fontSize:textSize.title,
    color: colors.text,
    fontWeight:'bold'
  }
})
export default CalendarScreen