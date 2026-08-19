import { Lucide } from "@react-native-vector-icons/lucide";

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, textSize } from '../theme';
export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Lucide name="square-check-big" size={50} color={colors.darkGray}/>
      <Text style={styles.title}>Todavía no tienes ninguna tarea</Text>
      <Text style={styles.subtitle}>Empieza por crear una con el botón + de abajo.</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2, // 64
    paddingHorizontal: spacing.xl,
    gap: spacing.sm
  },
  title: {
    fontSize: textSize.title,
    fontWeight: '800',
    color: colors.darkGray,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: textSize.subTitle,
    color: colors.darkGray,
    textAlign: 'center'
  }
})