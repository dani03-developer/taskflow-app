import { Lucide, LucideIconName } from "@react-native-vector-icons/lucide";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FILTERS, selectFilter, setFilter, taskFilter } from "../features/tasks/TasksSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { colors, fonts, spacing } from '../theme';
const FILTER_KEYS = Object.keys(FILTERS) as taskFilter[]
const TABS: Record<taskFilter, { icon: LucideIconName; textActive: string; BackgroundActive: string }> = {
  todo: { icon: 'loader', textActive: colors.textPurple, BackgroundActive: colors.purple },
  completed: { icon: 'check', textActive: colors.textGreen, BackgroundActive: colors.green },
  pending: { icon: 'circle-dot-dashed', textActive: colors.textOrange, BackgroundActive: colors.orange },
}

const FilterBar = () => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectFilter)
  return (
    <View style={styles.bar}>
      {FILTER_KEYS.map((key) => {
        const isActive = filter === key //aquí compara los filtros con el selecionado
        const tab =TABS[key] //unimos los filtros con la tabs
        return (
          <TouchableOpacity
            key={key}
            style={[styles.tab, isActive && { backgroundColor: tab.BackgroundActive }]}
            onPress={() => dispatch(setFilter(key))}
            activeOpacity={0.8}
          >
            <Lucide name={tab.icon} size={15} style={[{ color: colors.textGray }, isActive && { color: tab.textActive }]} />
            <Text style={[styles.label, isActive && { color: tab.textActive }]}>{FILTERS[key]}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default FilterBar
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.deepGray,
    borderRadius: 100,
    height: 50,
    gap: spacing.xs
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: spacing.sm + 2,
    borderRadius: 100
  },
  label: {
    fontSize: 13,
    fontFamily:fonts.Intersemibold,
    color: colors.textGray
  },
})