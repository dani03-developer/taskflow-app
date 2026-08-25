# TaskFlow 📋

TaskFlow es una app de productividad hecha con [Expo](https://expo.dev) y React Native. Permite organizar tareas, visualizarlas en un calendario, usar un temporizador Pomodoro y gestionar el perfil del usuario.

## Funcionalidades

- **Tareas**: crear, ver el detalle y gestionar tareas desde una lista principal.
- **Calendario**: visualizar las tareas organizadas por fecha.
- **Pomodoro**: temporizador para sesiones de trabajo enfocado.
- **Perfil**: información y ajustes del usuario.

Navegación basada en tabs (`@react-navigation/bottom-tabs`) con un stack independiente por sección (`src/navigation`).

## Video de demostración


https://github.com/user-attachments/assets/209a319b-f39a-4ec8-b6aa-c2e4420459bc



## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

Este proyecto usa [file-based routing](https://docs.expo.dev/router/introduction) a través de la carpeta **app**, y la lógica de pantallas y componentes vive en **src**.

## Estructura del proyecto

```
app/                 # Entry point (expo-router)
src/
  components/        # Componentes reutilizables (TaskForm, CardTask, Calendar, etc.)
  navigation/         # Stacks y navegador principal
  screens/            # Pantallas: tasks, calendar, pomodoro, profile
  data/               # Datos y mocks
  theme/              # Estilos y tema
  types/              # Tipos de TypeScript
  utils/              # Utilidades
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

