import { useEffect, useState } from "react";
import useMobile from "../hooks/useMobile";
import { getAllHours } from "../service/TramoHorarioService";
import { getHorarioByProfesor } from "../service/HoraHorarioService";
import ContainerInfoGrupoYCurso from "./ContainerInfoGrupoYCurso";
import Loading from "./Utiles/Loading";
import MensajeHorario from "./MensajeHorario";
import Horario from "./Horario/Horario";
import WeekNavigation from "./Horario/WeekNavigation";
import { convertDateToString, getLunesCercano } from "../utils/myDateFunctions";
import PopUpCreateFaltaHorario from "./PopUps/PopUpCreateFaltaHorario";
import { getAllFaltasBetweenFechas } from "../service/FaltaService";

export default function FaltasMain(){
    const [fechaBase,setFechaBase] = useState(new Date())
    const [isLoad,setLoad] = useState(false)
    const [allHours,setAllHours] = useState(null);
    const [allElementsHour,setAllElementHour] = useState(null);
    const lunesCercano = getLunesCercano(fechaBase);

    /* FUNCIONES PARA AVANZAR EN EL TIEMPO*/
    const getViernes = ()=>{
        const fecha = new Date(lunesCercano);
        fecha.setDate(lunesCercano.getDate() + 4);
        return fecha;
    }

    /* HOOK INICIAL */
    useEffect(() => {
        Promise.all([
          getAllHours(),
          getAllFaltasBetweenFechas({ fechaInicio:convertDateToString(lunesCercano), fechaFin:convertDateToString(getViernes()) })
        ])
        .then(([timeHorario,faltas]) => {
            setAllHours(timeHorario);
            faltas = faltas.map((horaHorarioDTO,index)=>{
                const {dia,indice,materia,grupos,curso,referenciaSesion,profesor,nombreProfesor} = horaHorarioDTO
                const containerInfoGrupoYCurso = <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso} profesor={nombreProfesor}></ContainerInfoGrupoYCurso>
                return <MensajeHorario key={index} dia={dia} indice={indice} referenciaSesion={referenciaSesion} mensaje={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} PopUpComponent={PopUpCreateFaltaHorario}></MensajeHorario>
            })
            setAllElementHour(faltas)
            /*AQUI DECIMOS QUE CARGUE YA QUE EL FETCH SE HA HECHO CON EXITO */
            console.log("faltas");
            console.log(faltas);
            setLoad(true);
        })
        .catch((err) => {
            setLoad(false);
          console.log("err:", err);
        });
      }, [fechaBase]);

    return (
        <section className="hh-section-horario flex-1 flex flex-col justify-center">
        <div className="hm-title-container md:p-5 p-2">
            <h1 className='font-bold text-2xl text-blacklight'>Faltas</h1>
        </div>
        <WeekNavigation lunesCercano={lunesCercano} setFecha={setFechaBase}></WeekNavigation>

        {
            isLoad?<Horario timeArray={allHours} mensajes={allElementsHour} showDayNumber={true} lunesCercano={lunesCercano}></Horario>:<Loading></Loading>
        }
        


    </section>
    )
}