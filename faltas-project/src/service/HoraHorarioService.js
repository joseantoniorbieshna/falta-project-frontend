
export const getHorarioByProfesor=()=>{
    fetch('http://localhost:8080/graphql', {
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
            profesor {
              nombre
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
        referenciaProfesor: "100041110",
    },
  }),
})
  .then((res) => res.json())
  .then((result) => console.log(result))
}