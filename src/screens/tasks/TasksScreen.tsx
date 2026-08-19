import Header from "@/src/components/Header";
import { colors } from "@/src/theme";
import { Lucide } from "@react-native-vector-icons/lucide";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Bep from '../../assets/Bep.png';
import CardTask from '../../components/CardTask';
import EmptyState from "../../components/EmptyState";
import TaskForm from "../../components/TaskForm";
import { Task } from '../../types/index';
type Props ={
  tasks: Task[]
  onAdd:(task:Task)=>void
  onSelect:(task:Task)=>void
}
const keyExtractor = (item: Task) => item.id
const TasksScreen = ({tasks, onAdd,onSelect}:Props) => {
  const [formOpen, setFormOpen] = useState(false)
  const name = 'Dani'
  const pendig = tasks.filter((t) =>!t.status).length

  const renderItem = useCallback( //se usa callBack y no function porque si los parametros no cambian este no renderiza de nuevo y se queda con lo que tiene
    ({item}:{item:Task})=>{
      return(
      <CardTask 
      task={item}
      onPress={onSelect}
      />
    )
  },[onAdd,onSelect] //esto quiere decir dependencia si esto cambia se renderiza sino no
)
  return (
    <>
         <Header name={name} image={Bep}></Header>
          <FlatList
          data={tasks}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={EmptyState}
          contentContainerStyle={{flexGrow:1, gap: 4, alignItems:'center'}}
          showsVerticalScrollIndicator={false}

          initialNumToRender={8} //cantidad de tarjetas a renderizar
          windowSize={7}
          maxToRenderPerBatch={8}
          >

          </FlatList>
          <TouchableOpacity style={styles.newTaskButton} onPress={() => setFormOpen(true)}>
            <Lucide name={'plus'} size={30} color={colors.backgroundColor}/>
          </TouchableOpacity>
          <TaskForm
          visibleForm={formOpen}
          tasks={tasks}
          onClose={() => setFormOpen(false)}
          onAdd={onAdd} />
    </>
  )
}
const styles = StyleSheet.create({

  newTaskButton:{
    width:50,
    height:50,
    borderRadius:'100%',
    backgroundColor:colors.text,
    alignItems:'center',
    justifyContent:'center'
  }
})
export default TasksScreen