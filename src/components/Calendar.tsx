import { Lucide } from "@react-native-vector-icons/lucide";
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { colors, statusColor, textSize } from '../theme';
import type { State, Task } from '../types';
import { ptAR } from "../utils/localCalendarConfig";

LocaleConfig.locales["pt-ar"] = ptAR
LocaleConfig.defaultLocale = "pt-ar"

const statusPriority: Record<State, number> = {
    'Por Hacer': 0,
    'Pendiente': 1,
    'Completado': 2,
};
const statusBorder: Record<State,  { borderColor: string; borderWidth: number}> = {
    'Por Hacer': {borderColor:colors.textPurple, borderWidth: 1},
    'Pendiente': {borderColor:colors.textOrange, borderWidth: 1},
    'Completado': {borderColor:colors.textGreen, borderWidth: 1},
};

export const statusColorDisabled: Record<State, { background: string; text: string}> = { //Record <K, V> k es el tipo y v es el valor
  'Por Hacer': { background: '#ddcaf658', text: '#8056dc5d'},
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
};

const getTodayString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const CustomDay = ({ date, state, marking, onPress}: CustomDayProps) => {
    const isToday = state === 'today';
    const isSelected = !!marking?.selected;
    const isPast = !!date && date.dateString < getTodayString();
    const isDisabled = state === 'disabled' || isPast;
    const currentStatus = marking?.status;
    const { background, text } = marking?.status //esta parte colorea los dias que tienen un estado
        ? (isDisabled ? statusColorDisabled[marking.status] : statusColor[marking.status])
        : ( isDisabled ? {background: '#f2f3ec7f', text: '#7d7b7b56'} :{ background: colors.softGray, text: colors.textGray });

    return (
        <TouchableOpacity
            style={[
                styles.day,
                { backgroundColor: background },
                isToday
                    ? (currentStatus ? statusBorder[currentStatus] : styles.dayRing)
                    : null,
                isSelected ? (currentStatus ? statusBorder[currentStatus] : styles.dayRing)
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
    tasks: Task[];
    onSelectDate?: (date: DateData) => void;
};

const CalendarComponent =({ tasks, onSelectDate }: CalendarComponentProps)=>{
    const [day, setDay]=useState<DateData>()

    const handleDayPress = (date: DateData) => {
        setDay(date)
        onSelectDate?.(date) //avisamos al padre (TaskForm) qué día se tocó
    }

    const markedDates = useMemo(() => {
        const marks: Record<string, CustomDayMarking> = {};
        tasks.forEach((task) => {
            if (task.date) {
                const currentStatus = marks[task.date]?.status;
                if (!currentStatus || statusPriority[task.status] < statusPriority[currentStatus]) {
                    marks[task.date] = { status: task.status };
                }
            }
        });

        if (day) {
            marks[day.dateString] = {
                ...marks[day.dateString],
                selected: true,
            };
        }

        return marks;
    }, [tasks, day]);

    return(
        <>
            <Calendar style={styles.calendar}
            dayComponent={CustomDay}
            renderArrow={(direction: "right" | "left")=>(
                <Lucide name={`chevron-${direction}`} size={20} color={colors.darkGray}/>
            )
            }
            theme={{
                textMonthFontSize:textSize.subTitle,
                calendarBackground: 'transparent',
                arrowColor:colors.darkGray,
            }}
             onDayPress={handleDayPress}
             markedDates={markedDates}
             hideExtraDays
            />
        </>
    );
}
const styles = StyleSheet.create({
    calendar:{
        backgroundColor:"transparent"
    },
    day:{
        width:32,
        height:32,
        borderRadius:16,
        alignItems:'center',
        justifyContent:'center',
    },
    dayRing:{
        borderColor: '#777575',
        borderWidth:1
    },
    dayText:{
        fontSize:textSize.text,
        fontWeight:500
    }
})
export default CalendarComponent