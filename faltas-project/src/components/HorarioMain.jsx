import React, { useRef, useState } from 'react';
import './css/HorarioMain.css'
import Horario from './Horario/Horario';
import useMobile from '../hooks/useMobile';
import { useEffect } from 'react';
import { getAllHours } from '../service/TramoHorarioService';
import { getHorarioByProfesor } from '../service/HoraHorarioService';
import WeekNavigation from './Horario/WeekNavigation';
import Loading from './Utiles/Loading';
import MensajeHorario from './MensajeHorario';
import ContainerInfoGrupoYCurso from './ContainerInfoGrupoYCurso';
import { getLunesCercano } from '../utils/myDateFunctions';


export function HorarioMain() {
    const [isLoad,setLoad] = useState(false)
    const [allHours,setAllHours] = useState(null);
    const [allElementsHour,setAllElementHour] = useState(null);
    const [isMobile] = useMobile();
    const lunesCercano = getLunesCercano(new Date());
    useEffect(() => {
        Promise.all([
          getAllHours(),
          getHorarioByProfesor({referenciaProfesor:"100041110"})
        ])
        .then(([timeHorario, horasHorario]) => {
            console.log("timeHorario:", timeHorario);
            console.log("horasHorario:", horasHorario);
            setAllHours(timeHorario);
            horasHorario = horasHorario.map((horaHorarioDTO,index)=>{
                const {dia,indice,materia,grupos,curso,referenciaSesion} = horaHorarioDTO
                const containerInfoGrupoYCurso = <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso}></ContainerInfoGrupoYCurso>
                return <MensajeHorario key={index} dia={dia} indice={indice} referenciaSesion={referenciaSesion} mensaje={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso}></MensajeHorario>
            })
            setAllElementHour(horasHorario)
            
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
                isLoad?<Horario timeArray={allHours} mensajes={allElementsHour} showDayNumber={false} lunesCercano={lunesCercano}></Horario>:<Loading></Loading>
            }
            


        </section>
    );
}
