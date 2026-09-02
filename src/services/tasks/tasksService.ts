import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Task } from "../../types/index";

export type NewTaskData = Omit<Task, 'id'>

export const createTask = async (
  task: NewTaskData,
  userId: string
) => {
  await addDoc(collection(db, 'tasks'), {
    ...task,
    userId, //a que usuario pertenece la tarea
  })
}

export const subscribeToTasks = (
  userId: string,
  callback: (tasks: Task[]) => void
) => {
  const tasksQuery = query(
    collection(db, 'tasks'),
    where('userId', '==', userId)
  )

  return onSnapshot(tasksQuery, (snapshot) => { //onSnapshot es un listener que se ejecuta cada vez que hay un cambio en la colección de tareas, ya sea que se agregue, elimine o actualice una tarea. 
    const tasks: Task[] = snapshot.docs.map((document) => {
      const data = document.data()

      return {
        id: document.id,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        status: data.status,
      }
    })

    callback(tasks)
  })
}

export const updateTaskStatus = async (
  taskId: string,
  status: 'Por Hacer' | 'Completado'
) => {
  const taskRef = doc(db, 'tasks', taskId)

  await updateDoc(taskRef, {
    status,
  })
}

export const removeTask = async (taskId: string) => {
  const taskRef = doc(db, 'tasks', taskId)

  await deleteDoc(taskRef)
}