import { Lucide } from "@react-native-vector-icons/lucide";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CalendarComponent from '../../components/Calendar';
import { colors, screenStyles, textSize } from '../../theme';

const CalendarScreen =()=>{
    return(
        <>
            <View style={screenStyles.container}>
                <Pressable style={styles.buttonBack} ><Lucide name="chevron-left" size={20} color={colors.textGray}/></Pressable>
                <Text style={styles.title}>Actividad</Text>
                <CalendarComponent></CalendarComponent>
                <Text style={styles.title}>Lista de hoy:</Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
  title:{
    fontSize:textSize.title,
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