import React from 'react';
import { useState } from 'react'
import './css/MensajeHorario.css'
import { convertDateToString } from '../utils/myDateFunctions';
export default function MensajeHora({ mensaje, backgroundColor = '#dff2cd', containerInfoGrupoYCurso, dia, indice, fecha=new Date(), PopUpComponent }) {
    const [isActive, setActive] = useState(false)
    const changeActive = () => {
        setActive(!isActive);
    }
    const additionalProps = {
        changeToClose: changeActive
    };

    return (
        <>
            <div className='m-mensaje' dia={dia} indice={indice} fecha={convertDateToString(fecha)} style={{ backgroundColor }} onClick={changeActive}>
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