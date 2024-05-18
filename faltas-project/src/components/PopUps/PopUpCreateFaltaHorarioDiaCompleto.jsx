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
import { getAllDayOfWeekString } from '../../utils/HoursAndWeekFunctions';

export default function PopUpCreateFaltaHorarioDiaCompleto({ dia, changeToClose }) {
    const [myDate, setMyDate] = useState(null);
    const [comentario, setComentario] = useState('');
    const diaDeLaSemanaPalabra = getAllDayOfWeekString()
    const { checkIsLogin } = useAuth()

    const crearAllFaltas = () => {
        /* VALIDACION */
        if (myDate == null) {
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
        const faltaCreateObject = { dia, comentario, fecha: convertDateToString(myDate) }
        console.log("registrar");
        /*
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
        */
    }

    const noPropagationChangeToClose = (e) => {
        if (e.target.id == 'parent-menu-mensaje') { changeToClose() }
    }

    return (
        <div className={`menumenh-container-parent`} id='parent-menu-mensaje' onClick={(e) => noPropagationChangeToClose(e)}>
            <div className="menumenh-container">
                <IonIcon icon={close} onClick={changeToClose} className={'menumenh-close-button text-blacklight text-4xl cursor-pointer'}></IonIcon>
                <div className='menunh-container-middle'>
                    <h1 className='menumenh-title text-2xl font-bold border-b-4 border-green'>Registrar falta día completo</h1>
                    <div className='menumenh-container-info'>
                        <h2 className='text-lg font-semibold break-words'>Dia completo</h2>
                        <div className='flex flex-row items-end'>
                            <p className='mr-2 font-bold'>Día:</p>
                            <p className=''>{diaDeLaSemanaPalabra[dia]}</p>
                        </div>
                        <div className='flex flex-wrap flex-row items-center'>
                            <p className='mr-1 font-bold'>Fecha:</p>
                            <MyCalendar myDate={myDate} setMyDate={setMyDate} day={dia}></MyCalendar>
                        </div>
                        <div className='menumenh-info-comentario flex-auto'>
                            <p className='font-bold'>Comentario:</p>
                            <textarea type="text" className='m-text-comment w-[100%] flex-auto' onChange={(e) => setComentario(e.target.value)} />
                        </div>
                        <div className='menumh-send-container menumh-send-container-create'>
                            <button className='menumh-button menumh-button-aceptar' onClick={(e) => crearAllFaltas()}>Registrar Faltas</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}