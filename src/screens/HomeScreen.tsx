import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import avatar from "../assets/avatar.webp";
import ProfileCard from "../components/ProfileCard";
import { tasks } from "../data/index";
import { border, colors, textSize } from "../theme";
import type { Task } from '../types/index';
const HomeScreen = () => {
  const categories = ['💼 Trabajo', '🌿 Personal','📕 Estudio', '🏠 Hogar'] as const
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<(typeof categories)[number]>( //definimos el tipo en este caso typescript
    categories[0]
  )
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const [titleFocused, setTitleFocused] = useState(false)
  const [descriptionFocused, setDescriptionFocused] = useState(false)

  const isTitleValid = title.trim().length >= 5
  const isDescriptionValid = description.trim().length >= 10

  const [taskList, setTaskList] =useState<Task[]>([]) //va a recibir un array de tasks

  const [visible, setVisible] = useState(false);
  const [fecha, setFecha] =  useState<Date | null>(null);
  const [fechaError, setFechaError] = useState('')
  const [fechaTouched, setFechaTouched] = useState(false)

  const isFechaValid = fecha !== null
  const isButtonDisabled = !isTitleValid || !isDescriptionValid || !isFechaValid

  const handleTitleChange = (text: string) => {
    setTitle(text)
    if (text.trim().length < 5) {
      setTitleError('El título debe tener al menos 5 caracteres.')
    }else{
      setTitleError('')
    }
  }

  const handleDescriptionChange = (text: string) => {
    setDescription(text)
    if (text.trim().length < 10) {
      setDescriptionError('La descripción debe tener al menos 10 caracteres.')
    }else {
      setDescriptionError('')
    }
  }

  const formatoFecha = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleAddTask = () => {

    if (isButtonDisabled) return //se sale de la función
    if (!fecha) return
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      category,
      status: false,
      date: formatoFecha(fecha)
    }

    console.log(newTask)

    setTaskList((prev) => [newTask, ...prev])

    Alert.alert('Éxito', 'Tarea capturada localmente.')

    setTitle('')
    setDescription('')
    setCategory(categories[0])
  }


    const name = 'Daniela Machaca'
  return (
    <>
     <View style={styles.gretting}>
              <Text style={styles.gettingText}>Hola, buenas noches {name.slice(0, 7)} ☺️</Text>
            </View> 
            <ProfileCard name={name} role="Desarrolladora Frontend" image={avatar} totalTasks={tasks.length} />
            <View style={styles.form}>
              <Text style={styles.formTitle}>Nueva Tarea:</Text>

              <TextInput 
                value={title}
                style={[styles.input,
                  titleFocused && styles.inputFocused,
                  titleError && styles.inputError
                ]} 
                onChangeText={handleTitleChange}
                placeholder="¿Qué hay que hacer?"
                autoCapitalize="sentences"
                onFocus={()=> setTitleFocused(true)}
                onBlur={()=> setTitleFocused(false)}
              />

              {titleError ? <Text style={styles.error}>{titleError}</Text> : null}


              <TextInput 
                style={[styles.input,
                  styles.textArea, descriptionFocused && styles.inputFocused,
                  descriptionError && styles.inputError
                ]} 
                placeholder="Descripción" 
                value= {description}
                onChangeText={handleDescriptionChange}
                multiline 
                autoCapitalize ="sentences"
                onFocus={()=> setDescriptionFocused(true)}
                onBlur={()=> setDescriptionFocused(false)}

              />

              {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}
              <Text style={styles.formTitle}>Categoría</Text>
              <View style={styles.categories}>
                {categories.map((item)=>(
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
              <Text style={styles.formTitle}>¿Para Cuando?</Text>
              <Pressable
                style={[
                  styles.fechaButton,
                  fechaTouched && !isFechaValid && styles.inputError
                ]}
                onPress={()=>setVisible(true)}
              >
                <Text style={styles.fechaText}>{fecha ? fecha.toLocaleDateString("es-AR")  : "DD/MM/AA"}</Text>
              </Pressable>
              {fechaTouched && fechaError ? <Text style={styles.error}>{fechaError}</Text> : null}
              {visible && (
                <DateTimePicker
                  value={fecha ?? new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setVisible(false);
                    setFechaTouched(true);
                    if (selectedDate) {
                      setFecha(selectedDate);
                      setFechaError('');
                    } else {
                      setFechaError('Debes seleccionar una fecha.');
                    }
                  }}
                />
              )}
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
            {/*
            <View>
              <Text>Tareas Completadas {
                tasks.filter(t => t.status).length} / {tasks.length}</Text>
            </View>
            <View style={{width:'100%', gap:16}}>
               {tasks.map((task) => {
              return (
                <CardTask task={task} key={task.id} />
              )
            })}
            </View>*/}
    </>
  )
}
const styles = StyleSheet.create({
    gretting:{
      width:'100%'

    },

    gettingText:{

      fontSize:26,
      fontWeight:'700',
      color:colors.text
    },
    form:{
      width:'100%',
      padding: 18,
      gap:12
    },
    formTitle:{
      fontSize: textSize.title,
      fontWeight: 'bold'
    },
    input: {
      height: 40,
      borderWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 12,
      width: '100%',
      borderRadius: border.borderRadius,
      borderColor: border.border,
      backgroundColor: colors.softGray,
      color: colors.text
    },
    inputFocused: {
    borderColor: colors.darkGray
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
    borderRadius: border.borderRadius,
    borderWidth: 1,
    borderColor: border.borderColor,
    backgroundColor: colors.softGray
  },

  categoryButtonSelected: {
    borderColor: colors.darkGray,
    borderWidth:1
  },

  categoryText: {
    color: colors.textGray,
    fontWeight: '600'
  },

  fechaButton:{
    width:'35%',
    borderRadius: border.borderRadius,
    backgroundColor: colors.softGray,
    paddingVertical: 10,
    paddingHorizontal: 9.5,
    alignItems:'center',
    borderColor: 'transparent'
  },
  fechaText:{
    color: colors.textGray,
    fontWeight: '600'
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
    fontWeight: '700',
    fontSize: 16
    
  },

  buttonText: {
    color: colors.textPurple,
    fontWeight: '700',
    fontSize: 16
  },

  section: {
    width: '100%'
  },

  sectionTitle: {
    fontSize: textSize.subTitle,
    fontWeight: '700',
    color: colors.text
  },

  taskContainer: {
    gap: 16,
    paddingBottom: 30
  }
})
export default HomeScreen