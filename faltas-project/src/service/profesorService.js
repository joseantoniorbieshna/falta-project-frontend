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


export const getAllProfesoresWithoutUser = () => {
    return fetch(URL_BACKEND_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            query: `
        query profesoresWithoutRegistrationUser{
            profesoresWithoutRegistrationUser{
                  referencia,
                  nombre
                }
              }
        `
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors) {
                console.log(res.errors);
                throw new Error(res.errors[0].message);
            } else {
                const profesoresRaw = res.data.profesoresWithoutRegistrationUser;
                const profesoresDataList=profesoresRaw.map(profesor=>{
                    const referencia = profesor.referencia;
                    const nombre = profesor.nombre;
                    return {referencia,nombre}
                })
                return profesoresDataList;
            }
        });
};

export const getAllProfesoresWithUser = () => {
    return fetch(URL_BACKEND_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            query: `
        query profesoresWithRegistrationUser{
            profesoresWithRegistrationUser{
                  referencia,
                  nombre
                }
              }
        `
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors) {
                console.log(res.errors);
                throw new Error(res.errors[0].message);
            } else {
                const profesoresRaw = res.data.profesoresWithRegistrationUser;
                const profesoresDataList=profesoresRaw.map(profesor=>{
                    const referencia = profesor.referencia;
                    const nombre = profesor.nombre;
                    return {referencia,nombre}
                })
                return profesoresDataList;
            }
        });
};