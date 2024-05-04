import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/MyCalendar.css"
import { addDays, startOfWeek, endOfWeek,startOfDay } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { getActualDate } from "../../utils/myDateFunctions";
export default function MyCalendar({myDate,setMyDate}){
    const day=3;
    const esDiaDeLaSemanaValido=(date)=>{
        return date.getDay() - 1 == day;
    }
    const esMayorOIgualFechaActual=(date)=>{
        const fechaActual = getActualDate();
        fechaActual.setHours(0, 0, 0, 0);
        return date >= fechaActual;
    }

    const esValidDate=(date)=>{
        return esDiaDeLaSemanaValido(date) && esMayorOIgualFechaActual(date);
    }


    useEffect(() => {
        registerLocale('es', es)
        startOfDay(getActualDate())
    }, [])
    return (
    <DatePicker
        selected={myDate}
        onChange={(date) => setMyDate(date)}
        locale="es"
        highlightDates={[{ startDate: startOfWeek(new Date()), endDate: endOfWeek(new Date()) }]}
        filterDate={esValidDate}
        dateFormat="P"
        className={`${myDate==null?'red-border':''} my-calendar`}>
    </DatePicker>
    )
}