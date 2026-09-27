import { setProfile } from "@/src/features/porfile/profileSlice";
import { updateProfileData } from "@/src/services/profile/profileService";
import { colors, fonts, screenStyles, spacing, textSize } from '@/src/theme';
import { Lucide } from "@react-native-vector-icons/lucide";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import bep1 from '../../assets/Bep.png';
import bep2 from '../../assets/bepPink.png';
import RulerPickerTime from '../../components/RulerPickerTime';
import { selectCurrentUser } from '../../features/auth/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import type { ProfileStackParamList, userProfile } from '../../types';
type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfileScreen'>
const EditProfileScreen = ({ navigation }: Props) => {
    const profile = useAppSelector(state => state.profile.profile)
    const dispatch = useAppDispatch()
    const [name, setName] = useState(profile?.name ?? '')
    const [career, setCareer] = useState(profile?.career ?? '')
    const [avatar, setAvatar] = useState(profile?.avatar ?? true)
    const [meta, setMeta] = useState(profile?.studygoal ?? 0)
    const [photoURL, setPhotoURL] = useState<string | null>(profile?.photoURL ?? null)
    const [formOpen, setFormOpen] = useState(false)
    const [loading, isLoading] = useState(false)
    const user = useAppSelector(selectCurrentUser);

    const pickPhoto = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permission.granted) {
            Alert.alert('Error, permiso denegado', 'No se puede acceder a las imágenes. Por favor habilita el permiso en la configuración.', [
                {
                    text: 'Cerrar',
                    onPress: () => console.log('Alert cerrado'),
                    style: 'cancel',
                }
            ]);
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], //tipo de archivos
            allowsEditing: true, //permite editar la imagen al usuario
            aspect: [1, 1], //tamaño de la imagen en este caso es un círculo
            quality: 0.5  //calidad de la imagen mientras más bajo como 0.5 se comprimirá más la imagen
        })
        if (result.canceled) return
        setPhotoURL(result.assets[0].uri)
    }
    const updateProfile = async () => {
        if (!user) {
            Alert.alert('Error', 'No se encontró una sesión activa.')
            return
        }
        isLoading(true)
        try {
            const updatedProfile: userProfile = {
                avatar: avatar ?? true,
                name: (name ?? '').trim(),
                career: (career ?? '').trim(),
                studygoal: meta ?? 0,
                photoURL,
            }
            await updateProfileData(user.uid, updatedProfile)
           dispatch(setProfile(updatedProfile))
            navigation.goBack()
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el perfil. Probá de nuevo.', [
                {
                    text: 'Cerrar',
                    onPress: () => console.log('Alert cerrado, error: ', error),
                    style: 'cancel',
                }
            ]);
        } finally {
            isLoading(false)
        }
    }
    return (
        <ScrollView style={[screenStyles.container, screenStyles.spacingContainer, styles.container]}>
            <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}><Lucide name="chevron-left" size={20} color={colors.textGray} /></Pressable>
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.form}>
                <View style={styles.containerImage}>
                    <View style={styles.avatarContainer}>

                        <TouchableOpacity
                            onPress={pickPhoto}
                            disabled={loading}
                        >
                            <Image source={photoURL ? { uri: photoURL } : (avatar ? bep1 : bep2)} style={styles.avatarImage} />
                        </TouchableOpacity>
                        <View style={styles.avatarBadge}>
                            <Lucide name="camera" size={18} color={colors.text} />
                        </View>
                    </View>
                </View>
                <Text style={[styles.subtitle, { textAlign: 'center' }]}>Selecciona tu avatar:</Text>
                <View style={styles.containerImage}>
                    <Pressable onPress={() => setAvatar(true)} style={avatar ? styles.avatarSeleccionado : styles.avatarNormal}><Image source={bep1} style={styles.image} /></Pressable>
                    <Pressable onPress={() => setAvatar(false)} style={!avatar ? styles.avatarSeleccionado : styles.avatarNormal}><Image source={bep2} style={styles.image} /></Pressable>
                </View>
                <Text style={styles.subtitle}>Nombre o Apodo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su nombre o Apodo"
                    value={name}
                    onChangeText={setName}
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.subtitle}>Carrera:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre de tu carrera"
                    value={career}
                    onChangeText={setCareer}
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.subtitle}>Meta de estudio:</Text>
                <Pressable
                    style={[styles.input, { width: '30%', alignItems: 'center' }]}
                    onPress={() => setFormOpen(true)}
                >
                    <Text style={styles.subtitle}>{meta != 0 ? `${meta}:00 hs` : `${0}:00 hs`}</Text>
                </Pressable>
                <RulerPickerTime
                    visible={formOpen}
                    onClose={() => setFormOpen(false)}
                    onConfirm={(value) => setMeta(value)}
                    initialValue={meta ? meta : 8}
                    min={1}
                    max={12}
                    step={1}
                    unit="hs"
                    title="Horas de estudio"
                    iconName="graduation-cap"
                />

                <Pressable
                    style={styles.button}
                    disabled={loading}
                    onPress={updateProfile}
                >
                    <Text style={styles.buttonText}>{loading ? <ActivityIndicator color={colors.backgroundColor} /> : "Actualizar Perfil"}</Text>
                </Pressable>

            </View>
        </ScrollView>
    )
}

export default EditProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    buttonBack: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.softGray,
        borderRadius: '100%'
    },
    title: {
        fontSize: textSize.title + 2,
        fontFamily: fonts.Interbold,
        padding: 10

    },
    form: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        gap: 5,

    },
    avatarContainer: {
        width: 120,
        height: 120,
        position: 'relative',
        marginBottom: spacing.sm,
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2
    },
    avatarBadge: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: 14,
        backgroundColor: colors.deepGray,
        borderWidth: 2,
        borderColor: colors.deepGray,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtitle: {
        fontSize: textSize.subTitle,
        fontFamily: fonts.Interbold,
        color: colors.text
    },
    containerImage: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        gap: 5
    },
    image: {
        alignItems: 'center',
        width: 80,
        height: 80
    },
    input: {
        backgroundColor: colors.softGray,
        borderRadius: 8,
        padding: 12,
        marginBottom: 5,
    },

    button: {
        backgroundColor: colors.text,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10,
    },

    buttonText: {
        color: colors.backgroundColor,
        fontWeight: 'bold',
    },

    link: {
        textAlign: 'center',
        fontFamily: fonts.Interregular
    },

    error: {
        color: 'red',
        marginBottom: 8,
        fontFamily: fonts.Interregular
    },
    avatarSeleccionado: {
        borderWidth: 1.5,
        borderColor: colors.deepGray,
        borderRadius: 50,
    },
    avatarNormal: {
        borderWidth: 2,
        borderColor: 'transparent',
    },
})