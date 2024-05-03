const URL_BACKEND_GRAPHQL = import.meta.env.VITE_BACKEND_END_POINT + "/graphql";

export const createFalta = ({ faltaCreateInput }) => {
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
        faltaCreateInput,
      },
    }),
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if (res.errors) {
      throw new Error(res.errors[0].message);
    } else {
      return res.data.createFalta;
    }
  });
};



export const getAllFaltasBetweenFechas = ({ fechaInicio,fechaFin }) => {
  console.log(fechaInicio,fechaFin);
  return fetch(URL_BACKEND_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
                nombre
              }
            }
          },
          comentario,
          fecha
        }
      }
      `,
      variables: {
        fechaInicio,
        fechaFin
      },
    }),
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
        const fecha = dataObject.fecha;
        const referenciaSesion = dataObject.horaHorario.sesion.referencia
        const dia = dataObject.horaHorario.tramoHorario.dia
        const indice = dataObject.horaHorario.tramoHorario.indice
        const nombreProfesor = dataObject.horaHorario.sesion.profesor.nombre

        const materia = dataObject.horaHorario.sesion.materia.nombreCompleto
        const grupos = dataObject.horaHorario.sesion.grupos
        const curso = dataObject.horaHorario.sesion.grupos[0].curso.nombre
        return {comentario,fecha,referenciaSesion,dia,indice,materia,grupos,curso,nombreProfesor}
      })
    }
  });
};