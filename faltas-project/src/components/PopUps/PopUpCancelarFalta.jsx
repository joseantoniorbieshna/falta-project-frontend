import { IonIcon } from '@ionic/react';
import './css/PopUpGeneral.css'
import '../css/MensajeHorario.css'
import './css/PopUpSustituirFalta.css'
import { close } from 'ionicons/icons';
import { cancelarFaltaApi } from '../../service/FaltaService';
import { useState } from 'react';
import { convertDateToString } from '../../utils/myDateFunctions';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function PopUpCancelarFalta({dia,indice, referenciaSesion, fechaInput, changeToClose, materia,comentario, containerInfoGrupoYCurso  }) {
    const diaDeLaSemanaPalabra = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    const indiceDeLaSemanaPalabra = ["Primera","Segunda","Tercera","Recreo","Cuarta","Quinta","Sexta"]
    const fechaFaltaString = fechaInput.toLocaleDateString("es-ES"); 

    const cancelarFalta = ()=>{
        const faltaCancelarInput = { dia, indice, referenciaSesion, fecha: convertDateToString(fechaInput)}

        cancelarFaltaApi(faltaCancelarInput)
        .then(res=>{
            toast.success('Falta cancelada con exito!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        })
        .catch(err=>{
            toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });

        })
    }

    const noPropagationChangeToClose = (e) => {
        if (e.target.id == 'parent-menu-mensaje') { changeToClose() }
    }

    return (
        <div className={`menumenh-container-parent`} id='parent-menu-mensaje' onClick={(e) => noPropagationChangeToClose(e)}>
            <div className="menumenh-container">
                <IonIcon icon={close} onClick={changeToClose} className={'menumenh-close-button text-blacklight text-4xl cursor-pointer'}></IonIcon>
                <h1 className='menumenh-title bg-[#dff2cd] menumenh-title-update text-2xl font-bold'>Observar/Cancelar Falta</h1>
                <div className='menumenh-container-info'>
                    <h2 className='text-lg font-semibold'>{materia}</h2>
                    <div className='flex flex-row items-end'>
                        <p className='text-[0.8rem] italic mr-1 '><span className='m-text-span'>Dia:</span></p>
                        <p className='mr-2'>{diaDeLaSemanaPalabra[dia]}</p>
                        <p className='text-[0.8rem] italic mr-1'><span className='m-text-span'>Hora:</span></p>
                        <p>{indiceDeLaSemanaPalabra[indice]}</p>
                    </div>
                    <div>
                    <p className='text-[0.8rem] italic mr-1 '><span className='m-text-span span-bottom'>Fecha: </span>{fechaFaltaString}</p>
                    </div>
                    {containerInfoGrupoYCurso}
                    <div className='menumenh-info-comentario'>
                        <p className='text-[0.8rem] italic'><span className='m-text-span'>Comentario:</span></p>
                        <textarea disabled type="text" className='w-[100%] rounded-md bg-[white]' value={comentario}/>
                    </div>
                    <div className='menumh-send-container'>
                        <button className='menumh-button menumh-button-rechazar' onClick={(e)=>cancelarFalta()}>Cancelar Falta</button>
                        <button className='menumh-button' onClick={(e)=>changeToClose()}>Volver atrás</button>
                    </div>

                </div>  
            </div>
        </div>
    );
}