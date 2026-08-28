import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { SEED_TASKS } from '../../data'
import type { RootState } from '../../store'
import type { Task } from '../../types'
export type taskFilter = 'todo' | 'completed' | 'pending' //tipos literales
export type NewTaskInput = Omit<Task,'id' | 'status'>
export const FILTERS: Record<taskFilter, string>={
    todo:'Por Hacer',
    completed:'Completado',
    pending: 'Pendiente'
}
type TaskState ={
    items:Task[]
    filter:taskFilter
}
const initialState: TaskState={
    items: SEED_TASKS,
    filter:'todo'
}
const taskSlice =  createSlice({
    name:'tasks',
    initialState,
    reducers:{
        addTask:{ //prepare se realizan los cálculos antes de ejecutar una función como un dejar listo
            prepare:(input: NewTaskInput) =>({
                payload:{...input, id:nanoid(), status:'Por Hacer'} as Task //a una nueva tarea le agregamos su id y su estado
            
            }),
            reducer:(state,action: PayloadAction<Task>)=>{
                state.items.unshift(action.payload) //posiciona la tarea arriba de todo
            }
        },
        toogleTaskStatus:(state, action: PayloadAction<string>)=>{
            const task =state.items.find((task) =>task.id === action.payload)
              if (!task) return
                task.status = task.status === 'Completado' ? 'Por Hacer' : 'Completado'
        },
        deleteTask:(state,action: PayloadAction<string>)=>{ //state es taskState entonces puede acceder tanto a items que serían las tareas como a su estado
            state.items = state.items.filter((task)=> task.id != action.payload)
        },
        setFilter:(state,action: PayloadAction<taskFilter>)=>{
            state.filter = action.payload
        }
    }
})
export const {addTask,toogleTaskStatus,deleteTask,setFilter}=taskSlice.actions
export default taskSlice.reducer

//SELECTORES
export const selectAllTask = (state: RootState) =>state.tasks.items
export const selectFilter = (state: RootState) =>state.tasks.filter
export const selectTaskById=(id:string)=>(state:RootState)=>state.tasks.items.find((task)=>task.id === id)
export const getTodayString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};
export const isPending = (task: Task): boolean => {
    if (task.status === 'Completado') return false
    return !!task.date && task.date < getTodayString()
}
const isCompletedMonth = (task: Task): boolean => {
    const fechaActual = getTodayString()
    const mesActual = fechaActual.split('-')[1]; //genera un estring con la fecha y saca el mes que está en la posición 1
    const mesTask = task.date?.split('-')[1];
    if (task.status === 'Completado' && mesActual === mesTask){
        return true
    }return false
}
export const selectFilteredTask = createSelector(
    [selectAllTask, selectFilter],
    (tasks, filter)=>{
         switch(filter){
            case 'todo':
                return tasks.filter((task)=>task.status === 'Por Hacer' && !isPending(task))
            case 'completed':
                return tasks.filter((task)=>task.status === 'Completado')
            case 'pending':
                return tasks.filter ((task)=> isPending(task))
            default:
                return tasks
         }
    }
   
)
export const selectPendingTasks = createSelector([selectAllTask], (tasks)=>{
    return tasks.filter((task)=> isPending(task))
})
export const selectTaskStats = createSelector([selectAllTask], (tasks)=>{
    const pending = tasks.filter((task) => isPending(task)).length
    const completed = tasks.filter((t) => isCompletedMonth(t)).length
    return {pending, completed}
})