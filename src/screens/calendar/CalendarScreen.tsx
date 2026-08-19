import { Lucide } from "@react-native-vector-icons/lucide";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CalendarComponent from '../../components/Calendar';
import { colors, textSize } from '../../theme';
import { Task } from "../../types";
type Props ={
  tasks: Task[]
}
const CalendarScreen =({tasks}:Props)=>{
    return(
        <>
            <View style={styles.container}>
                <Pressable style={styles.buttonBack}><Lucide name="chevron-left" size={20} color={colors.textGray}/></Pressable>
                <Text style={styles.title}>Actividad</Text>
                <CalendarComponent tasks={tasks}></CalendarComponent>
                <Text style={[styles.title, {fontSize:textSize.title}]}>Lista de hoy:</Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.backgroundColor,
    gap: 10
  },
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