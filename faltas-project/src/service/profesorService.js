import { getTokenBearerInCookies } from "./AuthorizationService";

const URL_BACKEND_GRAPHQL = import.meta.env.VITE_BACKEND_END_POINT + "/graphql";
export const getAllProfesores = () => {
    return fetch(URL_BACKEND_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            query: `
        query profesores{
                profesores{
                  referencia,
                  nombre
                }
              }
        `
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.errors) {
                console.log(res.errors);
                throw new Error(res.errors[0].message);
            } else {
                const profesoresRaw = res.data.profesores;
                const profesoresDataList=profesoresRaw.map(profesor=>{
                    const referencia = profesor.referencia;
                    const nombre = profesor.nombre;
                    return {referencia,nombre}
                })
                return profesoresDataList;
            }
        });
};