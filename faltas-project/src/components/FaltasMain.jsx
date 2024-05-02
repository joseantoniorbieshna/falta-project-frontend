import { useEffect, useState } from "react";
import useMobile from "../hooks/useMobile";
import { getAllHours } from "../service/TramoHorarioService";
import { getHorarioByProfesor } from "../service/HoraHorarioService";
import ContainerInfoGrupoYCurso from "./ContainerInfoGrupoYCurso";
import Loading from "./Utiles/Loading";
import MensajeHorario from "./MensajeHorario";
import Horario from "./Horario/Horario";
import WeekNavigation from "./Horario/WeekNavigation";
import { getLunesCercano } from "../utils/myDateFunctions";

export default function FaltasMain(){
    const [isLoad,setLoad] = useState(false)
    const [allHours,setAllHours] = useState(null);
    const [allElementsHour,setAllElementHour] = useState(null);
    const [isMobile] = useMobile();
    const lunesCercano = getLunesCercano(new Date());
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
            <h1 className='font-bold text-2xl text-blacklight'>Faltas</h1>
        </div>
        <WeekNavigation lunesCercano={lunesCercano}></WeekNavigation>

        {
            isLoad?<Horario timeArray={allHours} mensajes={allElementsHour} showDayNumber={true} lunesCercano={lunesCercano}></Horario>:<Loading></Loading>
        }
        


    </section>
    )
}