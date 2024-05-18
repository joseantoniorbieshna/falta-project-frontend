import { IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import 'react-toastify/dist/ReactToastify.css';
import './css/guardiasWindow.css';
import { useAuth } from '../../context/authenticationState';
import { getAllDayOfWeekString, getAllHoursOfDayString } from '../../utils/HoursAndWeekFunctions';
import { useState } from 'react';
import FaltaInGuardia from './FaltaInGuardia';
export default function GuardiasWindow({ dia, indice, changeToClose }) {

    const [isFirstSelected, setIsFirstSelected] = useState(true)

    const noPropagationChangeToClose = (e) => {
        if (e.target.id == 'parent-menu-mensaje') { changeToClose() }
    }

    return (
        <div className='guardia-window-parent h-[100vh] w-full absolute z-[200] top-0 left-0 bg-green flex flex-col items-center'>
            <div className='flex justify-end my-3 mr-5 w-full'>
                <IonIcon icon={close} onClick={changeToClose} className={'text-[black] text-4xl cursor-pointer'}></IonIcon>
            </div>
            <div className='w-[90%]'>
                <div className='bg-white flex flex-row gap-2 justify-center'>
                    <input type='button' className={`rounded-lg bg-black text-white py-2 flex-1 ${isFirstSelected ? 'selected-window-guardia' : ''}`} value={"FALTAS"} onClick={() => { setIsFirstSelected(true) }} />
                    <input type='button' className={`rounded-lg bg-black text-white py-2 flex-1 ${!isFirstSelected ? 'selected-window-guardia' : ''}`} value={"PROFESORES"} onClick={() => { setIsFirstSelected(false) }} />
                </div>
            </div>
            <div className='w-[90%] overflow-auto'>
                {isFirstSelected && <FaltaInGuardia dia={dia} indice={indice}></FaltaInGuardia>}
            </div>

        </div>
    );
}