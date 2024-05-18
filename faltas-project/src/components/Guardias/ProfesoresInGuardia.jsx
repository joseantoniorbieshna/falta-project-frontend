import React, { useEffect } from "react";
import '../css/MensajeHorario.css'

export default function ProfesoresInGuardia({ profesores }) {

    useEffect(() => {
    }, [])
    return (
        <>

            {
                    <>
                        {
                            profesores.map((profesor,index) => {
                                return <div key={index} className='py-6 p-2 rounded-[20px] w-[90%] cursor-pointer bg-green flex items-center justify-center'>
                                    <h1 className='font-bold py-1'>
                                        {console.log(profesor.nombre)}
                                        {profesor.nombre}
                                    </h1>
                                </div>
                            })
                        }
                    </>
            }
        </>
    )
}