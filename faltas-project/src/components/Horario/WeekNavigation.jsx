
/*HORARIO*/
import { format } from 'date-fns';
import { addDays, startOfWeek, endOfWeek,startOfDay } from 'date-fns';
import { es } from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
/* WEEK NAVIGATION*/
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react'
import './css/Horario.css'
import './css/WeekNavigation.css'
import { arrowBack, arrowForward, calendar } from 'ionicons/icons';


function CalendarWeekSelector({ }) {
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


export default function WeekNavigation({ lunesCercano }) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    /* FECHA */
    var viernesCercano = new Date(lunesCercano);
    viernesCercano.setDate(lunesCercano.getDate() + 4);

    /* TEXTO MES */
    const getMonths = () => {
        if (lunesCercano.getMonth() == viernesCercano.getMonth()) {
            console.log(viernesCercano.getMonth() + "   " + lunesCercano.getMonth());
            return meses[lunesCercano.getMonth()]
        } else {
            return meses[lunesCercano.getMonth()] + "-" + meses[viernesCercano.getMonth()]
        }
    }

    const getYears = () => {
        if (lunesCercano.getFullYear() == viernesCercano.getFullYear()) {
            return lunesCercano.getFullYear()
        } else {
            returnlunesCercano.getFullYear() + "-" + viernesCercano.getFullYear()
        }
    }

    return (
        <>
            <div className='wn-week-navigation-container p-5'>
                <div className='flex flex-row'>
                    <div>{`${lunesCercano.getDate()}-${viernesCercano.getDate()}`} {getMonths()} {getYears()}</div>
                    <div className='wn-container-buttons flex flex-row items-center ml-5'>
                        <IonIcon icon={arrowBack} className='text-black text-xl mr-5 cursor-pointer'></IonIcon>
                        <CalendarWeekSelector></CalendarWeekSelector>
                        <IonIcon icon={arrowForward} className='text-black text-xl mr-5 cursor-pointer'></IonIcon>
                    </div>
                </div>
            </div>
        </>
    )

}