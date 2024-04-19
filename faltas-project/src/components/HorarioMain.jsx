import React, { useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import './css/HorarioMain.css'
import Horario from './Horario';


export function HorarioMain() {
    const lunesCercano = 15;

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
            <Horario></Horario>


        </section>
    );
}
