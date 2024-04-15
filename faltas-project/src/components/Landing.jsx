import { useState } from 'react';
import logo from '../assets/school.png'
import './css/landing.css'
export default function Landing() {
    const[isMenuOpen,setMenuOpen]=useState( false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <>
        <header className='bg-green'>
            <nav className='flex ju justify-between items-center w-[92%] mx-auto py-3'>
                <div className='flex items-center gap-3'>
                    <img className='w-10' src={logo} alt='no image'></img>
                    <h2 className='font-bold'>FaltaTracker</h2>
                </div>
                <div className={`absolute md:static bg-green md:min-h-fit min-h-[60vh] left-0
                w-full md:w-fit flex items-center justify-start md:justify-center px-5 ${isMenuOpen?'top-[9%]':'top-[-1000%]'}`}>
                    <ul className='flex md:flex-row flex-col gap-[4vw] md:items-center'>
                        <li>
                            <a className='text-blacklight hover:font-bold' href='#'>Inicio</a>
                        </li>
                        <li>
                            <a className='text-blacklight hover:font-bold' href='#'>Acerca de</a>
                        </li>
                        <li>
                            <a className='text-blacklight hover:font-bold' href='#'>Contacto</a>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center gap-6'>
                    <button className='bg-black text-white px-5 py-2 rounded-full hover:bg-gray hover:text-black'>Iniciar sesión</button>
                    <ion-icon onClick={toggleMenu} name={isMenuOpen?'close':'menu'} class='text-black text-3xl cursor-pointer md:hidden'></ion-icon>
                </div>
            </nav>
        </header>


        <section className='flex flex-col gap-10 md:flex-row-reverse items-center justify-center md:h-[90vh]'>
            <div className='md:max-w-[50vw] max-w-[80%] flex items-start'>
                <img  className='' src={logo}></img>
            </div>
            <div className='flex flex-col gap-5 md:max-w-[50vw] max-w-[80%]'>
                <h1 className='text-5xl font-bold text-pretty'>Organiza tu horario y registra faltas de asistencias</h1>
                <p className='text-pretty'>Producimos horarios seguros y garantizamos el seguimiento de faltas de asistencias.</p>
                <div className='flex gap-5'>
                    <button className='bg-black text-white rounded-full px-5 py-3'>Explorar</button>
                    <button className='bg-black text-white rounded-full px-5 py-3'>Ver mas</button>
                </div>
            </div>
        </section>
        </>
    );
}