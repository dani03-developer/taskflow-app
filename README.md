# TaskFlow 📋

TaskFlow es una app de productividad construida con Expo y React Native para organizar tareas, mantener el foco con Pomodoro y llevar un seguimiento del progreso del usuario.

## ¿Qué incluye?

- Gestión de tareas con creación, filtrado y detalle.
- Vista de calendario para revisar tareas por fecha.
- Temporizador de enfoque tipo Pomodoro.
- Sistema de streak para motivación diaria.
- Autenticación y perfil de usuario con Firebase.
- Navegación por tabs y stacks organizada por secciones.
- Estado global centralizado con Redux Toolkit.

## Stack tecnológico

- React Native + Expo
- TypeScript
- Expo Router
- React Navigation
- Redux Toolkit
- Firebase
- Lottie React Native
- React Native Calendars

## Estructura del proyecto

```text
app/                  # Rutas y punto de entrada principal
src/
  components/         # Componentes reutilizables
  features/           # Slices de Redux (tasks, streak, pomodoro, auth)
  navigation/         # Navegación principal y stacks
  screens/            # Pantallas de login, tareas, calendario, perfil y pomodoro
  services/           # Lógica de acceso a Firebase y datos
  store/              # Configuración del store y hooks tipados
  theme/              # Colores, tipografías, spacing y estilos
  types/              # Tipos globales de TypeScript
  utils/              # Utilidades varias
```

## Requisitos previos

- Node.js LTS
- npm
- Android Studio o un emulador configurado
- Expo Go o un dispositivo físico

## Instalación

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Inicia la aplicación:

```bash
npx expo start
```

También puedes usar:

```bash
npm start
npm run android
npm run ios
npm run web
```

## Scripts disponibles

```bash
npm start          # Inicia Expo
npm run android    # Ejecuta la app en Android
npm run ios        # Ejecuta la app en iOS
npm run web        # Ejecuta la app en web
npm run lint       # Ejecuta ESLint
npm run reset-project  # Reinicia la estructura del proyecto
```

## Troubleshooting

Si al exportar o iniciar la app aparece un error de importación de Lottie en web/Expo, instala la dependencia requerida:

```bash
npm install --legacy-peer-deps @lottiefiles/dotlottie-react@^0.6.5
```

Esto resuelve el problema de `lottie-react-native` al compilar con Expo.

## Estado global y arquitectura

La app usa Redux para mantener sincronizado el estado de tareas y rendimiento del usuario. La configuración base se encuentra en:

- `src/store/index.ts`
- `src/store/hooks/hooks.ts`
- `src/features/tasks/TasksSlice.ts`
- `src/features/streak/streakSlice.ts`

Esto permite que la información de tareas y streak se comparta entre pantallas sin duplicar estados locales.

## Demo


https://github.com/user-attachments/assets/9aa70e5e-9891-4d61-9564-2e2cbd6a9e1f





## Más información

Para consultar la documentación oficial de Expo y React Native:

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [React Native](https://reactnative.dev/)



