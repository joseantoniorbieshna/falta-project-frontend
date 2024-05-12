/* WEEK NAVIGATION*/
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react'
import './css/Horario.css'
import { arrowBack, arrowForward } from 'ionicons/icons';
import CalendarWeekSelector from '../Utiles/CalendarWeekSelector';


export default function WeekNavigation({ lunesCercano, setFecha }) {
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


    const avanzarUnaSemana = ()=>{
        const fecha = new Date(lunesCercano);
        fecha.setDate(lunesCercano.getDate() + 7);
        setFecha(fecha)
    }

    const retrocederUnaSemana = ()=>{
        const fecha = new Date(lunesCercano);
        fecha.setDate(lunesCercano.getDate() - 7);
        setFecha(fecha)
    }

    return (
        <>
            <div className='wn-week-navigation-container p-5'>
                <div className='flex flex-row'>
                    <div>{`${lunesCercano.getDate()}-${viernesCercano.getDate()}`} {getMonths()} {getYears()}</div>
                    <div className='wn-container-buttons flex flex-row items-center ml-5'>
                        <IonIcon icon={arrowBack} className='text-black text-xl mr-5 cursor-pointer' onClick={retrocederUnaSemana}></IonIcon>
                        <CalendarWeekSelector setFecha={setFecha}></CalendarWeekSelector>
                        <IonIcon icon={arrowForward} className='text-black text-xl mr-5 cursor-pointer' onClick={avanzarUnaSemana}></IonIcon>
                    </div>
                </div>
            </div>
        </>
    )

}