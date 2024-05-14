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
import { getActualDate, getLunesCercano } from '../utils/myDateFunctions';
import PopUpCreateFaltaHorario from './PopUps/PopUpCreateFaltaHorario';
import { useAuth } from '../context/authenticationState';


export function HorarioMain() {
    const {isChecking, checkIsLogin,referenciaProfesor} = useAuth();
    const [isLoad,setLoad] = useState(false)
    const [allHours,setAllHours] = useState(null);
    const [allElementsHour,setAllElementHour] = useState(null);
    const [isMobile] = useMobile();
    const lunesCercano = getLunesCercano(getActualDate());
    /* FETCH DATA */

    const loadData=()=>{
        setLoad(false)
        Promise.all([
            getAllHours(),
            getHorarioByProfesor({referenciaProfesor:referenciaProfesor})
          ])
          .then(([timeHorario, horasHorario]) => {
              setAllHours(timeHorario);
              horasHorario = horasHorario.map((horaHorarioDTO,index)=>{
                  const {dia,indice,materia,grupos,curso,referenciaSesion} = horaHorarioDTO
                  const containerInfoGrupoYCurso = <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso}></ContainerInfoGrupoYCurso>
                  const poUp = <PopUpCreateFaltaHorario key={index} dia={dia} indice={indice} referenciaSesion={referenciaSesion} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} ></PopUpCreateFaltaHorario>
  
                  return <MensajeHorario key={index} dia={dia} indice={indice} referenciaSesion={referenciaSesion} mensaje={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} PopUpComponent={poUp}></MensajeHorario>
              })
              setAllElementHour(horasHorario)
              /*AQUI DECIMOS QUE CARGUE YA QUE EL FETCH SE HA HECHO CON EXITO */
              setLoad(true);
          })
          .catch((err) => {
              setLoad(false);
              console.log("err:", err);
              checkIsLogin()
          });
    }

    useEffect(() => {
        if(isChecking==false){
            loadData()
        }
      }, [isChecking]);
    return (
        <section className="hh-section-horario flex-1 flex flex-col justify-center">
            <div className="hm-title-container md:p-5 p-2">
                <h1 className='font-bold text-2xl text-blacklight'>Horario Escolar</h1>
            </div>
            {
                isLoad?<Horario timeArray={allHours} mensajes={allElementsHour} showDayNumber={false} lunesCercano={lunesCercano}></Horario>:<Loading></Loading>
            }
            
        </section>
    );
}
