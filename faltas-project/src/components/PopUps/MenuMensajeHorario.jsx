import { IonIcon } from '@ionic/react';
import './css/MenuMensajeHorario.css'
import { close } from 'ionicons/icons';
import MyCalendar from '../Utiles/MyCalendar';
import { createFalta } from '../../service/FaltaService';
import { useState } from 'react';
export default function MenuMensajeHorario({dia,indice, referenciaSesion, changeToClose, materia, containerInfoGrupoYCurso }) {
    const [myDate, setMyDate] = useState(null);
    const [comentario, setComentario] = useState('');
    const diaDeLaSemanaPalabra = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    const indiceDeLaSemanaPalabra = ["Primera","Segunda","Tercera","Recreo","Cuarta","Quinta","Sexta"]

    const crearFalta = ()=>{
        const faltaCreateObject={dia,indice,referenciaSesion,comentario,fecha:myDate.toISOString().split("T")[0]}
        console.log(faltaCreateObject);
        createFalta({faltaCreateInput:faltaCreateObject})
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const noPropagationChangeToClose = (e) => {
        if (e.target.id == 'parent-menu-mensaje') { changeToClose() }
    }

    return (
        <div className={`menumenh-container-parent`} id='parent-menu-mensaje' onClick={(e) => noPropagationChangeToClose(e)}>
            <div className="menumenh-container">
                    <IonIcon icon={close} onClick={changeToClose} className={'menumenh-close-button text-blacklight text-4xl cursor-pointer'}></IonIcon>
                <h1 className='menumenh-title text-4xl font-bold'>Registrar falta</h1>
                <div className='menumenh-container-info'>
                    <h2 className='text-2xl font-semibold'>{materia}</h2>
                    <div className='flex flex-row items-end'>
                        <p className='text-[0.8rem] italic mr-1 '>Dia:</p>
                        <p className='mr-2'>{diaDeLaSemanaPalabra[dia]}</p>
                        <p className='text-[0.8rem] italic mr-1'>Hora:</p>
                        <p>{indiceDeLaSemanaPalabra[indice]}</p>
                    </div>
                    <div>
                        <p className='text-[0.8rem] italic'>Fecha:</p>
                        <MyCalendar myDate={myDate} setMyDate={setMyDate}></MyCalendar>
                    </div>
                    {containerInfoGrupoYCurso}
                    <div className='menumenh-info-comentario'>
                        <p className='text-[0.8rem] italic'>Comentario:</p>
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