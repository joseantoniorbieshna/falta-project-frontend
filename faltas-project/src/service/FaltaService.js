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
