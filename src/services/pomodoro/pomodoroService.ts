import { db } from "@/src/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
export const updatePomodoroInDB = async (uid: string, minutosTotales: number) => {
    const ref = doc(db, 'pomodoro', uid)
    await setDoc(ref, { minutosTotales})
}

export const getPomodoroData = async (uid: string) => {
    const ref = doc(db, 'pomodoro', uid)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
}