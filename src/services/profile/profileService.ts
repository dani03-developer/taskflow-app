import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
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
    if(!snap.exists()) return null
    const data = snap.data()
    return {
        photoURL: data.photoURL ?? null,
        avatar: data.avatar ?? true,
        name: data.name ?? "",
        career: data.career ?? "",
        studygoal: data.studygoal ?? "",
    }
}
//verificamos que exista un perfil
export const hasProfile = async (userId:string): Promise <boolean>=>{
    const profileRef = doc(db, 'user', userId)
    const snap = await getDoc(profileRef)
    return snap.exists()
}
export const updateProfilePhoto = async (userId: string, photoURL: string) => {
    const profileRef = doc(db, 'user', userId);
    await updateDoc(profileRef, { photoURL });
};
export const updateProfileData = async (userId: string, profile: userProfile) => {
    const profileRef = doc(db, 'user', userId);
    await updateDoc(profileRef, profile);
    
};