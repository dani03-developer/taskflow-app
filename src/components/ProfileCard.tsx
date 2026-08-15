import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { border, colors, shadows, textSize } from "../theme";
type ProfileProps = {
    name: string,
    role: string,
    image: ImageSourcePropType,
    totalTasks?: number
}

const ProfileCard = ({name, role, image, totalTasks}: ProfileProps) => {
  return (
    <View style={styles.header}>
        <View style={styles.avatarHeader}>
            <Image source={image} style={styles.avatarImage} />
        </View>
        <View style={{gap:4}}>
            <Text style={styles.headerText}>{name}</Text>
            <Text>{role}</Text>
            {totalTasks !== undefined && <Text>Total de tareas: {totalTasks}</Text>}
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
     header:{
    width:'100%',
    backgroundColor: colors.backgroundColor,
    shadowColor: shadows.shadowColor,
    shadowOffset: shadows.shadowOffset,
    shadowOpacity: shadows.shadowOpacity,      
    shadowRadius: shadows.shadowRadius,
    elevation: shadows.elevation,
    flexDirection:'row',
    gap:16,
    padding:16,
    alignItems:'center',
    borderRadius:border.borderRadius
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
export default ProfileCard;