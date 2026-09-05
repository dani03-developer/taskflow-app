import { onAuthStateChanged } from 'firebase/auth'; //este método se utiliza para escuchar los cambios en el estado de autenticación del usuario en tiempo real. Se suscribe a los cambios de autenticación y ejecuta una función de devolución de llamada cada vez que el estado de autenticación cambia (por ejemplo, cuando un usuario inicia sesión o cierra sesión).
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { selectAuthLoading, selectCurrentUser, setUser } from '../features/auth/AuthSlice';
import { resetPomodoro, setPomodoro } from '../features/pomodoro/PomodoroSlice';
import { clearProfile, setProfile } from '../features/porfile/profileSlice';
import { getyesterdayString, resetStreak, setStreak } from '../features/streak/streakSlice';
import { getTodayString } from '../features/tasks/TasksSlice';
import CreateProfileScreen from '../screens/profile/CreateProfileScreen';
import AnimatedSplashScreen from '../screens/splash/SplashScreen';
import { getPomodoroData, updatePomodoroInDB } from '../services/pomodoro/pomodoroService';
import { getProfile } from '../services/profile/profileService';
import { getStreak, updateStreakInDB } from '../services/streak/streakService';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import AppNavigator from './AppNavigator';
import AuthStack from './AuthStack';
const RootNavigator = () => {
    const [profileChecked, setProfileChecked] = useState(false)
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentUser)
    const isLoading = useAppSelector(selectAuthLoading)
    const [splashMinTime, setSplashMinTime] = useState(true)
    const profile = useAppSelector((state) => state.profile.profile)
    const hasProfile = profile !== null
    const streak = useAppSelector((state) => state.streak.contador)
    const ultimaFecha = useAppSelector((state) => state.streak.ultimaFecha)
    const minutosTotales = useAppSelector((state) => state.pomodoro.minutosTotales)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => { //onAuthStateChanged es un listener que se ejecuta cada vez que cambia el estado de autenticación del usuario, ya sea que inicie sesión o cierre sesión. Se pasa la función de devolución de llamada que recibe el objeto user si hay un usuario autenticado o null si no hay usuario.
            if (user) {
                dispatch(
                    setUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    })
                )
            } else {
                dispatch(setUser(null))
                dispatch(resetStreak())
                dispatch(clearProfile())
                dispatch(resetPomodoro())
                setProfileChecked(false)
            }
        })
        return unsubscribe //cerrar el listener cuando el componente se desmonte para evitar fugas de memoria y comportamientos inesperados.
    }, [dispatch])
    //Profile data
    useEffect(() => {
        const verificar = async () => {
            if (!user) {
                setProfileChecked(false)
                return
            }
            const profile = await getProfile(user.uid)
            if (profile) {
                dispatch(setProfile(profile))   // lo cargás al slice
            }
            setProfileChecked(true)
        }
        verificar()
    }, [user])
    //Streak
    useEffect(() => {
        const cargarStreak = async () => {
            if (!user) return
            const data = await getStreak(user.uid)  //seleccionamos solo su id
            if (data) {
                const hoy = getTodayString()
                const ayer = getyesterdayString()
                const sigueViva = data.ultimaFecha === hoy || data.ultimaFecha === ayer
                if (!sigueViva) {
                    await updateStreakInDB(user.uid, 0, data.ultimaFecha) //se corta y se actualiza firebase con 0
                    dispatch(setStreak({ contador: 0, ultimaFecha: data.ultimaFecha }))
                } else {
                    dispatch(setStreak({ contador: data.streak, ultimaFecha: data.ultimaFecha })) //sigue viva carga el valor actual
                }

            }
        }
        cargarStreak()
    }, [user])
    useEffect(() => {
        if (!user || !ultimaFecha) return
        updateStreakInDB(user.uid, streak, ultimaFecha)
    }, [streak, ultimaFecha, user])

    //pomodoro
    useEffect(() => {
        const cargar = async () => {
            if (!user) return
            const data = await getPomodoroData(user.uid)
            if (data) {
                dispatch(setPomodoro({minutosTotales: data.minutosTotales}))
            }
        }
        cargar()
    }, [user])
    useEffect(() => {
        if (!user) return
        updatePomodoroInDB(user.uid, minutosTotales)
    }, [minutosTotales, user])
    //Splash Screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashMinTime(false)   // después de 3.5 seg, el tiempo mínimo se cumplió
        }, 4000)   // la duración de tu animación
        return () => clearTimeout(timer)
    }, [])

    if (isLoading || splashMinTime) {
        return <AnimatedSplashScreen />
    }
    if (!user) {
        return <AuthStack />              // no logueado
    }
    if (user && !profileChecked) {
        return <AnimatedSplashScreen />   // verificando perfil (o un spinner)
    }
    if (!hasProfile) {
        return <CreateProfileScreen />      // logueado, sin perfil crear uno
    }

    return <AppNavigator />
}
export default RootNavigator