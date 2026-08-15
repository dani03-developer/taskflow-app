import { StyleSheet, Text, View } from "react-native";
import { border, colors, shadows, textSize } from "../theme";
import type { Task } from "../types";
type CardTaskProps ={
    task: Task //este es el props de tipo task que se va a recibir en el componente CardTask
}

  const tasksSpanish: Record<Task['time'], string> = {  //defino un objeto de tipo Record que mapea los valores de time a su traducción en español. Recibe time, y espera un string como valor (la traducción).
    today: 'Hoy',
    tomorrow: 'Mañana',
    'next week': 'Próxima semana',
    'next month': 'Próximo mes'
  }

const CardTask = ({ task }: CardTaskProps) => {
  return (
    <View style={styles.cardTask} key={task.id}>
        <View style={styles.headerTask}>
            <Text style={{fontSize: textSize.title, fontWeight: 'bold'}}>{task.title}</Text>
            <Text style={{fontSize: textSize.text, color: colors.subText}}>{task.description}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:8}}>
            <Text style={{color: task.status ? 'green' : 'orange'}}>{task.status ? 'Completada' : 'Pendiente'}</Text>
            <Text style={{color: colors.subText}}>{tasksSpanish[task.time]}</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    cardTask:{
    width:'100%',
    shadowColor: shadows.shadowColor,
    shadowOffset: shadows.shadowOffset,
    shadowOpacity: shadows.shadowOpacity,      
    shadowRadius: shadows.shadowRadius,
    elevation: shadows.elevation,
    padding:16,
    borderRadius:border.borderRadius
    },
    headerTask:{
    gap: 2
    }
})
export default CardTask