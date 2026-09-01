import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categories } from "../data";
import { addTask, getTodayString } from '../features/tasks/TasksSlice';
import { useAppDispatch } from '../store/hooks/hooks';
import { colors, fonts, radius, textSize } from "../theme";
import type { Category } from '../types';
import CalendarComponent from './Calendar';
type Props = {
    visibleForm: boolean
    onClose: () => void

}
const TaskForm = ({ visibleForm, onClose }: Props) => {
    const dispatch = useAppDispatch()
    const insets = useSafeAreaInsets();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState<Category>( //definimos el tipo en este caso typescript
        categories[0]
    )
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [fechaError, setFechaError] = useState('')

    const [titleFocused, setTitleFocused] = useState(false)
    const [descriptionFocused, setDescriptionFocused] = useState(false)

    const isTitleValid = title.trim().length >= 5
    const isDescriptionValid = description.trim().length >= 10

    const [visible, setVisible] = useState(false);
    const [fecha, setFecha] = useState<Date | null>(null);
    const [fechaTouched, setFechaTouched] = useState(false)

    const isFechaValid = fecha !== null && fechaError === ''
    const isButtonDisabled = !isTitleValid || !isDescriptionValid || !isFechaValid

    const handleTitleChange = (text: string) => {
        setTitle(text)
        if (text.trim().length < 5) {
            setTitleError('El título debe tener al menos 5 caracteres.')
        } else {
            setTitleError('')
        }
    }

    const handleDescriptionChange = (text: string) => {
        setDescription(text)
        if (text.trim().length < 10) {
            setDescriptionError('La descripción debe tener al menos 10 caracteres.')
        } else {
            setDescriptionError('')
        }
    }

    const formatDateString = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const handleAddTask = () => {

        if (isButtonDisabled || !fecha) return //se sale de la función
        dispatch(addTask({
            title,
            description,
            category,
            date: formatDateString(fecha)
        }))

        Alert.alert('Éxito', 'Tarea capturada localmente.')

        setTitle('')
        setDescription('')
        setCategory(categories[0])
        setFecha(null)
        setFechaTouched(false)
        onClose();
    }

    return (
        <>
            <Modal
                animationType='slide'
                visible={visibleForm}
                transparent
            >
                <KeyboardAvoidingView
                    style={styles.overlay}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Pressable style={styles.backdropTouchable} onPress={onClose} />
                    <ScrollView
                        style={styles.formScroll}
                        contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}
                    >


                        <View style={styles.form}>
                            <View style={styles.grabber} />
                            <Text style={styles.fromText}>Nueva Tarea:</Text>
                            <TextInput
                                value={title}
                                style={[styles.input,
                                titleFocused && styles.inputFocused,
                                titleError && styles.inputError
                                ]}
                                onChangeText={handleTitleChange}
                                placeholder="¿Qué hay que hacer?"
                                autoCapitalize="sentences"
                                onFocus={() => setTitleFocused(true)}
                                onBlur={() => setTitleFocused(false)}
                            />

                            {titleError ? <Text style={styles.error}>{titleError}</Text> : null}


                            <TextInput
                                style={[styles.input,
                                styles.textArea, descriptionFocused && styles.inputFocused,
                                descriptionError && styles.inputError
                                ]}
                                placeholder="Descripción"
                                value={description}
                                onChangeText={handleDescriptionChange}
                                multiline
                                autoCapitalize="sentences"
                                onFocus={() => setDescriptionFocused(true)}
                                onBlur={() => setDescriptionFocused(false)}

                            />

                            {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}
                            <Text style={styles.fromText}>Categoría</Text>
                            <View style={styles.categories}>
                                {categories.map((item) => (
                                    <Pressable
                                        key={item}
                                        onPress={() => setCategory(item)}
                                        style={[
                                            styles.categoryButton,
                                            category === item && styles.categoryButtonSelected
                                        ]}
                                    >
                                        <Text style={styles.categoryText}>{item}</Text>
                                    </Pressable>
                                ))}
                            </View>
                            <Text style={styles.fromText}>¿Para Cuando?</Text>
                            <Pressable
                                style={[
                                    styles.fechaButton,
                                    fechaTouched && !isFechaValid && styles.inputError
                                ]}
                                onPress={() => setVisible(true)}
                            >
                                <Text style={styles.fechaText}>{fecha ? fecha.toLocaleDateString("es-AR") : "DD/MM/AA"}</Text>
                            </Pressable>
                            <Modal
                                animationType='fade'
                                visible={visible}
                                transparent
                            >
                                <View style={styles.backdrop}>
                                    <View style={styles.contenido}>
                                        <CalendarComponent
                                            onSelectDate={(date) => {
                                                const selected = new Date(date.year, date.month - 1, date.day)
                                                setFecha(selected)
                                                setFechaTouched(true)

                                                if (formatDateString(selected) < getTodayString()) {
                                                    setFechaError('Error debes poner una fecha actual o posterior')
                                                } else {
                                                    setFechaError('')
                                                }
                                            }}
                                        ></CalendarComponent>
                                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                            <Pressable style={styles.buttonOK} onPress={() => setVisible(false)}>
                                                <Text style={[styles.buttonText, { color: colors.softGray }]}>Aceptar</Text>
                                            </Pressable>
                                        </View>

                                    </View>
                                </View>
                            </Modal>
                            {fechaTouched && fechaError ? <Text style={styles.error}>{fechaError}</Text> : null}
                            <TouchableOpacity
                                disabled={isButtonDisabled}
                                onPress={handleAddTask}
                                activeOpacity={0.85}
                                style={[
                                    styles.button,
                                    isButtonDisabled && styles.buttonDisabled
                                ]}
                            >
                                <Text style={!isButtonDisabled ? styles.buttonText : styles.buttonDisabled}>Agregar Tarea</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    backdropTouchable: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.backColor,
    },
    formScroll: {
        flexGrow: 0,
        maxHeight: '90%',
        backgroundColor: colors.backgroundColor,
    },
    form: {
        width: '100%',
        padding: 18,
        gap: 12,
        backgroundColor: colors.backgroundColor
    },
    grabber: {
        alignSelf: 'center',
        width: 40,
        height: 4,
        borderRadius: 10,
        backgroundColor: colors.darkGray,
        marginBottom: 4
    },
    fromText: {
        fontSize: textSize.title,
        fontFamily: fonts.Interbold,
    },
    input: {
        height: 40,
        paddingHorizontal: 14,
        paddingVertical: 12,
        width: '100%',
        borderRadius: radius.md,
        backgroundColor: colors.softGray,
        color: colors.text,
        fontFamily: fonts.Intermedium,
    },
    inputFocused: {
        borderColor: colors.darkGray,
        borderWidth: 1
    },

    inputError: {
        borderColor: colors.textRed
    },

    textArea: {
        minHeight: 100,
        textAlignVertical: 'top'
    },

    error: {
        color: colors.textRed,
        fontFamily: fonts.Intermedium,
        marginTop: -6
    },

    categoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text
    },

    categories: {
        flexDirection: 'row',
        columnGap: 4,
        rowGap: 7,
        flexWrap: 'wrap'
    },

    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 9.5,
        borderRadius: radius.md,
        backgroundColor: colors.softGray
    },

    categoryButtonSelected: {
        borderColor: colors.darkGray,
        borderWidth: 1
    },

    categoryText: {
        color: colors.textGray,
        fontFamily: fonts.Intersemibold,
    },

    fechaButton: {
        width: '35%',
        borderRadius: radius.md,
        backgroundColor: colors.softGray,
        paddingVertical: 10,
        paddingHorizontal: 9.5,
        alignItems: 'center',
        borderColor: 'transparent'
    },
    fechaText: {
        color: colors.textGray,
        fontFamily: fonts.Intersemibold,
    },
    button: {
        marginTop: 10,
        backgroundColor: colors.purple,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center'
    },

    buttonDisabled: {
        backgroundColor: colors.softGray,
        color: colors.textGray,
        fontFamily: fonts.Interbold,
        fontSize: 16

    },

    buttonText: {
        color: colors.textPurple,
        fontFamily: fonts.Interbold,
        fontSize: textSize.subTitle
    },

    backdrop: {
        flex: 1,
        backgroundColor: colors.backColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contenido: {
        backgroundColor: colors.backgroundColor,
        borderRadius: 20,
        padding: 16,
        width: '85%',
        gap: 15
    },
    buttonOK: {
        backgroundColor: colors.text,
        borderRadius: radius.md,
        alignItems: 'center',
        width: '40%',
        padding: 6
    }
})

export default TaskForm