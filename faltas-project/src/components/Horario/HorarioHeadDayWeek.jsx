import React, { forwardRef, useState } from 'react';
import './css/Horario.css'
import PopUpCreateFaltaHorarioDiaCompleto from '../PopUps/PopUpCreateFaltaHorarioDiaCompleto';
import { logoSass } from 'ionicons/icons';

const HorarioHeadDayWeek=forwardRef(({ dayOfWeek, dayOfMonth, isActual = false, children, showDayNumber, canPutFaltaFullDay=true },ref)=>{
    const clasesStyle = isActual ? 'actual-day' : 'no-actual-day'
    const dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
    const classNameLastDay = dayOfWeek == 4 ? 'last-day-horario-head' : ''
    const classNameNotShowDayNumber = !showDayNumber? 'hh-is-only-day-of-week-name':''
    const classCanPutFalta = canPutFaltaFullDay?'cursor-pointer hover:border-b-[3px] hover:border-black bg-[#d9d9d9]':''
    const [isOpen,setIsOpen] = useState(false)
    const changeToClose=()=>{
        setIsOpen(false)
    }

    return (
        <>
        <div ref={ref} id={`day-${dayOfWeek}`} name={`day-${dayOfWeek}`} className={`${clasesStyle} ${classNameLastDay} ${classNameNotShowDayNumber} ${classCanPutFalta} hhdk-hora-head flex flex-col items-center justify-center p-5`} onClick={()=>setIsOpen(true)}>
            <div className={`hhdk-dia-semana ${clasesStyle}`}>
                {dia[dayOfWeek]}
            </div>
            {
                showDayNumber ?
                    <div className={`hh-dia-title`}>
                        Dia {dayOfMonth}
                    </div>
                    :
                    <></>
            }
            {children}

        </div>
            {
                isOpen==true && canPutFaltaFullDay &&
                <PopUpCreateFaltaHorarioDiaCompleto dia={dayOfWeek} changeToClose={changeToClose}></PopUpCreateFaltaHorarioDiaCompleto>
            }

        </>
    )
});

export default HorarioHeadDayWeek;