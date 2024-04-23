import { IonIcon } from '@ionic/react'
import './css/HorarioMain.css'
import { arrowBack, arrowForward } from 'ionicons/icons'

export default function WeekNavigation({lunesCercano}){

    return (
        <>
        <div className='wn-week-navigation-container p-5'>
            <div className='flex flex-row'>
                <div>{`${lunesCercano}-${lunesCercano + 4}`} Mayo 2024</div>
                <div className='flex flex-row items-center ml-5'>
                    <IonIcon icon={arrowBack} className='text-black mr-5 cursor-pointer'></IonIcon>
                    <IonIcon icon={arrowForward} className='text-black mr-5 cursor-pointer'></IonIcon>
                </div>
            </div>
        </div>
    </>
    )

}