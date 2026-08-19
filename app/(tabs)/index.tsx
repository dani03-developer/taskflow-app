import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SEED_TASKS } from "../../src/data";
import TaskDetailScreen from "../../src/screens/tasks/TaskDetailScreen";
import TasksScreen from "../../src/screens/tasks/TasksScreen";
import { colors } from '../../src/theme';
import { State, Task } from "../../src/types";
export default function App() {
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS) //esto detalla el principio de la lista y a partir de allí se empieza a modificar con el useState
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
const getTodayString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};
  const addTask = useCallback((task: Task) => { //agrega una nueva tarea
    setTasks((prev) => [task, ...prev])
  }, [])

  const toggleTask = useCallback((id: string) => { //para TaskDetail marcar como completado o no completado
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Completado' ? 'Por Hacer' : 'Completado' }
          : task
      )
    )
  }, [])
  const isPending =(task: Task): State =>{
    if(task.status === 'Completado') return 'Completado'

    if(task.date && task.date < getTodayString()){
      return 'Pendiente'
    }
    return 'Por Hacer'
  }
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id)) //copia sin el item
    setSelectedTask(null)
  }, [])

  const openDetail = useCallback((task: Task) => setSelectedTask(task), [])
  const closeDetail = useCallback(() => setSelectedTask(null), [])

  return (
    <SafeAreaView style={styles.container}>
      {selectedTask ? (<TaskDetailScreen
        task={selectedTask}
        onBack={closeDetail}
        onToggle={toggleTask}
        onDelete={deleteTask}
      ></TaskDetailScreen>) :
        (<TasksScreen tasks={tasks} onAdd={addTask} onSelect={openDetail} ></TasksScreen>)}
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    gap: 16
  }
})
