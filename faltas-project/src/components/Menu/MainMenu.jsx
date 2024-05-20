import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './css/MainMenu.css'
import logo from '../../assets/logohna.jpeg'
import { IonIcon } from '@ionic/react';
import { logOutOutline, settingsOutline, calendar, closeOutline, menuOutline, handLeft, key } from 'ionicons/icons';
import useMobile from "../../hooks/useMobile";
import useEffectAddWindowEvent from "../../hooks/useEffectAddWindowEvent";
import { useAuth } from "../../context/authenticationState";
export default function MainMenu() {
    const { isAdmin, logout } = useAuth();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState({
        faltas: '',
        horario: '',
        settings: '',
        admin: ''
    });
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const cerrarSesion = () => {
        logout()
    }


    useEffect(() => {
        // Establecer el estado activo correspondiente según la ruta actual
        setActiveButton(prevState => ({
            ...prevState,
            faltas: location.pathname.startsWith('/faltas') || location.pathname.startsWith('/faltas/') ? 'active' : '',
            horario: location.pathname.startsWith('/horario') || location.pathname.startsWith('/horario/') ? 'active' : '',
            settings: location.pathname.startsWith('/settings') || location.pathname.startsWith('/settings/') ? 'active' : '',
            admin: location.pathname.startsWith('/admin') || location.pathname.startsWith('/admin/') ? 'active' : '',
        }));
    }, [location.pathname]);

    /* Main menu */
    const [height, setHeaderHeight] = useState(80)
    const [isMobile] = useMobile()
    const headerRef = useRef(null)
    const handleResize = () => {
        if (headerRef.current) {
            const height = headerRef.current.clientHeight;
            setHeaderHeight(height);
        }
    };

    useEffectAddWindowEvent({ handleResize, type: 'resize', condition: isMobile });

    return (
        <header ref={headerRef} className="mm-header flex flex-col items-center bg-gray ">

            <div className="mm-user-container flex flex-row items-center bg-[#fff] w-[80%] m-5 rounded-3xl py-5 px-3">
                <img className="mm-user-image rounded-full w-8 h-8" src={logo}></img>
                <div className="flex flex-col ml-4 flex-1 overflow-hidden items-start">
                    <h5 className="mm-text-user text-sm overflow-hidden font-bold text-blacklight">Jose Antonio Ramos</h5>
                </div>
            </div>
            <IonIcon onClick={toggleMenu} icon={isMenuOpen ? closeOutline : menuOutline} className='mm-menu.icon text-black text-3xl cursor-pointer md:hidden'></IonIcon>
            <nav style={{ top: height }} className={`mm-nav flex flex-1 justify-between flex-col w-[80%] mt-4 ${isMenuOpen ? 'menu-open' : ''}`}>
                <div>

                    <ul className="flex flex-col gap-3 items-center md:items-start">
                    {
                            isAdmin &&
                            /* ADMIN OPT */
                            <>
                                <li className="w-full">
                                    <Link title="Admin" to='/admin' className={`mm-button ${activeButton.admin}`}>
                                        <IonIcon icon={key} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                                        <p className="mm-button-text">Admin</p>
                                    </Link>
                                </li>
                            </>
                        }
                        <>
                            <li className="w-full">
                                <Link title="Horario" to='/horario' className={`mm-button ${activeButton.horario}`}>
                                    <IonIcon icon={calendar} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                                    <p className="mm-button-text">Horario profesor/ra</p>
                                </Link>
                            </li>
                            <li className="w-full">
                                <Link title="Faltas" to='/faltas' className={`mm-button ${activeButton.faltas}`}>
                                    <IonIcon icon={handLeft} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                                    <p className="mm-button-text">Faltas</p>
                                </Link>
                            </li>
                        </>

                    </ul>
                </div>

                <div>
                    <hr className="mb-3 text-grayblack" />
                    <ul className="flex flex-col gap-5 mb-5 items-center md:items-start">
                        <li className="w-full">
                            <Link title="Configuración" to='/settings' className={`mm-button ${activeButton.settings}`}>
                                <IonIcon icon={settingsOutline} className={'text-black text-2xl cursor-pointer mm-icon'}></IonIcon>
                                <p className="mm-button-text">Configuración</p>
                            </Link>
                        </li>
                        <li className="w-full">
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