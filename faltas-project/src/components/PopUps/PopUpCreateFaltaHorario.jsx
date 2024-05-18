import { IonIcon } from '@ionic/react';
import './css/PopUpGeneral.css'
import '../css/MensajeHorario.css'
import { close } from 'ionicons/icons';
import MyCalendar from '../Utiles/MyCalendar';
import { createFalta } from '../../service/FaltaService';
import { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertDateToString } from '../../utils/myDateFunctions';
import { useAuth } from '../../context/authenticationState';
import { getAllDayOfWeekString, getAllHoursOfDayString } from '../../utils/HoursAndWeekFunctions';

export default function PopUpCreateFaltaHorario({dia,indice, referenciaSesion, changeToClose, materia, containerInfoGrupoYCurso }) {
    const [myDate, setMyDate] = useState(null);
    const [comentario, setComentario] = useState('');
    const diaDeLaSemanaPalabra = getAllDayOfWeekString()
    const indiceDeLaSemanaPalabra = getAllHoursOfDayString()
    const {checkIsLogin} = useAuth()

    const crearFalta = ()=>{
        /* VALIDACION */
        if(myDate==null){
            toast.error("Introduce una fecha", {
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
            return
        }
        /* QUERY */
        const faltaCreateObject={dia,indice,referenciaSesion,comentario,fecha:convertDateToString(myDate)}
        createFalta(faltaCreateObject)
        .then((data)=>{
            toast.success('Falta creada con exito!', {
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
        .catch((err)=>{
            console.log(err.message);
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
                <h1 className='menumenh-title text-4xl font-bold border-b-4 border-b-green'>Registrar falta</h1>
                <div className='menumenh-container-info'>
                    <h2 className='text-lg font-semibold break-words'>{materia}</h2>
                    <div className='flex flex-row items-end'>
                        <p className='mr-1 font-bold'>Información día:</p>
                        <p className=''>{diaDeLaSemanaPalabra[dia]} a {indiceDeLaSemanaPalabra[indice]}</p>
                    </div>
                    <div className='flex flex-wrap flex-row items-center'>
                        <p className='mr-1 font-bold'>Fecha:</p>
                        <MyCalendar myDate={myDate} setMyDate={setMyDate} day={dia}></MyCalendar>
                    </div>
                    {containerInfoGrupoYCurso}
                    <div className='menumenh-info-comentario'>
                        <p className='font-bold'>Comentario:</p>
                        <textarea type="text" className='m-text-comment w-[100%]' onChange={(e)=>setComentario(e.target.value)}/>
                    </div>
                    <div className='menumh-send-container'>
                        <button className='menumh-button menumh-button-aceptar' onClick={(e)=>crearFalta()}>SI</button>
                        <button className='menumh-button' onClick={(e)=>crearFalta()}>NO</button>
                    </div>

                </div>
                </div>

            </div>
        </div>
    );
}