{/*import { Lucide } from "@react-native-vector-icons/lucide";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from '../theme';
import { State, Task } from "../types";
type Props = {
    task: Task
    onChange:(tab:State)=>void
}
const TABS: Array<{ key: State; icon: string; label: string }> = [
    { key: 'Por Hacer', icon: 'loader', label: 'Por Hacer' },
    { key: 'Completado', icon: 'check', label: 'Completado' },
    { key: 'Pendiente', icon: 'circle-dot-dashed', label: 'Pendiente' }
]
const TabBar = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.bar}>
                    {TABS.map((tab) => {
                        return (
                            <>
                                <TouchableOpacity 
                                key={tab.key}
                                style={styles.tab}>
                                <Lucide name={tab.icon} size={20} color={colors.textGray}/>
                                <Text>{tab.label}</Text>
                                </TouchableOpacity>
                            </>
                        )

                    })
                    }
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    bar: {
        flexDirection: 'row',
        width: '100%',
        padding: spacing.md,
        backgroundColor: colors.darkGray,
        borderRadius: radius.lg,
        gap: spacing.sm
    },
    tab: {
        flex: 1,
        borderRadius: radius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.purple
    }
})
export default TabBar*/}