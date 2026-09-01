import { Lucide } from "@react-native-vector-icons/lucide";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import avatar from '../../assets/fem.png';
import TaskList from "../../components/TaskList";
import { selectPendingTasks, selectTaskStats } from "../../features/tasks/TasksSlice";
import type { RootState } from '../../store';
import { useAppSelector } from "../../store/hooks/hooks";
import { colors, fonts, radius, screenStyles, shadows, spacing, textSize } from "../../theme";
import { ProfileStackParamList } from "../../types";
type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>
const ProfileScreen = ({ navigation }: Props) => {
  const { pending, completed } = useAppSelector(selectTaskStats)
  const pendingTasks = useAppSelector(selectPendingTasks)
  const { completados, minutosTotales } = useSelector((state: RootState) => state.pomodoro) //accede a los estados de completado y minutos totales a través de store
  const streak = useAppSelector((state) => state.streak.contador)
  const workTime = 8 //hs
  const workTimetoMin = 8 *60 //hs
  const progress = minutosTotales === 0 ? 0 : Math.min(100,Math.round((minutosTotales*100)/workTimetoMin))
  const handleTaskPress = useCallback(
    (taskId: string) => {
      navigation.navigate('TaskDetail', { taskId })
    }, [navigation]
  )
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    if (streak > 0 ) {
      animationRef.current?.play(8, 209) //hay racha? bueno se muestra a partir del frame 8 en adelante
    } else {
      animationRef.current?.reset() //no hay? se muestra el frame gris 0
    }
  }, [completados])
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
                source={require('../../assets/lotties/fire.json')}
                ref={animationRef}
                autoPlay={false}
                loop
                style={{ width: 50, height: 50 }}
              />
              <Text style={styles.numbers}>{streak}</Text>
            </View>
            <View style={[styles.containerStreak, { backgroundColor: colors.green }]}>
              <Text style={[styles.text, { color: colors.textGreen }]}>Completado</Text>
              <Text style={[styles.numbers, { color: colors.textGreen }]}>{completed}</Text>
              <Text style={[styles.text, { color: colors.textGreen }]}>Mes</Text>
            </View>
            <View style={[styles.containerStreak, { backgroundColor: colors.orange }]}>
              <Text style={[styles.text, { color: colors.textOrange }]}>Pendientes</Text>
              <Text style={[styles.numbers, { color: colors.textOrange, fontSize: textSize.bigTitle }]}>{pending}</Text>
            </View>
          </View>
            <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso pomodoro</Text>
          <Text style={styles.progressValue}>{progress}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
         <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Tiempo estudiado: {minutosTotales}min</Text>
          <Text style={styles.progressLabel}>Meta: {workTime}hs</Text>
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
    fontSize: textSize.title + 2,
    fontFamily: fonts.Interbold,
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
    fontFamily: fonts.Intersemibold,
    fontSize: textSize.subTitle
  },
  career: {
    color: colors.textGray,
    fontFamily: fonts.Intermedium,
    fontSize: textSize.text
  },
  containerinfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg
  },
  containerStreak: {
    flex: 1,
    backgroundColor: colors.softGray,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    height: 85
  },
  numbers: {
    fontSize: textSize.title,
    fontFamily: fonts.Interbold,
    color: colors.textGray
  },
  text: {
    fontSize: textSize.textMin+1,
    fontFamily: fonts.Intersemibold,
    color: colors.textGray
  },
  progressCard: {
    width:'100%',
    backgroundColor: colors.backgroundColor,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
    shadowColor: shadows.shadowColor,
    shadowOffset: shadows.shadowOffset,
    shadowOpacity: shadows.shadowOpacity,      
    shadowRadius: shadows.shadowRadius,
    elevation: shadows.elevation,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: fonts.Intersemibold,
    color: colors.textGray
  },
  progressValue: {
    fontSize: 13,
    fontFamily: fonts.Intersemibold,
    color: colors.text
  },
  progressTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.deepGray,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.green
  },
});

export default ProfileScreen;