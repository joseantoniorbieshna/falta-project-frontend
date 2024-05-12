import React, { forwardRef } from 'react';
import './css/Horario.css'

const HorarioHeadDayWeek=forwardRef(({ dayOfWeek, dayOfMonth, isActual = false, children, showDayNumber },ref)=>{
    const clasesStyle = isActual ? 'actual-day' : 'no-actual-day'
    const dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
    const classNameLastDay = dayOfWeek == 4 ? 'last-day-horario-head' : ''
    const classNameNotShowDayNumber = !showDayNumber? 'hh-is-only-day-of-week-name':''
    return (
        <div ref={ref} id={`day-${dayOfWeek}`} name={`day-${dayOfWeek}`} className={`${clasesStyle} ${classNameLastDay} ${classNameNotShowDayNumber} hhdk-hora-head flex flex-col items-center justify-center p-5`}>
            <div className={`hhdk-dia-semana ${clasesStyle}`}>
                {dia[dayOfWeek]}
            </div>
            {
                showDayNumber ?
                    <div className='hh-dia-title '>
                        Dia {dayOfMonth}
                    </div>
                    :
                    <></>
            }

            {children}
        </div>
    )
});

export default HorarioHeadDayWeek;