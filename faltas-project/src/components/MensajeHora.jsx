import React from 'react';
import { useState } from 'react'
import './css/MensajeHorario.css'
export default function MensajeHora({ mensaje, backgroundColor = '#dff2cd', containerInfoGrupoYCurso, dia, indice, PopUpComponent }) {
    const [isActive, setActive] = useState(false)
    const changeActive = () => {
        setActive(!isActive);
    }
    const additionalProps = {
        changeToClose: changeActive
    };

    return (
        <>
            <div className='m-mensaje' dia={dia} indice={indice} style={{ backgroundColor }} onClick={changeActive}>
                <div className='m-asignatura-container'>
                    <div className='m-asignatura-text'>
                        {mensaje}
                    </div>
                </div>
                {containerInfoGrupoYCurso}
               
            </div>
            {
                PopUpComponent && isActive?
                React.cloneElement(PopUpComponent, {...additionalProps })
                :<></>
            }
        </>
    )
}