import { Lucide, LucideIconName } from "@react-native-vector-icons/lucide";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { taskFilter } from "../features/tasks/TasksSlice";
import { colors, spacing, textSize } from '../theme';
type Props = {
  filter: taskFilter
}
export default function EmptyState({ filter = 'todo'}: Props) {
  const MESSAGES: Record<taskFilter, { icon: LucideIconName; title: string; description: string }> = {
    todo: { icon: 'square-pen', title: 'Todavía no tienes ninguna tarea', description: 'Empieza por crear una con el botón + de abajo.' },
    completed: { icon: 'square-check-big', title: 'Aún no tienes tareas completadas', description: 'Las tareas completadas aparecerán aquí, completa una tarea primero.' },
    pending: { icon: 'circle-dot-dashed', title: '¡Bien Hecho! No tienes tareas pendientes', description: 'Las tareas vencidas aparecerán aquí' },
  }
  const mensaje = MESSAGES[filter]
  return (
    <View style={styles.container}>
      <Lucide name={mensaje.icon} size={50} color={colors.darkGray} />
      <Text style={styles.title}>{mensaje.title}</Text>
      <Text style={styles.subtitle}>{mensaje.description}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:spacing.md,
    gap: spacing.sm
  },
  title: {
    fontSize: textSize.title,
    fontWeight: '800',
    color: colors.darkGray,
    textAlign: 'center',

  },
  subtitle: {
    fontSize: textSize.subTitle,
    color: colors.darkGray,
    textAlign: 'center'
  }
})