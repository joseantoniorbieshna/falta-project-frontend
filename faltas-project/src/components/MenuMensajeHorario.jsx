import { IonIcon } from '@ionic/react';
import './css/MenuMensajeHorario.css'
import { close } from 'ionicons/icons';
export default function MenuMensajeHorario({changeToClose}){
    const noPropagationChangeToClose=(e)=>{
        if(e.target.id=='parent-menu-mensaje'){
            changeToClose()
        }
    }
    return (
        <div className={`menumenh-container-parent`} id='parent-menu-mensaje' onClick={(e)=>noPropagationChangeToClose(e)}>
            <div className="menumenh-container">
                <IonIcon icon={close} onClick={changeToClose} className={'menumenh-close-button text-black text-4xl cursor-pointer'}></IonIcon>
                
                

            </div>
        </div>
    );
}