import { Lucide } from "@react-native-vector-icons/lucide";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CalendarComponent from '../../components/Calendar';
import { SEED_TASKS } from "../../data";
import { colors, screenStyles, textSize } from '../../theme';
import { Task } from "../../types";
const CalendarScreen =()=>{
    const [tasks] = useState<Task[]>(SEED_TASKS)
    return(
        <>
            <View style={screenStyles.container}>
                <Pressable style={styles.buttonBack}><Lucide name="chevron-left" size={20} color={colors.textGray}/></Pressable>
                <Text style={styles.title}>Actividad</Text>
                <CalendarComponent tasks={tasks}></CalendarComponent>
                <Text style={[styles.title, {fontSize:textSize.title}]}>Lista de hoy:</Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
  title:{
    fontSize:textSize.bigTitle,
    color: colors.text,
    fontWeight:'bold'
  },
  buttonBack:{
    width: 40,
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.softGray,
    borderRadius: '100%'
  }
})
export default CalendarScreen