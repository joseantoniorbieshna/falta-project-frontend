import { useState } from 'react'
import './css/MensajeHorario.css'
export default function MensajeHora({ mensaje, backgroundColor = '#dff2cd', containerInfoGrupoYCurso, dia, indice, referenciaSesion, PopUpComponent }) {
    const [isActive, setActive] = useState(false)
    const changeActive = () => {
        setActive(!isActive);
    }


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
                isActive?
                <PopUpComponent changeToClose={changeActive} dia={dia} indice={indice} referenciaSesion={referenciaSesion} materia={mensaje} containerInfoGrupoYCurso={containerInfoGrupoYCurso}></PopUpComponent>
                :
                <></>
            }
        </>
    )
}