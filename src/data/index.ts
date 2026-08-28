import type { Task } from "../types";

export const categories = ['💼 Trabajo', '🌿 Personal', '📕 Estudio', '🏠 Hogar'] as const
export const state = ['Por Hacer', 'Pendiente', 'Completado'] as const
const tasks: Array<[string, string, Task['category'],Task['date'],Task['status']]> = [
    [
     'Comprar leche',
      'Maecenas sit amet risus molestie, pellentesque felis eget, tincidunt quam. In id magna turpis. Aenean eget ipsum ut lacus pretium venenatis eget at ligula. Etiam pulvinar metus vitae felis scelerisque rutrum. Pellentesque posuere libero id vestibulum mollis. Etiam viverra urna justo, sit amet posuere massa pulvinar vel. Sed vel orci imperdiet, venenatis dui at, condimentum neque. Sed varius, velit ut ornare consectetur, libero diam sagittis elit, tincidunt dapibus eros diam id sapien. Fusce aliquam, sem vel ultricies pretium, leo tellus aliquet mauris, id tincidunt sem elit eu tellus. Nunc ultrices libero erat, vel convallis arcu congue eget. Ut et nulla ac sapien tincidunt tincidunt. Maecenas feugiat, diam sed elementum dictum, ligula libero fringilla risus, in iaculis risus leo sed lorem. Phasellus accumsan, neque in efficitur posuere, lacus quam fringilla ex, et gravida mauris lorem ut sapien. Morbi sem turpis, cursus a varius id, scelerisque et metus. Mauris pretium mauris ultrices, varius urna et, maximus justo.',
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