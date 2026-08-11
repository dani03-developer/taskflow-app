import { StyleSheet, Text, View } from "react-native";
import CardTask from "../components/CardTask";
import Header from "../components/Header";
import { tasks } from "../data/index";
const HomeScreen = () => {
    const name = 'Daniela Machaca'
  return (
    <>
     <View style={styles.gretting}>
              <Text style={styles.gettingText}>Hola, buenas noches {name.slice(0, 7)} ☺️</Text>
            </View>
            <Header name={name} totalTasks={tasks.length} />
            <View>
              <Text>Tareas Completadas {
                tasks.filter(t => t.status).length} / {tasks.length}</Text>
            </View>
            <View style={{width:'100%', gap:16}}>
               {tasks.map((task) => {
              return (
                <CardTask task={task} key={task.id} />
              )
            })}
            </View>
    </>
  )
}
const styles = StyleSheet.create({
     gretting:{
    width:'100%'
    },
    gettingText:{
    fontSize:24,
    fontWeight:'bold'
    }
})
export default HomeScreen