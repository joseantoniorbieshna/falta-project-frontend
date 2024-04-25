import { useState } from 'react'
import './css/MensajeHorario.css'
import MenuMensajeHorario from './MenuMensajeHorario'
export default function MensajeHora({ mensaje, backgroundColor = '#dff2cd', grupos, curso, dia, indice }) {
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

                <div className='m-info-container'>
                    <div className='m-curso'>
                        <p className='m-curso-text'><span className='m-text-span'>Curso:</span>{curso}</p>
                    </div>
                    <div className='m-grupos'>
                        <p className='m-grupo-title'><span className='m-text-span'>Grupos:</span></p>
                        <div className='m-container-grupos'>
                            {
                                grupos.length == 1 ?
                                    grupos.map((grupo, index) => {
                                        return <p className='m-grupo-text'>{grupo.nombre}</p>
                                    })
                                    :
                                    grupos.map((grupo, index) => {
                                        return <p className='m-grupo-text m-grupo-text-multy'>{grupo.nombre}|</p>
                                    })
                            }
                        </div>
                    </div>


                </div>
            </div>
            {
                isActive?
                <MenuMensajeHorario changeToClose={changeActive}></MenuMensajeHorario>
                :
                <></>
            }
        </>
    )
}