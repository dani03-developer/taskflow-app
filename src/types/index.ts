import type { NavigatorScreenParams } from "@react-navigation/native"
import type { categories, state } from "../data"
export type Category = (typeof categories)[number]
export type State = (typeof state)[number]
export type Task ={ //defino un objeto de tipo Task y sus propiedades
    id: string,
    title: string,
    description: string,
    category: Category,
    date: string | null,
    status: State
}
export type TasksStackParamList ={
    Tasks: { openForm?: boolean } | undefined
    TaskDetail: {
        taskId: string
    }
}
export type ProfileStackParamList={
    Profile: undefined
}
export type CalendarStackParamList={
    Calendar: undefined
}
export type PomodoroStackParamList={
    Pomodoro: undefined
}
export type TabParamList={
    TaskStack:NavigatorScreenParams<TasksStackParamList>
    NewTask: undefined 
    ProfileStack: NavigatorScreenParams<ProfileStackParamList>
    CalendarStack: NavigatorScreenParams<CalendarStackParamList>
    PomodoroStack: NavigatorScreenParams<PomodoroStackParamList>
}