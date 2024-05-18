import { getTokenBearerInCookies } from "./AuthorizationService";

const URL_BACKEND_GRAPHQL = import.meta.env.VITE_BACKEND_END_POINT + "/graphql";
export const getAllGuardiasByProfesorAPi = (referenciaProfesor) => {
    return fetch(URL_BACKEND_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            query: `
                query($referenciaProfesor: String!) {
                    gaurdiasByProfesor(referenciaProfesor: $referenciaProfesor) {
                        tramoHorario {
                            dia,
                            indice
                        }
                    }
                }
            `,
            variables: {
                referenciaProfesor: referenciaProfesor
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
                console.log(res.data);
                const dataList = res.data.gaurdiasByProfesor;
                return dataList.map((dataObject, index) => {
                    const { dia, indice } = dataObject.tramoHorario;
                    return { dia, indice };
                });
            }
        });
};


export const getAllGuardiaProfesorByDiaAndIndice = (dia,indice) => {
    return fetch(URL_BACKEND_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            query: `
                query($tramoHorario: IdTramoHorario!) {
                    guardiasByDiaAndIndice(tramoHorario: $tramoHorario) {
                            profesor{
                              nombre
                            }
                    }
                }
            `,
            variables: {
                tramoHorario: {dia:dia,indice:indice}
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
                const dataList = res.data.guardiasByDiaAndIndice;
                return dataList.map((dataObject, index) => {
                    const {nombre} = dataObject.profesor;
                    console.log(nombre);
                    return { nombre };
                });
            }
        });
};