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
import { useAuth } from '../../context/authenticationState';
import { getAllDayOfWeekString, getAllHoursOfDayString } from '../../utils/HoursAndWeekFunctions';
export default function PopUpCancelarFalta({dia,indice, referenciaSesion, fechaInput, changeToClose, materia,comentario, containerInfoGrupoYCurso  }) {
    const diaDeLaSemanaPalabra = getAllDayOfWeekString()
    const indiceDeLaSemanaPalabra = getAllHoursOfDayString()
    const fechaFaltaString = fechaInput.toLocaleDateString("es-ES"); 
    const {checkIsLogin} = useAuth()

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
                <div className='menunh-container-middle'>

                <h1 className='menumenh-title menumenh-title-update text-2xl font-bold border-b-4 border-b-red'>Cancelar sustitución</h1>
                <div className='menumenh-container-info'>
                    <h2 className='text-lg font-semibold'>{materia}</h2>
                    <div className='flex flex-row items-end'>
                        <p className='mr-2 font-bold'>Información día:</p>
                        <p className=''>{diaDeLaSemanaPalabra[dia]} a {indiceDeLaSemanaPalabra[indice]}</p>
                    </div>
                    <div>
                    <p className=' mr-1 font-bold'>Fecha: <span className='font-normal'>{fechaFaltaString}</span></p>
                    </div>
                    {containerInfoGrupoYCurso}
                    <div className='menumenh-info-comentario'>
                        <p className='font-bold'>Comentario:</p>
                        <textarea disabled type="text" className='w-[100%] rounded-md bg-[white]' value={comentario}/>
                    </div>
                    <div className='menumh-send-container'>
                        <button className='menumh-button menumh-button-rechazar' onClick={(e)=>cancelarFalta()}>SI</button>
                        <button className='menumh-button' onClick={(e)=>changeToClose()}>NO</button>
                    </div>

                </div>

                </div>  
            </div>
        </div>
    );
}