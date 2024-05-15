import React from 'react';
import { useState } from 'react'
import './css/MensajeHorario.css'
import GuardiasWindow from './Guardias/GuardiasWindow';
export default function MensajeGuardiahora({ dia, indice, PopUpComponent }) {
    const [isActive, setActive] = useState(false)
    const changeActive = () => {
        setActive(true);
    }
    const changeToClose = ()=>{
        setActive(false)
    }
    const additionalProps = {
        changeToClose: changeActive
    };

    return (
        <>
            <div className='m-mensaje bg-[#a7c1ff] flex items-center justify-center' dia={dia} indice={indice} onClick={changeActive}>
                    <h1 className='font-bold py-1'>
                        GUARDIA
                    </h1>
            </div>
            {
                isActive && <GuardiasWindow dia={dia} indice={indice} changeToClose={changeToClose}></GuardiasWindow>
            }
        </>
    )
}