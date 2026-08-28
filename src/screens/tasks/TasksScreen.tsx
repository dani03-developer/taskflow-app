import WeekCalendar from "@/src/components/WeekCalendar";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Bep from '../../assets/Bep.png';
import CardTask from '../../components/CardTask';
import EmptyState from "../../components/EmptyState";
import FilterBar from '../../components/FilterBar';
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";
import { selectFilter, selectFilteredTask, toogleTaskStatus } from "../../features/tasks/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { screenStyles, spacing } from "../../theme";
import { Task } from "../../types/";
import { TasksStackParamList } from '../../types/index';
type NavigationProp = NativeStackNavigationProp<
  TasksStackParamList,
  'Tasks'
>
type TasksRouteProp = RouteProp<TasksStackParamList, 'Tasks'>
const keyExtractor = (item: Task) => item.id
const TasksScreen = ({navigation, route}:{navigation: NavigationProp, route: TasksRouteProp}) => {
  const name='Dani'
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(selectFilteredTask)
    const filter = useAppSelector(selectFilter)
 const [formOpen, setFormOpen] = useState(false)
  useEffect(() => { //venimos del botón '+' del TabNavigator, abrimos el form y limpiamos el param
    if (route.params?.openForm) {
      setFormOpen(true)
      navigation.setParams({ openForm: undefined })
    }
  }, [route.params?.openForm, navigation])

  const toggleTask = useCallback(
    (id:string)=>{
      dispatch(toogleTaskStatus(id))
    },[dispatch]
  )
  const renderItem = useCallback( //se usa callBack y no function porque si los parametros no cambian este no renderiza de nuevo y se queda con lo que tiene
    ({ item }: { item: Task }) => {
      return (
        <CardTask
          task={item}
          onPress={()=>navigation.navigate('TaskDetail', {taskId: item.id})}
        />
      )
    }, [toggleTask] //esto quiere decir dependencia si esto cambia se renderiza sino no
  )
  return (
    <>
    <View style={[screenStyles.container, {padding:0}]}>
      <Header name={name} image={Bep}></Header>
      <WeekCalendar />
      <FilterBar />
      <FlatList
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState filter={filter}/>}
        contentContainerStyle={{ flexGrow: 1, gap: 8, alignItems: 'center', paddingHorizontal:spacing.lg}}
        showsVerticalScrollIndicator={false}

        initialNumToRender={8} //cantidad de tarjetas a renderizar
        windowSize={7}
        maxToRenderPerBatch={8}
      >

      </FlatList>
      <TaskForm
        visibleForm={formOpen}
        onClose={() => setFormOpen(false)} />
        </View>
    </>
  )
}
export default TasksScreen