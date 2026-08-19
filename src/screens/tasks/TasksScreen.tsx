import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Bep from '../../assets/Bep.png';
import CardTask from '../../components/CardTask';
import EmptyState from "../../components/EmptyState";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";
import { SEED_TASKS } from "../../data/index";
import { screenStyles, spacing } from "../../theme";
import { RootStackParamList, Task } from '../../types/index';
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tasks'
>
type TasksRouteProp = RouteProp<RootStackParamList, 'Tasks'>
const keyExtractor = (item: Task) => item.id

const TasksScreen = ({navigation, route}:{navigation: NavigationProp, route: TasksRouteProp}) => {
 const [formOpen, setFormOpen] = useState(false)
  useEffect(() => { //venimos del botón '+' del TabNavigator, abrimos el form y limpiamos el param
    if (route.params?.openForm) {
      setFormOpen(true)
      navigation.setParams({ openForm: undefined })
    }
  }, [route.params?.openForm, navigation])
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS) //esto detalla el principio de la lista y a partir de allí se empieza a modificar con el useState
  const name = 'Dani'
  //const pendig = tasks.filter((t) => !t.status).length
      const addTask = useCallback((task: Task) => { //agrega una nueva tarea
    setTasks((prev) => [task, ...prev])
  }, [])
    const openDetail = useCallback((task: Task) => {
      navigation.navigate('TaskDetail', {
        task,
      });
    }
    , [navigation]
  );
  const renderItem = useCallback( //se usa callBack y no function porque si los parametros no cambian este no renderiza de nuevo y se queda con lo que tiene
    ({ item }: { item: Task }) => {
      return (
        <CardTask
          task={item}
          onPress={openDetail}
        />
      )
    }, [addTask, openDetail] //esto quiere decir dependencia si esto cambia se renderiza sino no
  )
  return (
    <>
    <View style={[screenStyles.container, {padding:0}]}>
      <Header name={name} image={Bep}></Header>
      <FlatList
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={{ flexGrow: 1, gap: 8, alignItems: 'center', padding:spacing.lg}}
        showsVerticalScrollIndicator={false}

        initialNumToRender={8} //cantidad de tarjetas a renderizar
        windowSize={7}
        maxToRenderPerBatch={8}
      >

      </FlatList>
      <TaskForm
        visibleForm={formOpen}
        tasks={tasks}
        onClose={() => setFormOpen(false)}
        onAdd={addTask} />
        </View>
    </>
  )
}
export default TasksScreen