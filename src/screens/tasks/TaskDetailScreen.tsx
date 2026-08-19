import { Lucide } from "@react-native-vector-icons/lucide";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, shadows, spacing, statusColor, textSize } from "../../theme";
import { Task } from "../../types";
type Props = {
  task: Task
  onBack: () => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}
const TaskDetailScreen = ({ task, onBack, onToggle, onDelete }: Props) => {
  const { background, text } = statusColor[task.status]
  return (
    <View style={styles.containerTaskDetail}>
      <Pressable style={styles.buttonBack} onPress={onBack}><Lucide name="chevron-left" size={20} color={colors.textGray}/></Pressable>
      <View style={[styles.buttonHeader, { backgroundColor: background }]}>
        <Text style={[styles.textButton, { color: text }]}>{task.status}</Text>
      </View>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.containerDetail}>
        <View style={[styles.detail, {borderBottomWidth:1, borderBottomColor:'#CFCFCF', paddingBottom:12}]}>
          <Text>Categoría</Text>
          <View style={[styles.buttonHeader]}>
            <Text style={[styles.textButton,{fontWeight:600}]}>{task.category}</Text>
          </View>
        </View>
        <View style={styles.detail}>
          <Text>Fecha</Text>
          <View style={styles.buttonHeader}>
            <Text style={[styles.textButton,{fontWeight:600}]}>{task.date}</Text>
          </View>
        </View>
      </View>
      <View style={{flex:1, gap:4}}>
       <Text style={styles.subtitle}>Descripción</Text>
       <Text>{task.description}</Text>
      </View>
      <Pressable style={[styles.buttonAction, {backgroundColor:colors.green}]}  onPress={() => onToggle(task.id)} >
        <Lucide name="check" size={20} color={colors.textGreen}/>
        <Text style={[styles.buttonText,{color:colors.textGreen}]}>Marcar como Completado</Text>
      </Pressable>
      <Pressable style={[styles.buttonAction, {backgroundColor:colors.red}]}  onPress={() => onDelete(task.id)}>
        <Lucide name="trash" size={20} color={colors.textRed}/>
        <Text style={[styles.buttonText,{color:colors.textRed}]}>Eliminar Tarea</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  containerTaskDetail: {
    flex: 1,
    width: '100%',
    padding: spacing.lg,
    gap: spacing.lg,
    alignItems: 'flex-start'

  },
   buttonBack:{
    width: 40,
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.softGray,
    borderRadius: '100%'
  },
  buttonHeader: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.softGray,
    alignItems: 'center'
  },
  textButton: {
    fontSize: textSize.subTitle,
    fontWeight: 700,
    color: colors.textGray
  },
  title: {
    color: colors.text,
    fontSize: textSize.title + 4,
    fontWeight: "bold"
  },
  containerDetail: {
    width: '100%',
    backgroundColor: colors.backgroundColor,
    shadowColor: shadows.shadowColor,
    shadowOffset: shadows.shadowOffset,
    shadowOpacity: shadows.shadowOpacity,
    shadowRadius: shadows.shadowRadius,
    elevation: shadows.elevation,
    padding: spacing.lg,
    borderRadius: radius.md,
    gap:12
  },
  detail: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  subtitle:{
    color:colors.text,
    fontSize:textSize.title,
    fontWeight:'bold'
  },
  buttonAction:{
    flexDirection:'row',
    width:'100%',
    padding:spacing.md,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:radius.md,
    gap:4
  },
  buttonText:{
    fontSize:textSize.subTitle,
    fontWeight:'bold'
  }
})
export default TaskDetailScreen