import { Lucide } from "@react-native-vector-icons/lucide";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteTask, isPending, selectTaskById, toogleTaskStatus } from "../../features/tasks/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { colors, radius, screenStyles, shadows, spacing, statusColor, textSize } from "../../theme";
import { TasksStackParamList } from '../../types';

type Props = NativeStackScreenProps<TasksStackParamList,'TaskDetail'>
const TaskDetailScreen = ({navigation,route}:Props) => {
  const {taskId} = route.params
  const dispatch = useAppDispatch()
  const task =useAppSelector(selectTaskById(taskId))
  if (!task) {
    return null
  }
  const estadoVisual = isPending(task) ? 'Pendiente' : task.status
  const { background, text } = statusColor[estadoVisual]

  const handleToogle = ()=>{
    dispatch(toogleTaskStatus(task.id))
  }
const handleDelete =()=>{
  dispatch(deleteTask(task.id))
  navigation.goBack()
}
  return (
    <View style={screenStyles.container}>
      <Pressable style={styles.buttonBack} onPress={()=>navigation.goBack()}><Lucide name="chevron-left" size={20} color={colors.textGray} /></Pressable>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.button,{backgroundColor:background}]}>
          <Text style={[styles.textButton, { color: text }]}>{estadoVisual}</Text>
        </View>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.containerDetail}>
          <View style={[styles.detail, { borderBottomWidth: 1, borderBottomColor: '#CFCFCF', paddingBottom: 12 }]}>
            <Text>Categoría</Text>
            <View style={[styles.button, styles.buttonCategory]}>
              <Text style={[styles.textButton, { fontWeight: 600 }]}>{task.category}</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text>Fecha</Text>
            <View style={[styles.button,  styles.buttonCategory]}>
              <Text style={[styles.textButton, { fontWeight: 600 }]}>{task.date}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.subtitle}>Descripción</Text>
        <Text style={styles.description}>{task.description}</Text>
      </ScrollView>
      <TouchableOpacity
        style={[styles.buttonAction, task.status === 'Completado' ? styles.actionUndo : styles.actionDone]}
        onPress={handleToogle}
        activeOpacity={0.85}
      >
        {task.status === 'Completado' ?
          (<><Lucide name="loader" size={20} color={colors.textPurple} /><Text style={[styles.buttonText, { color: colors.textPurple }]}>Desmarcar</Text></>)
          :
          (<><Lucide name="check" size={20} color={colors.textGreen} /><Text style={[styles.buttonText, { color: colors.textGreen }]}>Marcar como Completado</Text></>)
        }
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonAction, { backgroundColor: colors.red }]} onPress={handleDelete} activeOpacity={0.85}>
        <Lucide name="trash" size={20} color={colors.textRed} />
        <Text style={[styles.buttonText, { color: colors.textRed }]}>Eliminar Tarea</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  containerTaskDetail: {
    flex: 1,
    width: '100%',
    padding: spacing.lg,
    gap: spacing.sm,
    alignItems: 'flex-start'

  },
  buttonBack: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.softGray,
    borderRadius: '100%'
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    paddingTop: spacing.lg,
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  button:{
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    alignItems: 'center'
  },
  buttonCategory:{
    backgroundColor:colors.softGray
  },
  textButton: {
    fontSize: textSize.text,
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
    gap: 12
  },
  detail: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  subtitle: {
    color: colors.text,
    fontSize: textSize.title,
    fontWeight: 'bold'
  },
  description:{
    color:colors.text,
    fontSize:textSize.text+1,
    lineHeight:spacing.xl
  },
  buttonAction: {
    flexDirection: 'row',
    width: '100%',
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    gap: 4
  },
  buttonText: {
    fontSize: textSize.subTitle,
    fontWeight: 'bold'
  },
  actionUndo: {
    backgroundColor: colors.purple
  },
  actionDone: {
    backgroundColor: colors.green
  },
})
export default TaskDetailScreen