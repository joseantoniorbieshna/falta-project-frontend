
import React, { useEffect, useState } from 'react';
import './css/HorarioMain.css'
import useEffectAddWindowEvent from '../hooks/useEffectAddWindowEvent';
import useMobile from '../hooks/useMobile';
import { IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HorarioHeadDayWeek = React.forwardRef(({ dayOfWeek, dayOfMonth, isActual = false, children }, ref) => {
    const clasesStyle = isActual ? 'actual-day' : 'no-actual-day'
    const dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
    const classNameLastDay = dayOfWeek == 4 ? 'last-day-horario-head' : ''
    return (
        <div ref={ref} id={`day-${dayOfWeek}`} name={`day-${dayOfWeek}`} className={`${clasesStyle} ${classNameLastDay} hhdk-hora-head flex flex-col items-center justify-center p-5`}>
            <div className="hhdk-dia-semana">
                {dia[dayOfWeek]}
            </div>
            <div className='hh-dia-title '>
                Dia {dayOfMonth}
            </div>
            {children}
        </div>
    )
});

function DayNavigationMobile({ dayIndex, diasTextoAbreviado, actualDay, isActual, isActive, setActive }, key) {
    const location = useLocation()
    const navigate = useNavigate()
    const classNameActualDay = isActual ? 'last-day-horario-head' : ''
    const classNameActiveDay = isActive ? 'active-horario-head' : ''
    const funcionOnCLick = (event) => {
        /* PARA QUE NO APAREZCA EN LA RUTA */
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'instant' });
        }
        /* ACTIVAR EL COLOR */
        setActive(dayIndex)
    }
    return (
        <a key={key} href={`#day-${dayIndex}`} name={`#day-${dayIndex}`} className={`hh-menu-mobile-part-day ${classNameActualDay} ${classNameActiveDay}`} onClick={funcionOnCLick}>
            <div className='hh-menu-mobile-day-day_number' >
                {diasTextoAbreviado}
            </div>
            <div className='hh-menu-mobile-day-day_text'>
                {actualDay}
            </div>
        </a>
    )
};

function WeekNavigation({lunesCercano}){

    return (
        <>
        <div className='p-5'>
            <div className='flex flex-row'>
                <div>{`${lunesCercano}-${lunesCercano + 4}`} Mayo 2024</div>
                <div className='flex flex-row items-center ml-5'>
                    <IonIcon icon={arrowBack} className='text-black mr-5 cursor-pointer'></IonIcon>
                    <IonIcon icon={arrowForward} className='text-black mr-5 cursor-pointer'></IonIcon>
                </div>
            </div>
        </div>
    </>

    )

}

