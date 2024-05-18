import { getTokenBearerInCookies } from "./AuthorizationService";

const URL_BACKEND_GRAPHQL = import.meta.env.VITE_BACKEND_END_POINT + "/graphql";

export const createFalta = (faltaCreateInput) => {
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenBearerInCookies()
    },
    body: JSON.stringify({
      query: `
        mutation CreateFalta($faltaCreateInput: FaltaCreateInputDTO!) {
          createFalta(faltaCreateInput: $faltaCreateInput) {
            horaHorario {
              sesion {
                referencia
              }
            }
          }
        }
      `,
      variables: {
        faltaCreateInput: faltaCreateInput,
      },
    }),
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.errors) {
      throw new Error(res.errors[0].message);
    } else {
      return res.data.createFalta;
    }
  });
};




export const editarFaltaApi = (faltaUpdateInput) => {
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenBearerInCookies()
    },
    body: JSON.stringify({
      query: `
      mutation UpdateFalta($faltaUpdateInput: FaltaUpdateInputDTO!) {
        updateFalta(faltaUpdateInput: $faltaUpdateInput) {
          horaHorario {
            sesion {
              referencia
            }
          }
        }
      }
      `,
      variables: {
        faltaUpdateInput: faltaUpdateInput,
      },
    }),
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if (res.errors) {
      console.log(res.errors);
      throw new Error(res.errors[0].message);
    } else {
      console.log(res.data.updateFalta);
      return res.data.updateFalta;
    }
  });
};

export const deleteFaltaApi = (faltaDeleteInput) => {
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenBearerInCookies()
    },
    body: JSON.stringify({
      query: `
      mutation deleteFalta($faltaDeleteInput: IdFaltaDTO!) {
        deleteFalta(faltaDeleteInput: $faltaDeleteInput) 
      }
      `,
      variables: {
        faltaDeleteInput: faltaDeleteInput,
      },
    }),
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if (res.errors) {
      console.log(res.errors);
      throw new Error(res.errors[0].message);
    } else {
      console.log(res.data);
      return res.data;
    }
  });
};


export const sustituirFaltaApi = (faltaSustituirInput) => {
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenBearerInCookies()
    },
    body: JSON.stringify({
      query: `
      mutation sustituirFalta($faltaSustituirInput: IdFaltaDTO!) {
        sustituirFalta(faltaSustituirInput: $faltaSustituirInput) {
          profesorSustituto{
            referencia
          }
        }
      }
      `,
      variables: {
        faltaSustituirInput: faltaSustituirInput,
      },
    }),
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if (res.errors) {
      console.log(res.errors);
      throw new Error(res.errors[0].message);
    } else {
      console.log(res.data);
      return res.data;
    }
  });
};

export const cancelarFaltaApi = (faltaCancelarInput) => {
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenBearerInCookies()
    },
    body: JSON.stringify({
      query: `
      mutation cancelarFalta($faltaCancelarInput: IdFaltaDTO!) {
        cancelarFalta(faltaCancelarInput: $faltaCancelarInput) {
          horaHorario {
            sesion {
              referencia
            }
          }
        }
      }
      `,
      variables: {
        faltaCancelarInput: faltaCancelarInput,
      },
    }),
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if (res.errors) {
      console.log(res.errors);
      throw new Error(res.errors[0].message);
    } else {
      console.log(res.data);
      return res.data;
    }
  });
};

