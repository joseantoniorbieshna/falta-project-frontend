import React, { useRef, useState } from 'react';
import './css/HorarioMain.css'
import Horario from './Horario';
import useMobile from '../hooks/useMobile';
import { useEffect } from 'react';
import { getAllHours } from '../service/TramoHorarioService';
import { getHorarioByProfesor } from '../service/HoraHorarioService';
import WeekNavigation from './WeekNavigation';
import Loading from './Loading';
import MensajeHorario from './MensajeHorario';


export function HorarioMain() {
    const [isLoad,setLoad] = useState(false)
    const [allHours,setAllHours] = useState(null);
    const [allElementsHour,setAllElementHour] = useState(null);
    const [isMobile] = useMobile();
    const lunesCercano = 15;
    const dias = [lunesCercano, lunesCercano + 1, lunesCercano + 2, lunesCercano + 3, lunesCercano + 4]
    useEffect(() => {
        Promise.all([
          getAllHours(),
          getHorarioByProfesor({referenciaProfesor:"100041110"})
        ])
        .then(([timeHorario, horasHorario]) => {

            setAllHours(timeHorario);
            horasHorario = horasHorario.map((horaHorario)=>{
                const dia = horaHorario.tramoHorario.dia
                const indice = horaHorario.tramoHorario.indice
                const profesor = horaHorario.sesion.profesor.nombre
                const materia = horaHorario.sesion.materia.nombreCompleto
                return <MensajeHorario dia={dia} indice={indice} mensaje={materia}></MensajeHorario>
            })
            setAllElementHour(horasHorario)
            console.log("timeHorario:", timeHorario);
            console.log("horasHorario:", horasHorario);
            setLoad(true);
        })
        .catch((err) => {
            setLoad(false);
          console.log("err:", err);
        });
      }, []);
    return (
        <section className="hh-section-horario flex-1 flex flex-col justify-center">
            <div className="hm-title-container p-5">
                <h1 className='font-bold text-2xl text-blacklight'>Horario Escolar</h1>
            </div>
            {
                isMobile?
                <></>
                :
                //<WeekNavigation lunesCercano={lunesCercano}></WeekNavigation>
                <></>
            }
            {
                isLoad?<Horario timeArray={allHours} mensajes={allElementsHour} showDayNumber={false}></Horario>:<Loading></Loading>
            }
            


        </section>
    );
}