const HorarioTime = React.forwardRef(({ time, isActual = false }, ref) => {
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


function HorarioHora({ children, isActual = false }) {
    const clasesStyle = isActual ? 'actual-day' : 'no-actual-day'
    return (
        <div className={`hh-hora ${clasesStyle}`}>
            {children}
        </div>
    );
}
function MensajeHora({ mensaje, backgroundColor = '#dff2cd' }) {
    return (
        <div className='m-hora' style={{ backgroundColor }}>
            {mensaje}
        </div>
    )
}



export default function Horario() {
    /* DATA */
    const lunesCercano = 15;
    const diaActual = 18;
    const dias = [lunesCercano, lunesCercano + 1, lunesCercano + 2, lunesCercano + 3, lunesCercano + 4]
    const timeArray = ['8:00:00', '9:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00']
    const mensaje = ['Programación-NievesTejeda', 'BaseDeDatos-NievesTejeda', 'ProgramacionServicios-Jose']
    const indiceDiaActual = new Date().getDay() - 1;
    const diasTextoAbreviado = ['Lun', 'Mart', 'Mier', 'Juev', 'Vier']
    //const mensaje = ['a','b','c']
    const isLastDayClassName = indiceDiaActual == 4 ? 'is-last-day' : ''



    /* CAMBIO DE ELEMENTO NO RESPONSIVE PARA PC */
    const timeHoraHorarioRef = useRef(null);
    const [sizeTimeWidth, setSizeTimeWidth] = useState('auto');


    /*COMPONENTE PARA EL HEADER MOBILE*/
    const containerNavRef = useRef(null);
    const [isMobile] = useMobile();
    const [indexActiveMobile, setActiveNavMobile] = useState(-1);


    const handleResize = () => {
        /*primer elemento cambiar tamaño*/
        if (timeHoraHorarioRef.current && !isMobile) {
            const { width } = timeHoraHorarioRef.current.getBoundingClientRect();
            setSizeTimeWidth(width)
            console.log("Horario - resizePC");
        }
    }
    useEffectAddWindowEvent({ handleResize, type: 'resize' });

    /* comportamiento nav actual */
    var eventsAdded = false;
    useEffect(() => {
        const container = containerNavRef.current;
        if (!container || !container.children) return;


        const handleScroll = () => {
            const children = Array.from(container.children);
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const rectChild = child.getBoundingClientRect();
                const rectContainer = container.getBoundingClientRect();
                if (rectChild.bottom >= rectContainer.top + 40) {
                    console.log(i + " index active mobile");
                    setActiveNavMobile(i)
                    console.log("activao");
                    break;
                }
            }
        }
        handleScroll();
        if (isMobile && !eventsAdded) {
            handleScroll();
            container.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
            console.log("Aquí se carga el método para el nav en color móvil");
            eventsAdded = true;
        } else if (!isMobile && eventsAdded) {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            console.log("Aquí se borra el método para el nav en color móvil");
            eventsAdded = false;
        }

        return () => {
            console.log("aqui borro el metodo para el nav en color movil");
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll)
        };
    }, [isMobile]);
    return (

        <>
            {/*HEADER INFO/NAVIGATION*/}
            {!isMobile ?
                <WeekNavigation lunesCercano={lunesCercano}></WeekNavigation>
                :
                <>

                    <div className='hh-navigation-container-day'>
                        <div className='hh-menu-mobile-day' >
                            {dias.map((actualDayVar, index) => (
                                <DayNavigationMobile key={index} dayIndex={index} diasTextoAbreviado={diasTextoAbreviado[index]}
                                    actualDay={actualDayVar} isActual={index == indiceDiaActual}
                                    setActive={setActiveNavMobile} isActive={indexActiveMobile == index} />
                            ))}
                        </div>
                    </div>
                </>
            }




            {/*HORARIO INFO*/}
            <div className={`hh-horario-container flex-1${isLastDayClassName}`}>

                {!isMobile ?
                    <div className={`hh-horario-head ${isLastDayClassName}`}>

                        {/* horario cabezera dia */}
                        <div className={`hhdk-hora-head hh-first-space-grid`} style={{ width: sizeTimeWidth }}></div>
                        {dias.map((day, index) => (
                            <HorarioHeadDayWeek key={index} dayOfWeek={index} dayOfMonth={day} isActual={index == indiceDiaActual} />
                        ))}
                    </div>
                    : <></>}

                {!isMobile ?
                    <div className='hh-horario-table_list'>
                        {/* horario  hora*/}
                        {timeArray.map((hora, indexTime) => (
                            <React.Fragment key={indexTime}>
                                <HorarioTime time={hora} ref={timeHoraHorarioRef}></HorarioTime>
                                {dias.map((day, indexDia) => (
                                    <HorarioHora key={indexDia} isActual={indexDia == indiceDiaActual}>
                                        {mensaje.map((mensaje, indexMensaje) => (
                                            <MensajeHora key={indexMensaje} mensaje={mensaje} />
                                        ))}
                                    </HorarioHora>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                    :

                    <div className='hh-horario-table_list' ref={containerNavRef}>
                        {/* Lo mismo que arriba pero modificado*/}
                        {/* horario  hora*/}
                        {/* dia -tiempo mensaje*/}


                        {dias.map((day, indexDia) => (
                            <React.Fragment key={indexDia}>
                                <HorarioHeadDayWeek dayOfWeek={indexDia} dayOfMonth={day} isActual={indexDia == indiceDiaActual} >
                                    {timeArray.map((hora, indexTime) => (
                                        <React.Fragment key={indexTime}>
                                            <HorarioTime time={hora} ref={timeHoraHorarioRef} isActual={indexDia == indiceDiaActual}></HorarioTime>
                                            <HorarioHora isActual={indexDia == indiceDiaActual}>
                                                {mensaje.map((mensaje, indexMensaje) => (
                                                    <MensajeHora key={indexMensaje} mensaje={mensaje} />
                                                ))}
                                            </HorarioHora>
                                        </React.Fragment>
                                    ))}
                                </HorarioHeadDayWeek>
                            </React.Fragment>
                        ))}

                    </div>
                }

            </div>

        </>
    )
}