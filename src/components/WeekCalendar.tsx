import { useMemo } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, radius, shadows, spacing, textSize } from '../theme';
const WeekCalendar = () => {
  const week = useMemo((): Date[] => {
    const now = new Date();
    const domingo = new Date(now)
    domingo.setDate(now.getDate() - now.getDay()); //date es el día del mes (1 al 31) y getDay el día de la semana (0-6)
    const dias: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(domingo)
      dia.setDate(domingo.getDate() + i);
      dias.push(dia);
    }
    return dias;
  }, [])
  return (
    <View style={styles.bar}>
      {week.map((day, i)=>{
        const isToday =  day.toDateString() === new Date().toDateString();
        const numDay = day.getDate();
        const nameDay = day.toLocaleDateString('es-AR', { weekday: 'short' });
        const upperCaseDay = nameDay.charAt(0).toUpperCase() + nameDay.slice(1);
        return(
          <View  key={`day-${String(i + 1).padStart(2,'0')}`} style={[styles.containerDay, isToday && {backgroundColor: colors.softGray, borderRadius: radius.md}]}>
            <Text style={styles.textDayName}>{upperCaseDay}</Text>
            <Text style={styles.textDay}>
              {numDay}
            </Text>  
          </View>
        );
      })}
    </View>
  )
}

export default WeekCalendar
const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.backgroundColor,
    shadowColor: shadows.shadowColor,
    shadowOffset: shadows.shadowOffset,
    shadowOpacity: shadows.shadowOpacity,
    shadowRadius: shadows.shadowRadius,
    elevation: shadows.elevation,
    flexDirection: 'row',
    borderRadius: radius.md,
    padding:spacing.xs
  },
  containerDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.lg
  },
   textDayName:{
    color:colors.subText,
    fontFamily:fonts.Intersemibold,
    fontSize:textSize.text
  },
  textDay:{
    color:colors.subText,
    fontFamily:fonts.Intermedium,
    fontSize:textSize.subTitle
  }
})