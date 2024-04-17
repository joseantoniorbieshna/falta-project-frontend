import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './css/MainMenu.css'
import { IonIcon } from '@ionic/react';
import { logOutOutline,settingsOutline,calendar } from 'ionicons/icons';

export default function MainMenu(){
    const location = useLocation();
    const [activeButton, setActiveButton] = useState({
        horario: '',
        settings: ''
      });

    useEffect(() => {
      // Establecer el estado activo correspondiente según la ruta actual
      setActiveButton(prevState => ({
        ...prevState,
        horario: location.pathname === '/horario' ? 'active' : '',
        settings: location.pathname === '/settings' ? 'active' : '',
      }));
    }, [location.pathname]);
    
    return(
    <header className="mm-header flex flex-col w-[20vw] h-[100vh] items-center bg-gray ">

        <div className="mm-user-container flex flex-row items-center bg-[#fff] w-[80%] m-5 rounded-3xl py-5 px-3">
            <img className="mm-user-image rounded-full w-7 h-7" src="https://th.bing.com/th/id/OIP.R9HMSxN_IRyxw9-iE1usugAAAA?rs=1&pid=ImgDetMain"></img>
            <div className="flex flex-col ml-4 flex-1 overflow-hidden items-start">
                <h5 className="mm-text-user text-sm overflow-hidden font-bold text-blacklight">Jose Antonio Ramos</h5>
            </div>
        </div>

        <nav className="mm-nav flex flex-1 justify-between flex-col w-[80%] mt-4">
            <div>
                
                <ul>
                    <li>
                        <Link title="Horario" to='/horario' className={`mm-button ${activeButton.horario}`}>
                            <IonIcon icon={calendar} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                            <p className="mm-button-text">Horario</p>
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <hr className="mb-3 text-grayblack"/>
                <ul className="flex flex-col gap-5 mb-5">
                    <li>
                        <Link title="Configuración" to='/settings' className={`mm-button ${activeButton.settings}`}>
                            
                            <IonIcon icon={settingsOutline} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                            <p className="mm-button-text">Configuración</p>
                        </Link>
                    </li>
                    <li>
                        <Link title="Cerrar sesión" to='/home' className={`mm-button ${activeButton} `}>
                            <IonIcon icon={logOutOutline} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                            <p className="mm-button-text">Cerrar sesión</p>
                        </Link>
                    </li>
                </ul>
            </div>
        
        </nav>
    </header>
    )
}