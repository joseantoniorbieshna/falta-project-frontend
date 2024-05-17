import { useEffect, useState } from "react";
import { getAllHours } from "../service/TramoHorarioService";
import Loading from "./Utiles/Loading";
import Horario from "./Horario/Horario";
import WeekNavigation from "./Horario/WeekNavigation";
import { convertDateToObjYearMonthDay, convertDateToString, getActualDate, getLunesCercano } from "../utils/myDateFunctions";
import { getAllFaltasBetweenFechas } from "../service/FaltaService";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authenticationState";
import { processFaltas } from "../utils/faltaProcess";
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
                const processedFaltas = processFaltas(faltas, referenciaProfesorSesionActual);
                setAllElementHour(processedFaltas)
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