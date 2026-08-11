export type Task ={ //defino un objeto de tipo Task y sus propiedades
    id: string,
    title: string,
    description: string,
    time: 'today' | 'tomorrow' | 'next week' | 'next month',
    status: boolean
}