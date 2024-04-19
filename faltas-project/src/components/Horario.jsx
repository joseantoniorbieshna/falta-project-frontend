
import React, { useEffect, useRef, useState } from 'react';
import './css/HorarioMain.css'
import useEffectAddWindowEvent from '../hooks/useEffectAddWindowEvent';
const HorarioHeadDayWeek = React.forwardRef(({ dayOfWeek, dayOfMonth ,isActual=false },ref)=> {
    const clasesStyle=isActual?'actual-day':'no-actual-day'
    const dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
    const classNameLastDay =  dayOfWeek==4?'last-day-horario-head':''
    return (
        <div ref={ref} className={`${clasesStyle} ${classNameLastDay} hhdk-hora-head flex flex-col items-center justify-center p-5`}>
            <div className="hhdk-dia-semana">
                {dia[dayOfWeek]}
            </div>
            <div className='hh-dia-title '>
                Dia {dayOfMonth}
            </div>
        </div>
    )
});

const HorarioTime = React.forwardRef(({ time }, ref) => {
    return (
        <div className='hh-hora min-h-12' ref={ref}>
            <div className='ht-time-del-horario'>
                <div className='ht-time-del-horario-text'>
                    {time}
                </div>
            </div>
        </div>
      );
});


function HorarioHora({ children,isActual=false }) {
    const clasesStyle=isActual?'actual-day':'no-actual-day'
    return (
        <div className={`hh-hora ${clasesStyle}`}>
            {children}
        </div>
    );
}
function MensajeHora({ mensaje ,backgroundColor='#dff2cd'}) {
    return (
        <div className='m-hora' style={{backgroundColor}}>
            {mensaje}
        </div>
    )
}



export default function Horario(){
    /* Cambio de elementos no responsive para pc */
    const timeHoraHorarioRef = useRef(null);
    const [sizeTimeWidth,setSizeTimeWidth]=useState('auto');

    const lunesCercano = 15;
    const diaActual = 18;
    const dias = [lunesCercano, lunesCercano + 1, lunesCercano + 2, lunesCercano + 3, lunesCercano + 4]
    const timeArray = ['8:00:00', '9:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00']
    const mensaje = ['Programación-NievesTejeda', 'BaseDeDatos-NievesTejeda','ProgramacionServicios-Jose']
    const indiceDiaActual = new Date().getDay()-2;
    //const mensaje = ['a','b','c']

    const isLastDayClassName= indiceDiaActual==4?'is-last-day':''
    const handleResize = ()=>{
         /*primer elemento cambiar tamaño*/ 
        if(timeHoraHorarioRef.current){
            const { width } = timeHoraHorarioRef.current.getBoundingClientRect();
            setSizeTimeWidth(width)
            console.log(width);
            console.log("esto solo en resize en teoria");
        }else{
            console.log("problema");
        }
    }
    useEffectAddWindowEvent({handleResize,type:'resize'});

    return (
        
        <div className={`hh-horario-container flex-1 m-5 ${isLastDayClassName}`}>
        <div className={`hh-horario-head ${isLastDayClassName}`}>

            {/* horario cabezera dia */}
            <div className={`hhdk-hora-head hh-first-space-grid`} style={{width:sizeTimeWidth}}></div>
            {dias.map((day, index) => (
                <HorarioHeadDayWeek key={index} dayOfWeek={index} dayOfMonth={day} isActual={index==indiceDiaActual} />
            ))}
        </div>

        <div className='hh-horario-grid'>
            {/* horario  hora*/}
            {timeArray.map((hora, indexTime) => (
                <React.Fragment key={indexTime}>
                    <HorarioTime time={hora} ref={timeHoraHorarioRef}></HorarioTime>
                    {dias.map((day, indexDia) => (
                        <HorarioHora key={indexDia} isActual={indexDia==indiceDiaActual}>
                            {mensaje.map((mensaje, indexMensaje) => (
                                <MensajeHora key={indexMensaje} mensaje={mensaje} />
                            ))}
                        </HorarioHora>
                    ))}
               </React.Fragment>
            ))}

        </div>

    </div>
    )
}