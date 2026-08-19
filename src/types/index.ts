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