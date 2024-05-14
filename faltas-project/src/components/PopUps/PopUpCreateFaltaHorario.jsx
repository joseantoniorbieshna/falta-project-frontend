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

export default function PopUpCreateFaltaHorario({dia,indice, referenciaSesion, changeToClose, materia, containerInfoGrupoYCurso }) {
    const [myDate, setMyDate] = useState(null);
    const [comentario, setComentario] = useState('');
    const diaDeLaSemanaPalabra = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    const indiceDeLaSemanaPalabra = ["Primera","Segunda","Tercera","Recreo","Cuarta","Quinta","Sexta"]
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
                <h1 className='menumenh-title bg-[#dff2cd] text-2xl font-bold'>Registrar falta</h1>
                <div className='menumenh-container-info'>
                    <h2 className='text-lg font-semibold break-words'>{materia}</h2>
                    <div className='flex flex-row items-end'>
                        <p className='italic mr-2'><span className='m-text-span'>Dia: </span>{diaDeLaSemanaPalabra[dia]}</p>
                        <p className='italic'><span className='m-text-span'>Hora: </span>{indiceDeLaSemanaPalabra[indice]} </p>
                    </div>
                    <div>
                        <p className='text-[0.8rem] italic'><span className='m-text-span'>Fecha:</span></p>
                        <MyCalendar myDate={myDate} setMyDate={setMyDate} day={dia}></MyCalendar>
                    </div>
                    {containerInfoGrupoYCurso}
                    <div className='menumenh-info-comentario'>
                        <p className='text-[0.8rem] italic m-text-span'>Comentario:</p>
                        <textarea type="text" className='w-[100%]' onChange={(e)=>setComentario(e.target.value)}/>
                    </div>
                    <div className='menumh-send-container'>
                        <button className='menumh-button' onClick={(e)=>crearFalta()}>Registrar Falta</button>
                    </div>

                </div>
            </div>
        </div>
    );
}