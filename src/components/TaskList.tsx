import { useCallback } from "react";
import { FlatList } from "react-native";
import type { taskFilter } from "../features/tasks/TasksSlice";
import { spacing } from '../theme';
import type { Task } from "../types";
import CardTask from './CardTask';
import EmptyState from "./EmptyState";
type TaskListProps = {
  tasks: Task[]
  filter: taskFilter
  onTaskPress: (taskId: string) => void
}

const keyExtractor = (item: Task) => item.id

const TaskList = ({ tasks, filter, onTaskPress }: TaskListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <CardTask
        task={item}
        onPress={() => onTaskPress(item.id)}
      />
    ), [onTaskPress]
  )
  return (
    <FlatList
      data={tasks}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyState filter={filter} />}
      contentContainerStyle={{ flexGrow: 1, gap: 8, alignItems: 'center', paddingHorizontal: spacing.xl }}
      showsVerticalScrollIndicator={false}

      initialNumToRender={8} //cantidad de tarjetas a renderizar
      windowSize={7}
      maxToRenderPerBatch={8}
    />
  )
}

export default TaskList
