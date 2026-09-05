import WeekCalendar from "@/src/components/WeekCalendar";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import FilterBar from '../../components/FilterBar';
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import { selectCurrentUser } from '../../features/auth/AuthSlice';
import { selectFilter, selectFilteredTask, setTasks } from "../../features/tasks/TasksSlice";
import { subscribeToTasks } from '../../services/tasks/tasksService';
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { screenStyles } from "../../theme";
import { TasksStackParamList } from '../../types/index';

type NavigationProp = NativeStackNavigationProp<
  TasksStackParamList,
  'Tasks'
>
type TasksRouteProp = RouteProp<TasksStackParamList, 'Tasks'>
const TasksScreen = ({ navigation, route }: { navigation: NavigationProp, route: TasksRouteProp }) => {
  const name = 'Dani'
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const tasks = useAppSelector(selectFilteredTask)
  const filter = useAppSelector(selectFilter)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    if (!user) return

    const unsubscribe = subscribeToTasks(
      user.uid,
      (tasks) => {
        dispatch(setTasks(tasks))
      }
    )

    return unsubscribe
  }, [user, dispatch])

  useEffect(() => { //venimos del botón '+' del TabNavigator, abrimos el form y limpiamos el param
    if (route.params?.openForm) {
      setFormOpen(true)
      navigation.setParams({ openForm: undefined })
    }
  }, [route.params?.openForm, navigation])

  const handleTaskPress = useCallback(
    (taskId: string) => {
      navigation.navigate('TaskDetail', { taskId })
    }, [navigation]
  )
  return (
    <>
      <View style={[screenStyles.container]}>
        <View style ={screenStyles.spacingContainer}>
          <Header></Header>
          <WeekCalendar />
          <FilterBar />
        </View>
        <TaskList tasks={tasks} filter={filter}  onTaskPress={handleTaskPress} />
        <TaskForm
          visibleForm={formOpen}
          onClose={() => setFormOpen(false)}
        />
      </View>
    </>
  )
}
export default TasksScreen