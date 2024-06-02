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
                                return <div key={index} className='py-6 p-2 rounded-[20px] w-[90%] cursor-pointer bg-green flex items-center justify-center flex-col'>
                                    <h1 className='font-bold py-1'>
                                        {profesor.nombre}
                                    </h1>
                                    <h1 className="font-bold py-1">Guardias sustituidas: {profesor.totalFaltasSustituidas}</h1>
                                </div>
                            })
                        }
                    </>
            }
        </>
    )
}