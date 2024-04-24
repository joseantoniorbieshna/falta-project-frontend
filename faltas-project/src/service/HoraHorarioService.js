
const URL_BACKEND_GRAPHQL = import.meta.env.VITE_BACKEND_END_POINT + "/graphql";
export const getHorarioByProfesor=({referenciaProfesor})=>{
    return fetch(URL_BACKEND_GRAPHQL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
    mutation GetHorasHorarioByReferenciaProfesor($referenciaProfesor: String!) {
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
  .then((result) => result.data.getHorasHorarioByReferenciaProfesor)
}