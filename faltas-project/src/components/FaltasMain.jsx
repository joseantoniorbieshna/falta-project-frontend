import { useEffect, useState } from "react";
import useMobile from "../hooks/useMobile";
import { getAllHours } from "../service/TramoHorarioService";
import { getHorarioByProfesor } from "../service/HoraHorarioService";
import ContainerInfoGrupoYCurso from "./ContainerInfoGrupoYCurso";
import Loading from "./Utiles/Loading";
import MensajeHorario from "./MensajeHorario";
import Horario from "./Horario/Horario";
import WeekNavigation from "./Horario/WeekNavigation";
import { convertDateToString, getActualDate, getLunesCercano } from "../utils/myDateFunctions";
import { getAllFaltasBetweenFechas } from "../service/FaltaService";
import PopUpSustituirFalta from "./PopUps/PopUpSustituirFalta";
import PopUpEditarEliminarFalta from "./PopUps/PopUpEditarEliminarFalta";

export default function FaltasMain(){
    const [fechaBase,setFechaBase] = useState(getActualDate())
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
        setLoad(false);
        Promise.all([
          getAllHours(),
          getAllFaltasBetweenFechas({ fechaInicio:convertDateToString(lunesCercano), fechaFin:convertDateToString(getViernes()) })
        ])
        .then(([timeHorario,faltas]) => {
            setAllHours(timeHorario);
            faltas = faltas.map((horaHorarioDTO,index)=>{
                const referenciaProfesorSesionActual = "100041110"
                const {comentario,fecha,referenciaSesion,dia,indice,materia,grupos,curso,nombreProfesor,referenciaProfesor,nombreProfesorSustituto,referenciaProfesorSustituto} = horaHorarioDTO

                const containerInfoGrupoYCurso = <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso} profesor={nombreProfesor} profesorSustituto={nombreProfesorSustituto}></ContainerInfoGrupoYCurso>
                let poUp = null
                
                /* COLOR Y ACCION*/
                let color="#d3d3d3"; // COLOR POR DEFECTO (GRIS)
                console.log(referenciaProfesor);
                if(referenciaProfesorSesionActual==referenciaProfesor){ // Es mi falta
                    console.log("falta mia");
                    color="#9cd6ff" // COLOR ES MI FALTA (AZUL) 
                    poUp = <PopUpEditarEliminarFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso}comentarioInput={comentario} fechaInput={fecha}></PopUpEditarEliminarFalta>
                }else if(nombreProfesorSustituto && referenciaProfesorSustituto!=referenciaProfesorSesionActual){ // La estoy sustituyendo
                    color= "#ff9c9c"
                    poUp=null //poner accion popup para poder eliminar mi falta
                }else{
                    poUp = <PopUpSustituirFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} comentario={comentario}></PopUpSustituirFalta>
                }

                return <MensajeHorario backgroundColor={color} key={index} dia={dia} indice={indice} referenciaSesion={referenciaSesion} mensaje={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} PopUpComponent={poUp}></MensajeHorario>
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