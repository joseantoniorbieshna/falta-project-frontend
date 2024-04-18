import React, { Children } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import './css/HorarioMain.css'



function HorarioHeadDayWeek({ dayOfWeek, dayOfMonth }) {
    const dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
    return (
        <div className='hhdk-hora-head flex flex-col items-center justify-center p-5'>
            <div className="hhdk-dia-semana">
                {dia[dayOfWeek]}
            </div>
            <div className='hh-dia-title '>
                Dia {dayOfMonth}
            </div>
        </div>
    )
}

function HorarioTime({ time }) {
    return (
        <div className='hh-hora min-h-12'>
            <div className='ht-time-del-horario'>
                <div className='ht-time-del-horario-text'>
                    {time}
                </div>
            </div>
        </div>
    )
}


function HorarioHora({ children, backgroundColor = '#fff' }) {
    const horaStyle = { backgroundColor: backgroundColor};
    return (
        <div className='hh-hora' style={horaStyle}>
            {children}
        </div>
    );
}
function MensajeHora({ mensaje }) {
    return (

        <div className='m-hora'>
            {mensaje}
        </div>
    )
}



export function HorarioMain() {
    const diaActual = 18;
    const lunesCercano = 15;
    const dias = [lunesCercano, lunesCercano + 1, lunesCercano + 2, lunesCercano + 3, lunesCercano + 4]
    const timeArray = ['8:00:00', '9:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00']
    const mensaje = ['Programación-NievesTejeda', 'BaseDeDatos-NievesTejeda','ProgramacionServicios-Jose']
    //const mensaje = ['a','b','c']
    return (
        <section className="flex-1 flex flex-col justify-center">
            <div className="hm-title-container p-5">
                <h1 className='font-bold text-2xl text-blacklight'>Horario Escolar</h1>
            </div>

            <div className='m-5'>
                <div className='flex flex-row'>
                    <div>{`${lunesCercano}-${lunesCercano + 4}`} Mayo 2023</div>
                    <div className='flex flex-row items-center ml-5'>
                        <IonIcon icon={arrowBack} className='text-black mr-5 cursor-pointer'></IonIcon>
                        <IonIcon icon={arrowForward} className='text-black mr-5 cursor-pointer'></IonIcon>
                    </div>
                </div>
            </div>

            <div className='hh-horario-container flex-1 m-5'>
                <div className='hh-horario-head'>

                    {/* horario cabezera dia */}
                    <div className='hhdk-hora-head hh-first-space-grid'></div>
                    {dias.map((day, index) => (
                        <HorarioHeadDayWeek key={`${index}-hdw`} dayOfWeek={index} dayOfMonth={day} />
                    ))}
                </div>

                <div className='hh-horario-grid'>
                    {/* horario  hora*/}
                    {timeArray.map((hora, indexTime) => (
                        <>
                        <HorarioTime key={`${indexTime}-ht`} time={hora}></HorarioTime>
                            {dias.map((day, indexDia) => (
                                <HorarioHora key={`${indexTime}-ht-${indexDia}`}>
                                    {mensaje.map((mensaje, indexMensaje) => (
                                        <MensajeHora key={`${indexTime}-ht-${indexDia}-${indexMensaje}`} mensaje={mensaje} />
                                    ))}
                                </HorarioHora>
                            ))}
                        </>
                    ))}

                </div>

            </div>


        </section>
    );
}
