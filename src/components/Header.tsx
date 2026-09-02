import LottieView from 'lottie-react-native';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { colors, fonts, spacing, textSize } from "../theme";
type ProfileProps = {
    name: string,
    image: ImageSourcePropType,
}
//falta crear CreateProfileScreen para modificar el name (en progreso)
const Header = ({ name, image }: ProfileProps) => {
    return (
        <>
            <View style={styles.containerHeader}>
                <LottieView
                    source={require('../assets/lotties/bep-fem.json')}
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
        fontSize: textSize.title+4,
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