export const getAllFaltasBetweenFechas = ({ fechaInicio,fechaFin }) => {
  console.log(fechaInicio,fechaFin);
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenBearerInCookies()
    },
    body: JSON.stringify({
      query: `
      query GetFaltas($fechaInicio: LocalDate!, $fechaFin: LocalDate!) {
        getAllFaltaBetweenFechas(fechaInicio: $fechaInicio, fechaFin: $fechaFin) {
          horaHorario{
            tramoHorario{
              dia,
              indice
            },
            sesion{
              referencia
              materia{
                nombreCompleto
              },
              grupos{
                nombre,
                curso{
                  nombre
                }
              }
              profesor{
                nombre,
                referencia
              }
            }
          },
          comentario,
          fecha,
          profesorSustituto{
            nombre,
            referencia
          }
        }
      }
      `,
      variables: {
        fechaInicio,
        fechaFin
      },
    }),
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.errors) {
      throw new Error(res.errors[0].message);
    } else {
      const dataList = res.data.getAllFaltaBetweenFechas;
      console.log(dataList);
      return dataList.map((dataObject,index)=>{
        const comentario = dataObject.comentario;
        const fecha = new Date(dataObject.fecha);
        const referenciaSesion = dataObject.horaHorario.sesion.referencia
        const dia = dataObject.horaHorario.tramoHorario.dia
        const indice = dataObject.horaHorario.tramoHorario.indice
        const nombreProfesor = dataObject.horaHorario.sesion.profesor.nombre
        const referenciaProfesor = dataObject.horaHorario.sesion.profesor.referencia

        const materia = dataObject.horaHorario.sesion.materia.nombreCompleto
        const grupos = dataObject.horaHorario.sesion.grupos
        const curso = dataObject.horaHorario.sesion.grupos[0].curso.nombre
        const profesorSustituto = dataObject.profesorSustituto
        let nombreProfesorSustituto=null
        let referenciaProfesorSustituto=null
        if(profesorSustituto){
          nombreProfesorSustituto = profesorSustituto.nombre
          referenciaProfesorSustituto = profesorSustituto.referencia
        }
        return {comentario,fecha,referenciaSesion,dia,indice,materia,grupos,curso,nombreProfesor,referenciaProfesor,nombreProfesorSustituto,referenciaProfesorSustituto}
      })
    }
  });
};




export const getFaltasByDiaAndIndice = (dia,indice) => {
  console.log("diae:"+dia+"indicee:"+indice);
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenBearerInCookies()
    },
    body: JSON.stringify({
      query: `
      query FaltasByDiaAndIndice($dia: Int!, $indice: Int!) {
        faltasByDiaAndIndice(dia: $dia, indice: $indice) {
          horaHorario{
            tramoHorario{
              dia,
              indice
            },
            sesion{
              referencia
              materia{
                nombreCompleto
              },
              grupos{
                nombre,
                curso{
                  nombre
                }
              }
              profesor{
                nombre,
                referencia
              }
            }
          },
          comentario,
          fecha,
          profesorSustituto{
            nombre,
            referencia
          }
        }
      }
      `,
      variables: {
        dia:dia,
        indice:indice
      },
    }),
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then(res=>{
    if(!res.ok){
      throw new Error("Error al hacer la petición al servidor");
    }
    return res
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);

    if (res.errors) {
      throw new Error(res.errors[0].message);
    } else {
      const dataList = res.data.faltasByDiaAndIndice;
      return dataList.map((dataObject,index)=>{
        const comentario = dataObject.comentario;
        const fecha = new Date(dataObject.fecha);
        const referenciaSesion = dataObject.horaHorario.sesion.referencia
        const dia = dataObject.horaHorario.tramoHorario.dia
        const indice = dataObject.horaHorario.tramoHorario.indice
        const nombreProfesor = dataObject.horaHorario.sesion.profesor.nombre
        const referenciaProfesor = dataObject.horaHorario.sesion.profesor.referencia

        const materia = dataObject.horaHorario.sesion.materia.nombreCompleto
        const grupos = dataObject.horaHorario.sesion.grupos
        const curso = dataObject.horaHorario.sesion.grupos[0].curso.nombre
        const profesorSustituto = dataObject.profesorSustituto
        let nombreProfesorSustituto=null
        let referenciaProfesorSustituto=null
        if(profesorSustituto){
          nombreProfesorSustituto = profesorSustituto.nombre
          referenciaProfesorSustituto = profesorSustituto.referencia
        }
        return {comentario,fecha,referenciaSesion,dia,indice,materia,grupos,curso,nombreProfesor,referenciaProfesor,nombreProfesorSustituto,referenciaProfesorSustituto}
      })
    }
  });
};