
import React, { useEffect, useState } from 'react';
import './css/Horario.css'
import useMobile from '../../hooks/useMobile';
import { IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useScrollComponent from '../../hooks/useScrollComponent';
import useResizeComponentAndWindow from '../../hooks/useResizeComponentAndWindow';
import { getActualDate } from '../../utils/myDateFunctions';

const HorarioHeadDayWeek = React.forwardRef(({ dayOfWeek, dayOfMonth, isActual = false, children, showDayNumber }, ref) => {
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

function DayNavigationMobile({ dayIndex, diasTextoAbreviado, actualDay, isActual, isActive, setActive, showDayNumber }, key) {
    const classNameActualDay = isActual ? 'last-day-horario-head' : ''
    const classNameActiveDay = isActive ? 'active-horario-head' : ''
    const classNameNotShowDayNumber = !showDayNumber? 'hh-is-only-day-of-week-name':''
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
        <a key={key} href={`#day-${dayIndex}`} name={`#day-${dayIndex}`} className={`hh-menu-mobile-part-day ${classNameActualDay} ${classNameActiveDay} ${classNameNotShowDayNumber}`} onClick={funcionOnCLick}>
            <div className='hh-menu-mobile-day-day_number' >
                {diasTextoAbreviado}
            </div>
            {
                showDayNumber?
                <div className='hh-menu-mobile-day-day_text'>
                    {actualDay}
                </div>
                :
                <></>
            }
        
        </a>
    )
};

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



export default function Horario({ timeArray, mensajes, showDayNumber, lunesCercano }) {
    /* DATA */
    const dias = Array.from({ length: 5 }, (_, i) => { // el barra baja es para indicar que no haga caso a ese parametro
        var fecha = new Date(lunesCercano);
        fecha.setDate(fecha.getDate() + i);
        return fecha.getDate();
    });

    const isActualFechaiWithIndiceDay=(diaIndice)=>{
        const yearProve = lunesCercano.getFullYear();
        const monthProve = String(lunesCercano.getMonth() + 1).padStart(2, '0');
        const dayProve = parseInt(String(lunesCercano.getDate()).padStart(2, '0'))+diaIndice;

        const yearActual = getActualDate().getFullYear();
        const monthActual = String(getActualDate().getMonth() + 1).padStart(2, '0');
        const dayActual = String(getActualDate().getDate()).padStart(2, '0');

        return (yearProve==yearActual && monthProve==monthActual && dayProve==dayActual)
    }

    const indiceDiaActual = getActualDate().getDay() - 1;
    const diasTextoAbreviado = ['Lun', 'Mart', 'Mier', 'Juev', 'Vier']
    const isLastDayClassName = indiceDiaActual == 4 && isActualFechaiWithIndiceDay(4) ? 'is-last-day' : ''



    /* CAMBIO DE ELEMENTO NO RESPONSIVE PARA PC */
    const timeHoraHorarioRef = useRef(null);
    const [sizeTimeWidth, setSizeTimeWidth] = useState('auto');


    /*COMPONENTE PARA EL HORARIO MOBILE*/
    const containerNavRef = useRef(null);
    const [isMobile] = useMobile();
    const [indexActiveMobile, setActiveNavMobile] = useState(-1);

    /* comportamiento nav actual */
    const handleScroll = () => {
        const container = containerNavRef.current;
        if (!container || !container.children) return null;
        const children = Array.from(container.children);
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const rectChild = child.getBoundingClientRect();
            const rectContainer = container.getBoundingClientRect();
            if (rectChild.bottom >= rectContainer.top + 40) {
                setActiveNavMobile(i)
                break;
            }
        }
        return container;
    }
    useScrollComponent({ handleScroll, isMobile });
    const handleResize = () => {
        /*primer elemento cambiar tamaño (se descuadra hay que ajustarlo con js)*/
        if (timeHoraHorarioRef.current && !isMobile) {
            const { width } = timeHoraHorarioRef.current.getBoundingClientRect();
            setSizeTimeWidth(width)
            return timeHoraHorarioRef.current;
        }
        return null;
    }

    
    useResizeComponentAndWindow({ handleResize });

    return (

        <>
            {/*HORARIO INFO*/}
            <div className={`hh-horario-container flex-1${isLastDayClassName}`}>

                {!isMobile ?
                    <div className={`hh-horario-head ${isLastDayClassName}`}>

                        {/* horario cabezera dia */}
                        <div className={`hhdk-hora-head hh-first-space-grid ${indiceDiaActual == 0 ? 'hh-first-space-grid-active' : ''}`} style={{ width: sizeTimeWidth }}></div>
                        {dias.map((day, index) => (
                            <HorarioHeadDayWeek key={index} dayOfWeek={index} dayOfMonth={day} isActual={isActualFechaiWithIndiceDay(index)} showDayNumber={showDayNumber}/>
                        ))}
                    </div>
                    :
                    <div className='hh-navigation-container-day'>
                        <div className='hh-menu-mobile-day' >
                            {dias.map((actualDayVar, index) => (
                                <DayNavigationMobile key={index} dayIndex={index} diasTextoAbreviado={diasTextoAbreviado[index]}
                                    actualDay={actualDayVar} isActual={isActualFechaiWithIndiceDay(index)}
                                    setActive={setActiveNavMobile} isActive={indexActiveMobile == index}
                                    showDayNumber={showDayNumber} />
                            ))}
                        </div>
                    </div>}

                {!isMobile ?
                    <div className='hh-horario-table_list'>
                        {/* horario  hora*/}
                        {timeArray.map((hora, indexTime) => (
                            <React.Fragment key={indexTime}>
                                <HorarioTime time={hora} ref={timeHoraHorarioRef}></HorarioTime>
                                {dias.map((day, indexDia) => (
                                    <HorarioHora key={indexDia} isActual={isActualFechaiWithIndiceDay(indexDia)}>


                                        {mensajes.filter((element) => {
                                            return element.props.dia == indexDia && element.props.indice == indexTime
                                        }).map((mensaje, indexMensaje) => (
                                            mensaje
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
                                <HorarioHeadDayWeek dayOfWeek={indexDia} dayOfMonth={day} isActual={isActualFechaiWithIndiceDay(indexDia)} >
                                    {timeArray.map((hora, indexTime) => (
                                        <React.Fragment key={indexTime}>
                                            <HorarioTime time={hora} ref={timeHoraHorarioRef} isActual={isActualFechaiWithIndiceDay(indexDia)}></HorarioTime>
                                            <HorarioHora isActual={isActualFechaiWithIndiceDay(indexDia)}>

                                                {/* Aqui se imprimen los mensajes*/}

                                                {mensajes.filter((element) => {
                                                    return element.props.dia == indexDia && element.props.indice == indexTime
                                                }).map((mensaje, indexMensaje) => (
                                                    mensaje
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