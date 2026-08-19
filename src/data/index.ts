import type { Task } from "../types";

export const categories = ['💼 Trabajo', '🌿 Personal', '📕 Estudio', '🏠 Hogar'] as const
export const state = ['Por Hacer', 'Pendiente', 'Completado'] as const
const tasks: Array<[string, string, Task['category'],Task['date'],Task['status']]> = [
    [
     'Comprar leche',
      'Ir al supermercado a comprar leche',
      '🏠 Hogar',
      '2026-08-16',
      'Por Hacer'
    ],
    [
      'Estudiar React Native',
      'Dedicar 2 horas a estudiar React Native',
      '📕 Estudio',
      '2026-08-02',
      'Por Hacer'
    ],
    [
      'Hacer ejercicio',
      'Ir al gimnasio a hacer ejercicio',
      '🌿 Personal',
      '2026-08-15',
      'Completado'
    ],
    [
      'Hacer ejercicio',
      'Ir al gimnasio a hacer ejercicio',
      '🌿 Personal',
      '2026-08-15',
      'Por Hacer'
    ],
    [
      'Leer un libro',
      'Dedicar 1 hora a leer un libro',
      '💼 Trabajo',
      '2026-08-17',
      'Por Hacer'
    ],
    [
      'Hacer ejercicio',
      'Ir al gimnasio a hacer ejercicio',
      '🌿 Personal',
      '2026-08-13',
      'Completado'
    ]
  ]//array de tareas

  export const SEED_TASKS: Task[] = tasks.map(([title, description, category, date, status], i) =>({

    id: `seed-${String(i + 1).padStart(2,'0')}`,
    title,
    description,
    date,
    category,
    status
  }))