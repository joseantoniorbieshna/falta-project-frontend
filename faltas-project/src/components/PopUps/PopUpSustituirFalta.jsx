import { IonIcon } from '@ionic/react';
import './css/PopUpGeneral.css'
import '../css/MensajeHorario.css'
import './css/PopUpSustituirFalta.css'
import { close } from 'ionicons/icons';
import { createFalta, sustituirFaltaApi } from '../../service/FaltaService';
import { useState } from 'react';
import { convertDateToString } from '../../utils/myDateFunctions';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/authenticationState';
export default function PopUpSustituirFalta({dia,indice, referenciaSesion, fechaInput, changeToClose, materia,comentario, containerInfoGrupoYCurso  }) {
    const diaDeLaSemanaPalabra = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    const indiceDeLaSemanaPalabra = ["Primera","Segunda","Tercera","Recreo","Cuarta","Quinta","Sexta"]
    const fechaFaltaString = fechaInput.toLocaleDateString("es-ES"); 
    const {checkIsLogin} = useAuth()

    const sustituirFalta = ()=>{
        const faltaSustituirInput = { dia, indice, referenciaSesion, fecha: convertDateToString(fechaInput)}

        sustituirFaltaApi(faltaSustituirInput)
        .then(res=>{
            toast.success('Falta sustituida con exito!', {
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
                checkIsLogin()
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
                checkIsLogin()

        })
    }

    const noPropagationChangeToClose = (e) => {
        if (e.target.id == 'parent-menu-mensaje') { changeToClose() }
    }

    return (
        <div className={`menumenh-container-parent`} id='parent-menu-mensaje' onClick={(e) => noPropagationChangeToClose(e)}>
            <div className="menumenh-container">
                    <IonIcon icon={close} onClick={changeToClose} className={'menumenh-close-button text-blacklight text-4xl cursor-pointer'}></IonIcon>
                <h1 className='menumenh-title bg-[#d9d9d9] menumenh-title-update text-2xl font-bold'>Sustituir Falta</h1>
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
                        <button className='menumh-button menumh-button-aceptar' onClick={(e)=>sustituirFalta()}>Aceptar</button>
                        <button className='menumh-button menumh-button-rechazar' onClick={(e)=>changeToClose()}>Rechazar</button>
                    </div>

                </div>  
            </div>
        </div>
    );
}