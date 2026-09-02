import { onAuthStateChanged } from 'firebase/auth'; //este método se utiliza para escuchar los cambios en el estado de autenticación del usuario en tiempo real. Se suscribe a los cambios de autenticación y ejecuta una función de devolución de llamada cada vez que el estado de autenticación cambia (por ejemplo, cuando un usuario inicia sesión o cierra sesión).
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../config/firebase';
import { selectAuthLoading, selectCurrentUser, setUser } from '../features/auth/AuthSlice';
import { resetStreak, setStreak } from '../features/streak/streakSlice';
import { getStreak, updateStreakInDB } from '../services/streak/streakService';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import AppNavigator from './AppNavigator';
import AuthStack from './AuthStack';
const RootNavigator = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentUser)
    const isLoading = useAppSelector(selectAuthLoading)
    const streak = useAppSelector((state) => state.streak.contador)
    const ultimaFecha = useAppSelector((state) => state.streak.ultimaFecha)
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
                dispatch(resetStreak()) 
            } else {
                dispatch(setUser(null))
            }
        })
        return unsubscribe //cerrar el listener cuando el componente se desmonte para evitar fugas de memoria y comportamientos inesperados.
    }, [dispatch])
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    }
    useEffect(() => {
        const cargarStreak = async () => {
            if(!user) return
            const data = await getStreak(user.uid)  //seleccionamos solo su id
            if(data){
                dispatch(setStreak({ contador: data.streak, ultimaFecha: data.ultimaFecha }))

            }
        }
        cargarStreak()
    }, [user])
    useEffect(() => {
        if (!user || !ultimaFecha) return
        updateStreakInDB(user.uid, streak, ultimaFecha)
    }, [streak, ultimaFecha, user])

    return (
        user ? <AppNavigator /> : <AuthStack />
    )


}
export default RootNavigator