import { Task } from "../types";
export const tasks: Task[] = [
    {
      id: '1',
      title: 'Comprar leche',
      description: 'Ir al supermercado a comprar leche',
      time: 'today',
      status: true
    },
    {
      id: '2',
      title: 'Estudiar React Native',
      description: 'Dedicar 2 horas a estudiar React Native',
      time: 'tomorrow',
      status: false
    },
    {
      id: '3',
      title: 'Hacer ejercicio',
      description: 'Ir al gimnasio a hacer ejercicio',
      time: 'next week',
      status: false
    },
    {
      id: '4',
      title: 'Leer un libro',
      description: 'Dedicar 1 hora a leer un libro',
      time: 'next month',
      status: false
    }
  ]//array de tareas