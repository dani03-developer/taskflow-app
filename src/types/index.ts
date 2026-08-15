export type Task ={ //defino un objeto de tipo Task y sus propiedades
    id: string,
    title: string,
    description: string,
    category: string,
    date: string | null,
    status: boolean
}