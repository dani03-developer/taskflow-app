import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TabNavigator from "../../src/navigation/TabNavigator";
export default function App() {
{/*const getTodayString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};*/}
/*const toggleTask = useCallback((id: string) => { //para TaskDetail marcar como completado o no completado
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, status: task.status === 'Completado' ? 'Por Hacer' : 'Completado' }
            : task
        )
      )
    }, [])*/

 /* const isPending =(task: Task): State =>{
    if(task.status === 'Completado') return 'Completado'

    if(task.date && task.date < getTodayString()){
      return 'Pendiente'
    }
    return 'Por Hacer'
  }*/
  /*const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id)) //copia sin el item
    setSelectedTaskId(null)
  }, [])*/

  return (
    <SafeAreaProvider>
    <StatusBar style='dark'/> 
    <SafeAreaView style={styles.safe} edges={['top']}>
      <TabNavigator />
    </SafeAreaView>
    </SafeAreaProvider>
  )

}
const styles = StyleSheet.create({
  safe: {
    flex: 1
  }
})
