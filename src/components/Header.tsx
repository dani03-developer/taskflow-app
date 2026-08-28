import LottieView from 'lottie-react-native';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { colors, spacing, textSize } from "../theme";
type ProfileProps = {
    name: string,
    image: ImageSourcePropType,
}

const Header = ({ name, image }: ProfileProps) => {
    return (
        <>
            <View style={styles.containerHeader}>
                <LottieView
                    source={require('../lotties/bep-fem.json')}
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
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,

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
        fontSize: textSize.title,
        fontWeight: '700',
        color: colors.text
    },
    text: {
        fontSize: textSize.text,
        color: colors.textGray
    }
})
export default Header