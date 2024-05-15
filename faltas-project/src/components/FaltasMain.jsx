import { useEffect, useState } from "react";
import useMobile from "../hooks/useMobile";
import { getAllHours } from "../service/TramoHorarioService";
import { getHorarioByProfesor } from "../service/HoraHorarioService";
import ContainerInfoGrupoYCurso from "./ContainerInfoGrupoYCurso";
import Loading from "./Utiles/Loading";
import MensajeHorario from "./MensajeHora";
import Horario from "./Horario/Horario";
import WeekNavigation from "./Horario/WeekNavigation";
import { convertDateToObjYearMonthDay, convertDateToString, getActualDate, getLunesCercano } from "../utils/myDateFunctions";
import { getAllFaltasBetweenFechas } from "../service/FaltaService";
import PopUpSustituirFalta from "./PopUps/PopUpSustituirFalta";
import PopUpEditarEliminarFalta from "./PopUps/PopUpEditarEliminarFalta";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authenticationState";
import PopUpCancelarFalta from "./PopUps/PopUpCancelarFalta";
function getFechaBase(year, month, day) {
    if (!isNaN(year) && year != null && !isNaN(month) && month != null && !isNaN(day) && day != null) {
        try {
            console.log(day + "---" + month + "..." + day);
            const date = new Date(year + "-" + month + "-" + day);
            console.log("obtengo la fecha de URL");
            return date;
        } catch {
            console.log("Error al parsear el dia");
        }
    }
    console.log("obtengo la fecha del hora actual");
    return getActualDate();
}

export default function FaltasMain() {
    const { isChecking,checkIsLogin,referenciaProfesor } = useAuth();
    const [referenciaProfesorSesionActual, setReferenciaProfesorSesionActual] = useState(referenciaProfesor)
    const { year, month, day } = useParams();
    const navigate = useNavigate();
    const [fechaBase, setFechaBase] = useState(getFechaBase(year, month, day))
    const [isLoad, setLoad] = useState(false)
    const [allHours, setAllHours] = useState(null);
    const [allElementsHour, setAllElementHour] = useState(null);

    const lunesCercano = getLunesCercano(fechaBase);

    /* FUNCIONES PARA AVANZAR EN EL TIEMPO*/
    const getViernes = () => {
        const fecha = new Date(lunesCercano);
        fecha.setDate(lunesCercano.getDate() + 4);
        return fecha;
    }

    /* HOOK INICIAL */

    const loadDataApi = () => {
        setLoad(false);
        Promise.all([
            getAllHours(),
            getAllFaltasBetweenFechas({ fechaInicio: convertDateToString(lunesCercano), fechaFin: convertDateToString(getViernes()) })
        ])
            .then(([timeHorario, faltas]) => {
                setAllHours(timeHorario);
                faltas = faltas.map((horaHorarioDTO, index) => {
                    const { comentario, fecha, referenciaSesion, dia, indice, materia, grupos, curso, nombreProfesor, referenciaProfesor, nombreProfesorSustituto, referenciaProfesorSustituto } = horaHorarioDTO

                    const containerInfoGrupoYCurso = <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso} profesor={nombreProfesor} profesorSustituto={nombreProfesorSustituto}></ContainerInfoGrupoYCurso>
                    let poUp = null

                    /* COLOR Y ACCION*/
                    let color = "#d3d3d3"; // COLOR POR DEFECTO (GRIS)
                    console.log(referenciaProfesor);
                    console.log(referenciaProfesorSustituto + " - " + referenciaProfesorSesionActual);
                    if (referenciaProfesorSesionActual == referenciaProfesor) { // Es mi falta
                        console.log("falta mia");
                        color = "#9cd6ff" // COLOR ES MI FALTA (AZUL) 
                        poUp = <PopUpEditarEliminarFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} comentarioInput={comentario} fechaInput={fecha}></PopUpEditarEliminarFalta>
                    } else if (referenciaProfesorSustituto != null && referenciaProfesorSustituto == referenciaProfesorSesionActual) { // La estoy sustituyendo
                        color = "#dff2cd"
                        poUp = <PopUpCancelarFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} fechaInput={fecha} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} comentario={comentario}></PopUpCancelarFalta>
                    } else if (referenciaProfesorSustituto != null && referenciaProfesorSustituto != referenciaProfesorSesionActual) { // La sustituye otra persona
                        color = "#ff9c9c"
                        poUp = null // quizas poder ver ?? 
                    } else { // default
                        poUp = <PopUpSustituirFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} fechaInput={fecha} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} comentario={comentario}></PopUpSustituirFalta>
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
                checkIsLogin();
            });
    }

    useEffect(() => {
        if(isChecking==false){
            const { year, month, day } = convertDateToObjYearMonthDay(lunesCercano);
            navigate(`/faltas/${year}/${month}/${day}`, { replace: true })
    
            loadDataApi();
        }
    }, [isChecking,fechaBase]);

    return (
        <section className="hh-section-horario flex-auto flex flex-col justify-center">
            <div className="hm-title-container md:p-5 p-2">
                <h1 className='font-bold text-2xl text-blacklight'>Faltas</h1>
            </div>
            <WeekNavigation lunesCercano={lunesCercano} setFecha={setFechaBase}></WeekNavigation>

            {
                isLoad ? <Horario timeArray={allHours} mensajes={allElementsHour} showDayNumber={true} lunesCercano={lunesCercano}></Horario> : <Loading></Loading>
            }



        </section>
    )
}