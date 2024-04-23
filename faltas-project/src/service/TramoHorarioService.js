
const URL_BACKEND_GRAPHQL = import.meta.env.VITE_BACKEND_END_POINT + "/graphql";
export const getAllHours=()=>{
    return fetch(URL_BACKEND_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
            tramosHorarios {
              horaEntrada
              horaSalida
            }
          }
          `,
        variables: {
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => result.data.tramosHorarios)
      .then(tramosHorarios => tramosHorarios.flatMap(tramo => [tramo.horaEntrada, tramo.horaSalida]))
      .then(horas => [...new Set(horas)])
    };