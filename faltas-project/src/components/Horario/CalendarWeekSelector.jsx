import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react'
import { format } from 'date-fns';
import { addDays, startOfWeek, endOfWeek,startOfDay } from 'date-fns';
import { es } from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { calendar } from 'ionicons/icons';
import "react-datepicker/dist/react-datepicker.css";
import './css/WeekNavigation.css'

export default function CalendarWeekSelector({ }) {
    const [startDate, setStartDate] = useState(new Date());
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <IonIcon icon={calendar} className='text-black text-xl mr-5 cursor-pointer' onClick={onClick}></IonIcon>
    ));

    useEffect(() => {
        registerLocale('es', es)
        startOfDay(new Date())
    }, [])
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            highlightDates={[{ startDate: startOfWeek(new Date()), endDate: endOfWeek(new Date()) }]}
            filterDate={(date)=> ( (date.getDay()-1)<5 && date.getDay()!=0 )?true:false}
            dateFormat="P"
            locale={es}
            customInput={<CustomInput />}
        />
    );
}