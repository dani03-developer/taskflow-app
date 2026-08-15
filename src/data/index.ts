import { Task } from "../types";
export const tasks: Task[] = [
    {
      id: '1',
      title: 'Comprar leche',
      description: 'Ir al supermercado a comprar leche',
      date: '2026-03-03',
      category: 'Hogar',
      status: true
    },
    {
      id: '2',
      title: 'Estudiar React Native',
      description: 'Dedicar 2 horas a estudiar React Native',
      date: null,
      category: 'Estudio',
      status: false
    },
    {
      id: '3',
      title: 'Hacer ejercicio',
      description: 'Ir al gimnasio a hacer ejercicio',
      date: null,
      category: 'Personal',
      status: false
    },
    {
      id: '4',
      title: 'Leer un libro',
      description: 'Dedicar 1 hora a leer un libro',
      date: null,
      category:'Trabajo',
      status: false
    }
  ]//array de tareas