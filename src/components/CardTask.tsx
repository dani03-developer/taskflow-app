import { Lucide } from "@react-native-vector-icons/lucide";
import { memo } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isPending } from "../features/tasks/TasksSlice";
import { colors, radius, shadows, spacing, statusColor, textSize } from "../theme";
import type { Task } from "../types";
type CardTaskProps = {
  task: Task //este es el props de tipo task que se va a recibir en el componente CardTask
  onPress: (task:Task)=>void
}

const CardTask = memo(function CardTask({ task, onPress}: CardTaskProps) {
  const estadoVisual = isPending(task) ? 'Pendiente' : task.status
  const { background, text } = statusColor[estadoVisual]
  return (
    <TouchableOpacity onPress={() => onPress(task)} hitSlop={8} activeOpacity={0.60} style={styles.cardTask} key={task.id}>
      <View style={styles.containerInfo}>
        <View style={styles.headerTask}>
        <View style={{flexDirection:'row', gap:2}}>
          <View style={[styles.buttonHeader, { backgroundColor: background }]}>
            <Text style={[styles.textButton, { color: text }]}>{estadoVisual}</Text>
          </View>
          <View style={[styles.buttonHeader]}>
            <Text style={[styles.textButton]}>{task.category}</Text>
          </View>
        </View>
        <View style={styles.buttonHeader}>
            <Text style={styles.textButton}>{task.date}</Text>
          </View>
      </View>
      <View style={styles.infoTask}>
        <Text style={styles.titleTask}>{task.title}</Text>
        <Text numberOfLines={1} style={styles.descriptionTask}>{task.description}</Text>
      </View>
      </View>
      <Pressable><Lucide name="chevron-right" size={20} color={colors.darkGray}/></Pressable>
    </TouchableOpacity>
  )
})
const styles = StyleSheet.create({
  cardTask: {
    width: '92%',
    backgroundColor: colors.backgroundColor,
    shadowColor: shadows.shadowColor,
    shadowOffset: shadows.shadowOffset,
    shadowOpacity: shadows.shadowOpacity,
    shadowRadius: shadows.shadowRadius,
    elevation: shadows.elevation,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection:'row',
    alignItems: 'center',
    gap:6
  },
  containerInfo:{
    width:'95%',
    gap:6
  },
  headerTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHeader: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    backgroundColor: colors.softGray
  },
  textButton: {
    fontSize: textSize.textMin,
    fontWeight: 700,
    color: colors.textGray
  },
  infoTask: {
    gap: 2
  },
  titleTask:{
    color: colors.text,
    fontSize: textSize.title, 
    fontWeight: 'bold' 
  },
  descriptionTask:{
    fontSize: textSize.text, 
    color: colors.subText 
  }
})
export default CardTask