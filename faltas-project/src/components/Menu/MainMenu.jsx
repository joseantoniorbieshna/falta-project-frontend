import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './css/MainMenu.css'
import { IonIcon } from '@ionic/react';
import { logOutOutline,settingsOutline,calendar, closeOutline, menuOutline, handLeft } from 'ionicons/icons';
import useMobile from "../../hooks/useMobile";
import useEffectAddWindowEvent from "../../hooks/useEffectAddWindowEvent";
import { useAuth } from "../../context/authenticationState";
export default function MainMenu(){
    const {logout} =useAuth();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState({
        faltas: '',
        horario: '',
        settings: '',
      });
      const [isMenuOpen, setMenuOpen] = useState(false);
      const toggleMenu = () => {
          setMenuOpen(!isMenuOpen);
      };

      const cerrarSesion=()=>{
        logout()
      }
  

    useEffect(() => {
      // Establecer el estado activo correspondiente según la ruta actual
      setActiveButton(prevState => ({
        ...prevState,
        faltas: location.pathname.startsWith('/faltas') || location.pathname.startsWith('/faltas/') ? 'active' : '',
        horario: location.pathname.startsWith('/horario') || location.pathname.startsWith('/horario/') ? 'active' : '',
        settings: location.pathname.startsWith('/settings') || location.pathname.startsWith('/settings/') ? 'active' : '',
      }));
    }, [location.pathname]);

    /* Main menu */
    const [height,setHeaderHeight]= useState(80)
    const [isMobile]=useMobile()
    const headerRef = useRef(null)
    const handleResize = ()=>{
        if(headerRef.current){
          const height = headerRef.current.clientHeight;
          setHeaderHeight(height);
        }
      };
    
    useEffectAddWindowEvent({handleResize,type:'resize', condition:isMobile});
    
    return(
    <header ref={headerRef} className="mm-header flex flex-col w-[20vw] items-center bg-gray ">

        <div className="mm-user-container flex flex-row items-center bg-[#fff] w-[80%] m-5 rounded-3xl py-5 px-3">
            <img className="mm-user-image rounded-full w-7 h-7" src="https://th.bing.com/th/id/OIP.R9HMSxN_IRyxw9-iE1usugAAAA?rs=1&pid=ImgDetMain"></img>
            <div className="flex flex-col ml-4 flex-1 overflow-hidden items-start">
                <h5 className="mm-text-user text-sm overflow-hidden font-bold text-blacklight">Jose Antonio Ramos</h5>
            </div>
        </div>
        <IonIcon onClick={toggleMenu} icon={isMenuOpen?closeOutline:menuOutline} className='mm-menu.icon text-black text-3xl cursor-pointer md:hidden'></IonIcon>
        <nav style={{top:height}} className={`mm-nav flex flex-1 justify-between flex-col w-[80%] mt-4 ${isMenuOpen?'menu-open':''}`}>
            <div>
                
                <ul className="flex flex-col gap-3">
                    <li>
                        <Link title="Horario" to='/horario' className={`mm-button ${activeButton.horario}`}>
                            <IonIcon icon={calendar} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                            <p className="mm-button-text">Horario</p>
                        </Link>
                    </li>
                    <li>
                        <Link title="Faltas" to='/faltas' className={`mm-button ${activeButton.faltas}`}>
                            <IonIcon icon={handLeft} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                            <p className="mm-button-text">Faltas</p>
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
                        <Link title="Cerrar sesión" to='/home' className={`mm-button ${activeButton}`} onClick={cerrarSesion}>
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