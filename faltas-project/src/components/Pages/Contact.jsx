import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import jose from '../../assets/jose.jpg'
import code from '../../assets/code.jpg'

export default function Contact(){
 return (
 <div>
        <Link to='/home' className='flex items-start absolute top-2 left-2 w-auto bg-white rounded-md'>
            <IonIcon icon={homeOutline} class='text-black text-3xl cursor-pointer'></IonIcon>
        </Link>

        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${code})` }}></div>
        <div className="p-8">
          <div className="text-center">
            <img
              className="w-32 h-32 rounded-full mx-auto border-4 border-white -mt-16 shadow-lg"
              src={jose}
              alt="Jose Antonio"
            />
            <h1 className="text-4xl font-bold text-gray-800 mt-4">José Antonio Ramos Barragán</h1>
            <p className="text-gray-600 mt-2">
              Desarrollador de software.
            </p>
            <p className="text-gray-600 mt-2">Titulado en D.A.M en el IES Arroyo harnina</p>
          </div>
          <div className="flex justify-center mt-6">
             <a href="https://github.com/joseantoniorbieshna" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 mx-2">
               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 0C5.371 0 0 5.372 0 12c0 5.301 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577 0-.285-.01-1.04-.016-2.04-3.338.728-4.042-1.615-4.042-1.615-.545-1.384-1.33-1.753-1.33-1.753-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.238 1.84 1.238 1.068 1.83 2.803 1.3 3.487.994.108-.774.418-1.299.76-1.598-2.665-.305-5.467-1.334-5.467-5.932 0-1.311.469-2.381 1.236-3.221-.124-.304-.536-1.531.117-3.189 0 0 1.008-.322 3.3 1.23a11.458 11.458 0 0 1 3.003-.403c1.02.005 2.047.138 3.003.403 2.289-1.553 3.295-1.23 3.295-1.23.654 1.659.242 2.885.118 3.189.77.84 1.236 1.91 1.236 3.221 0 4.609-2.805 5.623-5.475 5.921.43.369.814 1.1.814 2.219 0 1.603-.015 2.897-.015 3.293 0 .319.192.694.799.577C20.565 21.795 24 17.296 24 12 24 5.372 18.627 0 12 0z" />
               </svg>
             </a>
             <a href="https://www.linkedin.com/in/jose-antonio-ramos-barragan-a3b58a279/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 mx-2">
               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M20.447 20.452H16.89v-5.412c0-1.292-.027-2.953-1.803-2.953-1.804 0-2.08 1.406-2.08 2.856v5.509h-3.561V8.907h3.415v1.566h.05c.476-.901 1.634-1.85 3.366-1.85 3.596 0 4.256 2.366 4.256 5.451v6.378zM5.337 7.432c-1.144 0-2.067-.93-2.067-2.077 0-1.148.923-2.078 2.067-2.078 1.145 0 2.068.93 2.068 2.078 0 1.147-.923 2.077-2.068 2.077zM6.946 20.452H3.729V8.907h3.217v11.545zM22.225 0H1.771C.792 0 .005.784.005 1.748v20.505C.005 23.211.792 24 1.771 24h20.451c.98 0 1.774-.789 1.774-1.748V1.748C23.999.784 23.206 0 22.225 0z" />
               </svg>
             </a>
             <a href="mailto:youjoserb1@gmail.com" className="text-gray-500 hover:text-gray-800 mx-2">
               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm-8 7-8-5v10h16V8l-8 5z" />
               </svg>
             </a>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}