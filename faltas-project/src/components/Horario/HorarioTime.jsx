import React, { forwardRef } from 'react';
import './css/Horario.css'
const HorarioTime =forwardRef(({ time, isActual = false },ref)=>{
    const classNameIsActual = isActual ? 'hh-time-actual-day' : ''
    return (
        <div className={`hh-hora min-h-12`} ref={ref}>
            <div className={`ht-time-del-horario ${classNameIsActual}`}>
                <div className='ht-time-del-horario-text'>
                    {time}
                </div>
            </div>
        </div>
    );
});

export default HorarioTime;