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
            console.log("timeHorario:", timeHorario);
            console.log("horasHorario:", horasHorario);
            setAllHours(timeHorario);
            horasHorario = horasHorario.map((horaHorario,index)=>{
                const dia = horaHorario.tramoHorario.dia
                const indice = horaHorario.tramoHorario.indice
                const materia = horaHorario.sesion.materia.nombreCompleto
                const grupos = horaHorario.sesion.grupos
                const curso = horaHorario.sesion.grupos[0].curso.nombre
                const referenciaSesion = horaHorario.sesion.referencia
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
