
const URL_BACKEND_GRAPHQL = import.meta.env.VITE_BACKEND_END_POINT + "/graphql";
export const getHorarioByProfesor=({referenciaProfesor})=>{
    return fetch(URL_BACKEND_GRAPHQL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
    query GetHorasHorarioByReferenciaProfesor($referenciaProfesor: String!) {
        getHorasHorarioByReferenciaProfesor(referenciaProfesor: $referenciaProfesor) {
          sesion {
            referencia
            materia{
              nombreCompleto
            }
            grupos{
              nombre
              curso{
                nombre
              }
            }
          }
          tramoHorario {
            dia
            indice
          }
        }
      }
      `,
    variables: {
        referenciaProfesor,
    },
  }),
})
  .then((res) => res.json())
  .then((result) =>{
    let horasHorario = result.data.getHorasHorarioByReferenciaProfesor
    horasHorario = horasHorario.map((horaHorario,index)=>{
      const dia = horaHorario.tramoHorario.dia
      const indice = horaHorario.tramoHorario.indice
      const materia = horaHorario.sesion.materia.nombreCompleto
      const grupos = horaHorario.sesion.grupos
      const curso = horaHorario.sesion.grupos[0].curso.nombre
      const referenciaSesion = horaHorario.sesion.referencia
      return {dia,indice,materia,grupos,curso,referenciaSesion}
    })
    return horasHorario;
  })
}