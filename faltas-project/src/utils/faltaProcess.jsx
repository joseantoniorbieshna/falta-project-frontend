import ContainerInfoGrupoYCurso from "../components/ContainerInfoGrupoYCurso";
import PopUpCancelarFalta from "../components/PopUps/PopUpCancelarFalta";
import PopUpSustituirFalta from "../components/PopUps/PopUpSustituirFalta";
import PopUpEditarEliminarFalta from "../components/PopUps/PopUpEditarEliminarFalta";
import MensajeHorario from "../components/MensajeHora";
import React from "react";

export const processFaltas = (faltas, referenciaProfesorSesionActual,infoWithDayAndIndice=false) => {
    return faltas.map((horaHorarioDTO, index) => {
        const { comentario, fecha, referenciaSesion, dia, indice, materia, grupos, curso, nombreProfesor, referenciaProfesor, nombreProfesorSustituto, referenciaProfesorSustituto } = horaHorarioDTO
        
        let containerInfoGrupoYCurso = null
        if(infoWithDayAndIndice){
            containerInfoGrupoYCurso= <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso} profesor={nombreProfesor} profesorSustituto={nombreProfesorSustituto} gap={1} dia={dia} indice={indice}></ContainerInfoGrupoYCurso>
        }else{
            containerInfoGrupoYCurso= <ContainerInfoGrupoYCurso key={index} grupos={grupos} curso={curso} profesor={nombreProfesor} profesorSustituto={nombreProfesorSustituto} gap={1}></ContainerInfoGrupoYCurso>
        }
        
        const containerInfoGrupoYCursoConGapInPopUp = React.cloneElement(containerInfoGrupoYCurso, {
            dia:null,
            indice:null,
            gap: 1 
          });
        let poUp = null

        /* COLOR Y ACCION*/
        let color = "#d3d3d3"; // COLOR POR DEFECTO (GRIS)
        console.log(referenciaProfesor);
        console.log(referenciaProfesorSustituto + " - " + referenciaProfesorSesionActual);
        if (referenciaProfesorSesionActual == referenciaProfesor) { // Es mi falta
            console.log("falta mia");
            color = "#9cd6ff" // COLOR ES MI FALTA (AZUL) 
            poUp = <PopUpEditarEliminarFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCursoConGapInPopUp} comentarioInput={comentario} fechaInput={fecha}></PopUpEditarEliminarFalta>
        } else if (referenciaProfesorSustituto != null && referenciaProfesorSustituto == referenciaProfesorSesionActual) { // La estoy sustituyendo
            color = "#dff2cd"
            poUp = <PopUpCancelarFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} fechaInput={fecha} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCursoConGapInPopUp} comentario={comentario}></PopUpCancelarFalta>
        } else if (referenciaProfesorSustituto != null && referenciaProfesorSustituto != referenciaProfesorSesionActual) { // La sustituye otra persona
            color = "#ff9c9c"
            poUp = null // quizas poder ver ?? 
        } else { // default
            poUp = <PopUpSustituirFalta dia={dia} indice={indice} referenciaSesion={referenciaSesion} fechaInput={fecha} materia={materia} containerInfoGrupoYCurso={containerInfoGrupoYCursoConGapInPopUp} comentario={comentario}></PopUpSustituirFalta>
        }
        console.log(fecha);
        return <MensajeHorario backgroundColor={color} key={index} dia={dia} indice={indice} fecha={fecha} referenciaSesion={referenciaSesion} mensaje={materia} containerInfoGrupoYCurso={containerInfoGrupoYCurso} PopUpComponent={poUp}></MensajeHorario>
    });
};