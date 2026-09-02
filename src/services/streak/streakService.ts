import { db } from "@/src/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
export const updateStreakInDB = async (
    userId: string,
    streak: number,
    ultimaFecha: string
) => {
    const streakRef = doc(db, 'streak', userId)   // ← el id del doc es el userId

    await setDoc(streakRef, {
        streak,
        ultimaFecha,
    })
}
export const getStreak = async (userId: string) => {
    const streakRef = doc(db, 'streak', userId)
    const snap = await getDoc(streakRef)
    return snap.exists() ? snap.data() : null
}