import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import bep1 from '../assets/lotties/bep.json';
import bep2 from '../assets/lotties/bepPink.json';
import { useAppSelector } from '../store/hooks/hooks';
import { colors, fonts, spacing, textSize } from "../theme";
//falta crear CreateProfileScreen para modificar el name (en progreso)
const Header = () => {
    const name = useAppSelector(state => state.profile.profile?.name)
    const avatar = useAppSelector(state => state.profile.profile?.avatar)
    return (
        <>
            <View style={styles.containerHeader}>
                <LottieView
                    source={avatar ? bep1:bep2}
                    autoPlay
                    loop
                    style={styles.avatarHeader}
                />
                <View style={styles.containerData}>
                    <Text style={styles.gettingText}>Hola {name}!</Text>
                    <Text style={styles.text}>Seguimos avanzando?</Text>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        width: '100%',
        gap: spacing.sm,

    },
    avatarHeader: {
        width: 60,
        height: 60,
    },
    containerData: {
        width: '100%',
        gap: 2,
        justifyContent: 'center'
    },
    gettingText: {
        fontSize: textSize.title + 4,
        color: colors.text,
        fontFamily: fonts.BepFont,
    },
    text: {
        fontSize: textSize.text,
        color: colors.textGray,
        fontFamily: fonts.Interregular
    }
})
export default Header