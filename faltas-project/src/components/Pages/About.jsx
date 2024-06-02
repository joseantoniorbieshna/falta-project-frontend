import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import jose from '../../assets/jose.jpg'
import code from '../../assets/code.jpg'

export default function About(){
    return (
        <div className="flex flex-auto flex-col items-center ">
        <Link to='/home' className='flex items-start w-full'>
            <IonIcon icon={homeOutline} class='text-black text-3xl cursor-pointer'></IonIcon>
        </Link>
            <div className="flex-auto flex flex-col items-center justify-center w-[90%] gap-2">
                <h1 className='font-bold text-3xl text-center'>Nota Importante</h1>
                <p className='text-center'>Esta página web está actualmente en desarrollo. Algunas funcionalidades pueden no estar completas o no funcionar como se espera.</p>
                <p className='text-center'>Agradecemos su comprensión y paciencia mientras trabajamos para finalizar y mejorar la aplicación. ¡Gracias por su apoyo!</p>
            </div>
        </div>
    )
}