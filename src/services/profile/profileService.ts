import { db } from "@/src/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { userProfile } from '../../types/index';

//subimos o guardamos un perfil
export const saveProfile = async (userId: string, profile: userProfile)=>{
    const profileRef = doc(db,'user',userId)
    await setDoc(profileRef, profile)
}
//obtenemos el perfil
export const getProfile = async (userId: string): Promise <userProfile | null> => {
    const profileRef = doc(db, 'user', userId)
    const snap = await getDoc(profileRef)
    return snap.exists() ? (snap.data() as userProfile) : null
}
//verificamos que exista un perfil
export const hasProfile = async (userId:string): Promise <boolean>=>{
    const profileRef = doc(db, 'user', userId)
    const snap = await getDoc(profileRef)
    return snap.exists()
}