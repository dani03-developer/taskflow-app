import type { NavigatorScreenParams } from "@react-navigation/native"
import type { categories, state } from "../data"
export type Category = (typeof categories)[number]
export type State = (typeof state)[number]
export type StatusGuardado = Exclude<State, 'Pendiente'> //excluimos el pendiente  
export type Task ={ //defino un objeto de tipo Task y sus propiedades
    id: string,
    title: string,
    description: string,
    category: Category,
    date: string | null,
    status: StatusGuardado
}
export type TasksStackParamList ={
    Tasks: { openForm?: boolean } | undefined
    TaskDetail: {
        taskId: string
    }
}
export type ProfileStackParamList={
    Profile: undefined
    TaskDetail: {
        taskId: string
    }
}
export type CalendarStackParamList={
    Calendar: undefined
    TaskDetail: {
        taskId: string
    }
}
export type PomodoroStackParamList={
    Pomodoro: undefined
}
export type AuthStackParamList={
    Login: undefined
    Register: undefined
}
export type TabParamList={
    TaskStack:NavigatorScreenParams<TasksStackParamList>
    NewTask: undefined 
    ProfileStack: NavigatorScreenParams<ProfileStackParamList>
    CalendarStack: NavigatorScreenParams<CalendarStackParamList>
    PomodoroStack: NavigatorScreenParams<PomodoroStackParamList>
    AuthStack: NavigatorScreenParams<AuthStackParamList>
}