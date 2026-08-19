import { State } from '../types';
import { colors } from './colors';
export const statusColor: Record<State, { background: string; text: string}> = { //Record <K, V> k es el tipo y v es el valor
  'Por Hacer': { background: colors.purple, text: colors.textPurple },
  'Pendiente': { background: colors.orange, text: colors.textOrange },
  'Completado': { background: colors.green, text: colors.textGreen }
}