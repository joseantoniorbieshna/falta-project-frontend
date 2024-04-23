export const getAllHours=()=>{
    fetch('http://localhost:8080/graphql', {
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