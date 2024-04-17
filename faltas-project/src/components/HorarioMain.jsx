import './css/HorarioMain.css'
import { IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';

export function HorarioMain(){
    return (
        <section className="flex-1">
            <div className="hm-title-container p-5">
                <h1 className='font-bold text-2xl text-blacklight'>Horario Escolar</h1>
            </div>

            <div className='m-5'>
                <div className='flex flex-row mt-5'>
                    <div>Mayo 2023</div>
                    <div className='flex flex-row items-center ml-5'>
                        <IonIcon icon={arrowBack} className='text-black mr-5 cursor-pointer'></IonIcon>
                        <IonIcon icon={arrowForward} className='text-black mr-5 cursor-pointer'></IonIcon>
                    </div>
                
                </div>
            </div>
        </section>
    )
}