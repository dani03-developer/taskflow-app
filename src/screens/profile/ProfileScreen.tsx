import { Lucide } from "@react-native-vector-icons/lucide";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from 'lottie-react-native';
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import avatar from '../../assets/fem.png';
import TaskList from "../../components/TaskList";
import { selectPendingTasks, selectTaskStats } from "../../features/tasks/TasksSlice";
import { useAppSelector } from "../../store/hooks/hooks";
import { colors, radius, screenStyles, spacing, textSize } from "../../theme";
import { ProfileStackParamList } from "../../types";
type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>
const ProfileScreen = ({ navigation }: Props) => {
  const { pending, completed } = useAppSelector(selectTaskStats)
  const pendingTasks = useAppSelector(selectPendingTasks)
  const handleTaskPress = useCallback(
    (taskId: string) => {
      navigation.navigate('TaskDetail', { taskId })
    }, [navigation]
  )
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.spacingContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Pressable><Lucide name="square-pen" size={textSize.bigTitle} color={'#464455'} /></Pressable>
      </View>
      <View style={styles.containerPerfil}>
        <Image source={avatar} style={styles.avatarImage} />
        <Text style={styles.name}>Daniela Machaca</Text>
        <Text style={styles.career}>Ingeniería en Software</Text>
        <View style={styles.containerinfo}>
          <View style={styles.containerStreak}>
            <LottieView
              source={require('../../lotties/fire.json')}
              autoPlay
              loop
              style={{ width: 45, height: 45 }}
            />
            <Text style={styles.numbers}>3</Text>
          </View>
          <View style={[styles.containerStreak,{ backgroundColor:colors.green}]}>
            <Text style={[styles.text, {color:colors.textGreen}]}>Completado</Text>
            <Text style={[styles.numbers, {color:colors.textGreen}]}>{completed}</Text>
            <Text style={[styles.text, {color:colors.textGreen}]}>Mes</Text>
          </View>
          <View style={[styles.containerStreak, { backgroundColor:colors.orange}]}>
            <Text style={[styles.text, {color:colors.textOrange}]}>Pendiente</Text>
            <Text  style={[styles.numbers,{color:colors.textOrange, fontSize:textSize.bigTitle}]}>{pending}</Text>
          </View>
        </View>
        <View style={styles.pomodoroStreak}>
          <View>
            <Text style={styles.text}>Horas Estudiadas</Text>
            <Text style={styles.numbers}>5 hs</Text>
          </View>
          <View style={{borderLeftWidth: 2, borderLeftColor:colors.subText, paddingLeft: spacing.lg}}>
            <Text style={styles.text}>Meta de hoy</Text>
            <Text style={styles.numbers}>8 hs</Text>
          </View>
        </View>
      </View>
      </View>
        <TaskList tasks={pendingTasks} filter="pending" onTaskPress={handleTaskPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: textSize.title +2,
    fontWeight: "bold",
    color: colors.text
  },
  containerPerfil: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3
  },
  avatarImage: {
    width: 120,
    height: 120
  },
  name: {
    color: colors.text,
    fontWeight: 700,
    fontSize: textSize.subTitle
  },
  career: {
    color: colors.textGray,
    fontWeight: 500,
    fontSize: textSize.text
  },
  containerinfo:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:spacing.sm,
    padding:spacing.lg
  },
  containerStreak:{
    flex:1,
    backgroundColor:colors.softGray,
    borderRadius:radius.lg,
    alignItems:'center',
    justifyContent:'center',
    padding:spacing.sm,
    height:85
  },
  numbers:{
    fontSize:textSize.title,
    fontWeight:'700',
    color:colors.textGray
  },
  text:{
    fontSize:textSize.text,
    fontWeight:'600',
    color:colors.textGray
  },
  pomodoroStreak:{
    width:'100%',
    flexDirection:'row',
    gap:spacing.md,
    padding:spacing.lg
  }
});

export default ProfileScreen;