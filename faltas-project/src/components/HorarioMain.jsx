import React, { useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import './css/HorarioMain.css'
import Horario from './Horario';
import useMobile from '../hooks/useMobile';


export function HorarioMain() {
    const [isMobile] = useMobile();
    const lunesCercano = 15;
    const dias = [lunesCercano, lunesCercano + 1, lunesCercano + 2, lunesCercano + 3, lunesCercano + 4]

    return (
        <section className="hh-section-horario flex-1 flex flex-col justify-center">
            <div className="hm-title-container p-5">
                <h1 className='font-bold text-2xl text-blacklight'>Horario Escolar</h1>
            </div>
            <Horario></Horario>


        </section>
    );
}
