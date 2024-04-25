import { IonIcon } from '@ionic/react';
import './css/MenuMensajeHorario.css'
import { close } from 'ionicons/icons';
import MyCalendar from '../Utiles/MyCalendar';
export default function MenuMensajeHorario({ changeToClose, materia, containerInfoGrupoYCurso }) {
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
                    <div>
                        <p>Fecha:</p>
                        <MyCalendar></MyCalendar>
                    </div>
                    {containerInfoGrupoYCurso}
                    <div className='menumenh-info-comentario'>
                        <p>Comentario</p>
                        <textarea type="text" className='w-[100%]' />
                    </div>
                    <button>Enviar</button>

                </div>
            </div>
        </div>
    );
}