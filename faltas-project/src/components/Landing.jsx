import { useEffect, useRef, useState } from 'react';
import logo from '../assets/school.png'
import './css/landing.css'
import { Link } from 'react-router-dom';
export default function Landing() {
    const headerRef = useRef(null); // Referencia para el header
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState('9%'); // Estado para almacenar la altura del header

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };



  useEffect(() => {
    const handleResize = () => {
      if(headerRef.current){
        const height = headerRef.current.clientHeight;
        setHeaderHeight(height);
        console.log(height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
    return (
        <>
        <header className='bg-green' ref={headerRef}>
            <nav className='flex ju justify-between items-center w-[92%] mx-auto py-3'>
                <div className='flex items-center gap-3'>
                    <img className='w-10' src={logo} alt='no image'></img>
                    <h2 className='font-bold'>FaltaTracker</h2>
                </div>
                <div className={`absolute md:static bg-green md:min-h-fit min-h-[60vh] left-0
                w-full md:w-fit flex items-center justify-start md:justify-center px-5`}
                style={{ top: isMenuOpen ? headerHeight : '-1000%' }}>
                    <ul className='flex md:flex-row flex-col gap-[4vw] md:items-center'>
                        <li>
                            <Link className='text-blacklight hover:font-bold' to='/home'>Inicio</Link>
                        </li>
                        <li>
                            <Link className='text-blacklight hover:font-bold' to='/about'>Acerca de</Link>
                        </li>
                        <li>
                            <Link className='text-blacklight hover:font-bold' to='/contact'>Contacto</Link>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center gap-6'>
                    <Link to='/login'>
                        <button className='bg-black text-white px-5 py-2 rounded-full hover:bg-gray hover:text-black'>Iniciar sesión</button>
                    </Link>
                    <ion-icon onClick={toggleMenu} name={isMenuOpen?'close':'menu'} class='text-black text-3xl cursor-pointer md:hidden'></ion-icon>
                </div>
            </nav>
        </header>


        <section className='flex flex-1 overflow-y-auto flex-col gap-10 md:flex-row-reverse items-center justify-center'>
            <div className='md:max-w-[40vw] max-w-[80%] flex items-start'>
                <img  className='' src={logo}></img>
            </div>
            <div className='flex flex-col gap-5 md:max-w-[40vw] max-w-[80%]'>
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