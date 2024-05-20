import React, { useRef, useState } from 'react';
import './css/HorarioMain.css'
import Horario from './Horario/Horario';
import useMobile from '../hooks/useMobile';
import { useEffect } from 'react';
import { getAllHours } from '../service/TramoHorarioService';
import { getHorarioByProfesor } from '../service/HoraHorarioService';
import WeekNavigation from './Horario/WeekNavigation';
import Loading from './Utiles/Loading';
import MensajeHorario from './MensajeHora';
import ContainerInfoGrupoYCurso from './ContainerInfoGrupoYCurso';
import { getActualDate, getLunesCercano } from '../utils/myDateFunctions';
import PopUpCreateFaltaHorario from './PopUps/PopUpCreateFaltaHorario';
import { useAuth } from '../context/authenticationState';
import { getAllGuardiasByProfesorAPi } from '../service/GuardiaService';
import Guardiahora from './MensajeGuardiaHora';
import MensajeGuardiahora from './MensajeGuardiaHora';
import ChangeUserDropdownAdmin from "./admin/ChangeUserDropdownAdmin";


export function HorarioMain() {
    const { isChecking, checkIsLogin, referenciaProfesor, isAdmin } = useAuth();
    const [isLoad, setLoad] = useState(false)
    const [allHours, setAllHours] = useState(null);
    const [allElementsHour, setAllElementHour] = useState(null);
    const [isMobile] = useMobile();
    const lunesCercano = getLunesCercano(getActualDate());
    /* FETCH DATA */

    const loadData = () => {
        setLoad(false)
        Promise.all([
            getAllHours(),
            getHorarioByProfesor(referenciaProfesor),
            getAllGuardiasByProfesorAPi(referenciaProfesor)
        ])
            .then(([timeHorario, horasHorario, guardias]) => {
                setAllHours(timeHorario);
                horasHorario = horasHorario.map((horaHorarioDTO, index) => {
                    const { dia, indice, materia, grupos, curso, referenciaSesion } = horaHorarioDTO
                    const containerInfoGrupoYCurso = <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso}></ContainerInfoGrupoYCurso>
                    const containerInfoGrupoYCursoConGap = React.cloneElement(containerInfoGrupoYCurso, {
                        gap: 1
                    });
                    const poUp = <PopUpCreateFaltaHorario key={index} dia={dia} indice={indice} referenciaSesion={referenciaSesion} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCursoConGap}></PopUpCreateFaltaHorario>

                    return <MensajeHorario key={index} dia={dia} indice={indice} referenciaSesion={referenciaSesion} mensaje={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} PopUpComponent={poUp}></MensajeHorario>
                })
                guardias = guardias.map((guardia, index) => {
                    const { dia, indice } = guardia
                    return <MensajeGuardiahora key={indice} dia={dia} indice={indice}></MensajeGuardiahora>
                })
                const allMessage = [...horasHorario, ...guardias]
                setAllElementHour(allMessage)
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
        if (referenciaProfesor != null && isChecking == false) {
            loadData()
        }
    }, [referenciaProfesor, isChecking]);
    return (
        <section className="hh-section-horario flex-1 flex flex-col justify-center">
            <div className="hm-title-container md:p-5 p-2">
                <h1 className='font-bold text-2xl text-blacklight'>Horario Profesor/ra</h1>
            </div>

            <div className='flex flex-col md:items-start items-center pb-3'>
            {
                isAdmin &&
                <div className='pl-2'>
                    <ChangeUserDropdownAdmin></ChangeUserDropdownAdmin>
                </div>
            }
            </div>
            {
                isLoad ? <Horario timeArray={allHours} mensajes={allElementsHour} showDayNumber={false} lunesCercano={lunesCercano} hasActionInAllDay={true}></Horario> : <Loading></Loading>
            }

        </section>
    );
}
