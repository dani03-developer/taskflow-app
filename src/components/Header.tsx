import { Image, StyleSheet, Text, View } from "react-native";
import avatar from "../assets/avatar.webp";
import { colors, shadows, textSize } from "../theme";
type HeaderProps = {
    name: string,
    totalTasks: number
}

const Header = ({name, totalTasks}: HeaderProps) => {
  return (
    <View style={styles.header}>
        <View style={styles.avatarHeader}>
            <Image source={avatar} style={styles.avatarImage} />
        </View>
        <View style={{gap:4}}>
            <Text style={styles.headerText}>{name}</Text>
            <Text>Total de tareas: {totalTasks}</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
     header:{
    width:'100%',
    backgroundColor: colors.backgroundColor,
    boxShadow: shadows.boxShadow,
    flexDirection:'row',
    gap:16,
    padding:16,
    alignItems:'center',
    borderRadius:10
  },
  avatarHeader:{
    width:40,
    height:40,
    borderRadius:20
  },
  avatarImage:{
    width:'100%',
    height:'100%'
  },
  headerText: {
   fontWeight:'bold',
   fontSize: textSize.subTitle
  }
})
export default Header;