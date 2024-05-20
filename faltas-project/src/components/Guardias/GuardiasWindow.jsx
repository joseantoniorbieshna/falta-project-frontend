import { IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import 'react-toastify/dist/ReactToastify.css';
import './css/guardiasWindow.css';
import { useAuth } from '../../context/authenticationState';
import { getAllDayOfWeekString, getAllHoursOfDayString } from '../../utils/HoursAndWeekFunctions';
import { useEffect, useState } from 'react';
import FaltaInGuardia from './FaltaInGuardia';
import { getFaltasByDiaAndIndice } from '../../service/FaltaService';
import Loading from '../Utiles/Loading';
import { processFaltas } from '../../utils/faltaProcess';
import ProfesoresInGuardia from './ProfesoresInGuardia';
import { getAllGuardiaProfesorByDiaAndIndice } from '../../service/GuardiaService';
export default function GuardiasWindow({ dia, indice, changeToClose }) {
    const [isFirstSelected, setIsFirstSelected] = useState(true)
    const [allGuardias, setAllObject] = useState([]);
    const [allProfesores, setAllProfesores] = useState([]);
    const [isInRequest, setIsInRequest] = useState(true);
    const [fechasDistinct, setFechasDistint] = useState(new Set())
    const { referenciaProfesor, checkIsLogin } = useAuth();
    const loadData = () => {
        Promise.all([
            getFaltasByDiaAndIndice(dia, indice),
            getAllGuardiaProfesorByDiaAndIndice(dia,indice)
        ]).then(([guardiasActuales,profesoresList]) => {
            const resultDataSetObject = processFaltas(guardiasActuales, referenciaProfesor, true);
            setAllObject(resultDataSetObject)

            const uniqueDates = new Set();
            guardiasActuales.forEach((object, index) => {
                uniqueDates.add(object.fecha);
            });
            setFechasDistint(uniqueDates);
            
            setAllProfesores(profesoresList)

            setIsInRequest(false);
        }).catch((err) => {
            checkIsLogin()
            console.log(err);
        })
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <div className='guardia-window-parent h-[100dvh] w-full absolute z-[200] top-0 left-0 bg-green flex flex-col items-center'>
            <div className='flex justify-end my-3 mr-5 w-full'>
                <IonIcon icon={close} onClick={changeToClose} className={'text-[black] text-4xl cursor-pointer'}></IonIcon>
            </div>
            <div className='w-[90%] p-2'>
                <div className='bg-white flex flex-row gap-2 justify-center'>
                    <input type='button' className={`rounded-lg bg-black text-white py-2 flex-1 ${isFirstSelected ? 'selected-window-guardia' : ''}`} value={"FALTAS"} onClick={() => { setIsFirstSelected(true) }} />
                    <input type='button' className={`rounded-lg bg-black text-white py-2 flex-1 ${!isFirstSelected ? 'selected-window-guardia' : ''}`} value={"PROF. DE GUARDIA"} onClick={() => { setIsFirstSelected(false) }} />
                </div>
            </div>
            <div className='w-[90%] overflow-auto flex flex-col items-center gap-2'>
                {isInRequest && <div className='h-full flex align-middle justify-center'><Loading></Loading></div>}
                
                {!isInRequest && isFirstSelected && <FaltaInGuardia allGuardias={allGuardias} fechasDistinct={fechasDistinct} dia={dia} indice={indice}></FaltaInGuardia>}
                {!isInRequest && !isFirstSelected && <ProfesoresInGuardia profesores={allProfesores}></ProfesoresInGuardia>}
            </div>

        </div>
    );
}