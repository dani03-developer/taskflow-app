import RulerPickerTime from "@/src/components/RulerPickerTime";
import { Lucide } from "@react-native-vector-icons/lucide";
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';
import { completarPomodoro } from "../../features/pomodoro/PomodoroSlice";
import { updateStreak } from '../../features/streak/streakSlice';
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { colors, fonts, radius, screenStyles, spacing, textSize } from '../../theme';
const { width } = Dimensions.get('window')
const strokeWidth = 20
const svgSize = width * 0.9 //el circulo ocupará el 90% de la pantalla
const center = svgSize / 2 //lo centraliza mitad y mitad
const r = center - strokeWidth / 2 //calcula el radio dependiendo del centro y del grosor
const circumference = 2 * Math.PI * r
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const PomodoroScreen = () => {
  const dispatch = useAppDispatch()
  const animatedOffset = useSharedValue(0)
  const time = useAppSelector((state) => state.pomodoro.time)
  const workTime =time * 60; //minutos está en segundos
  const [isRuning, setRun] = useState(false)
  const [segundos, setSegundos] = useState(workTime)
  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  const tiempo = `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`
  const progress = Math.round((segundos * 100) / workTime)
  const animationRef = useRef<LottieView>(null)
  const actualScene = useRef(0)
  const [formOpen, setFormOpen] = useState(false)
  
  useEffect(() => {
    if (!isRuning) return

    const intervalo = setInterval(() => {
      setSegundos((prev) => (prev > 0 ? prev - 1 : prev))
    }, 1000)

    return () => clearInterval(intervalo)   // limpieza al desmontar
  }, [isRuning])

  useEffect(() => {
    if (segundos > 0) return
    dispatch(completarPomodoro(workTime / 60))
    dispatch(updateStreak())
  }, [segundos, workTime])

  useEffect(() => {
    if (isRuning) return
    setSegundos(workTime)
  }, [workTime])

  useEffect(() => {
    const target = circumference * (segundos / workTime)
    animatedOffset.value = withTiming(target, { duration: 1000 })  // 1s = el hueco entre segundos
  }, [segundos,workTime])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value
  }))

  const onPressStart = useCallback(() => {
    setRun(true)
  }, [segundos])

  const onPressRestart = useCallback(() => {
    setRun(false)
    setSegundos(workTime)
    animationRef.current?.reset()
    actualScene.current = 0
  }, [workTime])

  useEffect(() => {
    if (isRuning) {
      if (progress <= 66 && progress > 33 && actualScene.current < 1) {
        animationRef.current?.play(0, 27)
        actualScene.current = 1
      } else if (progress <= 33 && progress > 3 && actualScene.current < 2) {
        animationRef.current?.play(27, 72)
        actualScene.current = 2
      } else if (segundos <= 0 && actualScene.current < 3) {
        animationRef.current?.play(74, 149)
        actualScene.current = 3
      }
    } else {
      animationRef.current?.pause()
    }
  }, [isRuning, progress, segundos])

  return (
    <View style={[screenStyles.container, screenStyles.spacingContainer, styles.pomodoroContainer]}>
      <Text style={styles.title}>Focus</Text>
      <View style={{ position: 'relative' }}>
        <Svg width={svgSize} height={svgSize} style={{ transform: [{ rotate: '-90deg' }] }}>
          <Circle
            cx={center}
            cy={center}
            r={r}
            stroke={colors.deepGray}
            strokeWidth={strokeWidth}
            fill='none'
          ></Circle>
          <AnimatedCircle
            cx={center}
            cy={center}
            r={r}
            stroke={colors.lightblue}
            strokeWidth={strokeWidth}
            fill='none'
            strokeDasharray={circumference} //strokeDasharray convierte el círculo en línea punteada con un inicio y fin
            animatedProps={animatedProps}
            strokeLinecap={'round'}
          />
        </Svg>
        <View style={styles.lottieWrapper}>
          <LottieView
            source={require('../../assets/lotties/pomodoro.json')}
            ref={animationRef}
            autoPlay={false}
            loop={false}
            onAnimationFinish={() => {
              if (actualScene.current === 3) {
                setTimeout(() => {
                  setRun(false)
                  animationRef.current?.reset()
                  animationRef.current?.play(0, 0)
                  actualScene.current = 0
                  setSegundos(workTime)
                }, 2000)
              }
            }}
            style={{ width: svgSize * 0.8, height: svgSize * 0.8 }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => setFormOpen(true)}>
         <Text style={styles.min}>{tiempo} min</Text>
      </TouchableOpacity>

      {!isRuning && segundos === workTime ? <TouchableOpacity //lo que sea que esté en isRuning para que aparezca el empezar debe ser false
        activeOpacity={0.85}
        style={[styles.button, { backgroundColor: colors.purple, }]}
        onPress={onPressStart}
      >
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity> :
        <View style={styles.containerModificator}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { width: '30%', backgroundColor: colors.orange }]}
            onPress={() => setRun((prev) => !prev)}
          >
            {isRuning ?
              <Lucide name="pause" size={25} color={colors.textOrange} /> : <Lucide name="play" size={25} color={colors.textOrange} />}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { width: '30%', backgroundColor: colors.red }]}
            onPress={onPressRestart}
          >
            <Lucide name="rotate-ccw" size={25} color={colors.textRed} />
          </TouchableOpacity>
        </View>}
        <RulerPickerTime
          onClose={() => setFormOpen(false)}
          visibleForm={formOpen}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  pomodoroContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxl
  },
  lottieWrapper: {
    ...StyleSheet.absoluteFillObject,   // ocupa todo el cuadrado del círculo
    alignItems: 'center',                // centra al Lottie horizontal
    justifyContent: 'center',            // y vertical
  },
  title: {
    fontSize: textSize.bigTitle+6,
    color: colors.text,
    fontFamily: fonts.BepFont,
  },
  min: {
    fontSize: textSize.bigTitle + 4,
    fontFamily: fonts.Interbold,
    color: colors.text,
  },
  button: {
    padding: spacing.md,
    width: '60%',
    borderRadius: radius.lg + 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.textPurple,
    fontSize: textSize.title,
    fontFamily:fonts.Interbold
  },
  containerModificator: {
    gap: 5, flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default PomodoroScreen