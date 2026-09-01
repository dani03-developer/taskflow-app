import { Lucide } from "@react-native-vector-icons/lucide";
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { getTodayString, isPending, selectAllTask } from "../features/tasks/TasksSlice";
import { colors, fonts, statusColor, textSize } from '../theme';
import type { State } from '../types';
import { ptAR } from "../utils/localCalendarConfig";
LocaleConfig.locales["pt-ar"] = ptAR
LocaleConfig.defaultLocale = "pt-ar"

const statusPriority: Record<State, number> = {
    'Por Hacer': 0,
    'Pendiente': 1,
    'Completado': 2,
};
const statusBorder: Record<State, { borderColor: string; borderWidth: number }> = {
    'Por Hacer': { borderColor: colors.textPurple, borderWidth: 1 },
    'Pendiente': { borderColor: colors.textOrange, borderWidth: 1 },
    'Completado': { borderColor: colors.textGreen, borderWidth: 1 },
};

export const statusColorDisabled: Record<State, { background: string; text: string }> = { //Record <K, V> k es el tipo y v es el valor
    'Por Hacer': { background: '#ddcaf658', text: '#8056dc5d' },
    'Pendiente': { background: '#ffd3965f', text: '#ffa62a5d' },
    'Completado': { background: '#cee3ba5e', text: '#5b743159' }
}

type CustomDayMarking = {
    selected?: boolean;
    status?: State;
};

type CustomDayProps = {
    date?: DateData;
    state?: 'selected' | 'disabled' | 'inactive' | 'today' | '';
    marking?: CustomDayMarking;
    onPress?: (date?: DateData) => void;
    hasSelection?: boolean;
};

const CustomDay = ({ date, state, marking, onPress, hasSelection }: CustomDayProps) => {
    const isToday = state === 'today';
    const isSelected = !!marking?.selected;
    const isPast = !!date && date.dateString < getTodayString();
    const isDisabled = state === 'disabled' || isPast;
    const currentStatus = marking?.status;
    const borde = currentStatus ? statusBorder[currentStatus] : styles.dayRing;
    const { background, text } = marking?.status //esta parte colorea los dias que tienen un estado
        ? (isDisabled ? statusColorDisabled[marking.status] : statusColor[marking.status])
        : (isDisabled ? { background: '#f2f3ec7f', text: '#7d7b7b56' } : { background: colors.softGray, text: colors.textGray });

    return (
        <TouchableOpacity
            style={[
                styles.day,
                { backgroundColor: background },
                isToday && !hasSelection
                    ? borde
                    : null,
                isSelected ? borde
                    : null
            ]}
            onPress={() => onPress?.(date)}
        >
            <Text style={[styles.dayText, { color: text }]}>
                {date?.day}
            </Text>
        </TouchableOpacity>
    );
};
type CalendarComponentProps = {
    onSelectDate?: (date: DateData) => void;
};

const CalendarComponent = ({ onSelectDate }: CalendarComponentProps) => {
    const [day, setDay] = useState<DateData>()
    const TASK = useSelector(selectAllTask)
    const handleDayPress = (date: DateData) => {
        setDay(date)
        onSelectDate?.(date) //avisamos al padre (TaskForm) qué día se tocó
    }

    const hasSelection = !!day;
    const DayComponent = useCallback(
        (props: CustomDayProps) => <CustomDay {...props} hasSelection={hasSelection} />,
        [hasSelection]
    );

    const markedDates = useMemo(() => {
        const marks: Record<string, CustomDayMarking> = {};
        TASK.forEach((task) => {
            if (!task.date) return;
            const estadoVisual = isPending(task) ? 'Pendiente' : task.status;
            const currentStatus = marks[task.date]?.status;

            if (!currentStatus || statusPriority[estadoVisual] < statusPriority[currentStatus]) {
                marks[task.date] = { status: estadoVisual };
            }
        });

        if (day) {
            marks[day.dateString] = {
                ...marks[day.dateString],
                selected: true,
            };
        }

        return marks;
    }, [TASK, day]);

    return (
        <>
            <Calendar style={styles.calendar}
                dayComponent={DayComponent}
                renderArrow={(direction: "right" | "left") => (
                    <Lucide name={`chevron-${direction}`} size={20} color={colors.darkGray} />
                )
                }
                theme={{
                    textMonthFontSize: textSize.subTitle,
                    textMonthFontFamily: fonts.Interbold,
                    calendarBackground: 'transparent',
                    arrowColor: colors.darkGray,
                }}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                hideExtraDays
            />
        </>
    );
}
const styles = StyleSheet.create({
    calendar: {
        backgroundColor: "transparent"
    },
    day: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayRing: {
        borderColor: '#777575',
        borderWidth: 1
    },
    dayText: {
        fontSize: textSize.text,
        fontFamily: fonts.Intermedium
    }
})
export default CalendarComponent