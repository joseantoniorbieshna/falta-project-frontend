import React from 'react'
import './css/MensajeHorario.css'
import { getAllDayOfWeekString, getAllHoursOfDayString } from '../utils/HoursAndWeekFunctions'

export default function ContainerInfoGrupoYCurso({ curso, grupos, profesor = null, profesorSustituto, dia=null, indice=null, gap = null }) {
    const diaDeLaSemanaPalabra = getAllDayOfWeekString()
    const indiceDeLaSemanaPalabra = getAllHoursOfDayString()
    const containerStyle = {
        gap: gap ? `${gap}rem` : undefined
    }
    return (
        <>
            <div className='m-info-container' style={containerStyle}>
                {
                    dia!=null && indice!=null &&
                    <div className='flex flex-row items-end'>
                        <p className='mr-1 font-bold'>Día:</p>
                        <p className=''>{diaDeLaSemanaPalabra[dia]} a {indiceDeLaSemanaPalabra[indice]}</p>
                    </div>
                }
                <div className='m-curso'>
                    <p className='m-curso-text'><span className='font-bold mr-1'>Curso:</span>{curso}</p>
                </div>
                <div className='m-grupos'>
                    <p className='m-grupo-title break-all'><span className='font-bold mr-1'>Grupos:</span>
                        {
                            grupos.length == 1 ?
                                grupos.map((grupo, index) => {
                                    return <React.Fragment key={index}>{grupo.nombre}</React.Fragment>
                                })
                                :
                                grupos.map((grupo, index) => {
                                    return <React.Fragment key={index}>{grupo.nombre}|</React.Fragment>
                                })
                        }
                    </p>
                </div>
                {
                    profesor &&
                    <div className='m-container-profesor'>
                        <p className='m-profesor-text'><span className='font-bold mr-1'>Profesor:</span>{profesor}</p>
                    </div>
                }

                {
                    profesorSustituto &&
                    <div className='m-container-profesor'>
                        <p className='m-profesor-text'><span className='font-bold mr-1'>Profesor Sustituto:</span>{profesorSustituto}</p>
                    </div>
                }


            </div>
        </>
    )
}