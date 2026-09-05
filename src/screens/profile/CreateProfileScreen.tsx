import { setProfile } from '@/src/features/porfile/profileSlice'
import { colors, fonts, screenStyles, textSize } from '@/src/theme'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import bep1 from '../../assets/Bep.png'
import bep2 from '../../assets/bepPink.png'
import RulerPickerTime from '../../components/RulerPickerTime'
import { selectCurrentUser } from '../../features/auth/AuthSlice'
import { saveProfile } from '../../services/profile/profileService'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
const CreateProfileScreen = () => {
    const dispatch = useAppDispatch()
    const [name, setname] = useState('')
    const [career, setCareer] = useState('')
    const [error, setError] = useState('')
    const [loading, isLoading] = useState(false)
    const [avatar, setAvatar] = useState(true)
    const [meta, setMeta] = useState(0)
    const [formOpen, setFormOpen] = useState(false)
    const user = useAppSelector(selectCurrentUser);
    const handleRegister = async () => {
        setError('')
        isLoading(true)
        if (!name.trim() || !career.trim()) {
            setError('Completá todos los campos')
            return
        }
        if (meta === 0) {
            setError('Error escoge una meta diaria de estudio')
            return
        }
        try {
            const newPorfile = {
                avatar,
                name,
                career,
                studygoal: meta,
            }
            await saveProfile(user?.uid ?? '', newPorfile)
            setAvatar(true)
            setname('')
            setCareer('')
            setMeta(0)
            dispatch(setProfile(newPorfile))
        } catch (error) {
            console.error('Error al crear el perfil:', error);
        }
    }
    return (
        <View style={[screenStyles.container, screenStyles.spacingContainer, styles.container]}>
            <View style={styles.containerAnimation}>
                <Text style={styles.title}>Hola! soy bep, es hora {"\n"} de crear tu perfil </Text>
                <LottieView
                    source={require('../../assets/lotties/bepPerfil.json')}
                    autoPlay
                    resizeMode='contain'
                    loop
                    style={{ width: 200, height: 200 }}
                />
            </View>
            <View style={styles.form}>
                <Text style={[styles.subtitle, { textAlign: 'center' }]}>Selecciona tu avatar:</Text>
                <View style={styles.containerImage}>
                    <Pressable onPress={() => setAvatar(true)} style={avatar ? styles.avatarSeleccionado : styles.avatarNormal}><Image source={bep1} style={styles.image} /></Pressable>
                    <Pressable onPress={() => setAvatar(false)} style={!avatar ? styles.avatarSeleccionado : styles.avatarNormal}> <Image source={bep2} style={styles.image} /></Pressable>
                </View>
                <Text style={styles.subtitle}>Nombre o Apodo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su nombre o Apodo"
                    value={name}
                    onChangeText={setname}
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
                    initialValue={8}
                    min={1}
                    max={12}
                    step={1}
                    unit="hs"
                    title="Horas de estudio"
                    iconName="graduation-cap"
                />
                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : null}

                <Pressable
                    style={styles.button}
                    disabled={loading}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>{loading ? <ActivityIndicator color={colors.backgroundColor} /> : "Crear Perfil"}</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default CreateProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    containerAnimation: {
        alignItems: 'center',
        marginTop: 50,
        gap: 4
    },

    title: {
        fontSize: textSize.bigTitle,
        fontFamily: fonts.BepFont,
        textAlign: 'center',

    },
    form: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        gap: 5,

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