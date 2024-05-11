import { getTokenBearerInCookies } from "./AuthorizationService";

const URL_BACKEND_GENERAL = import.meta.env.VITE_BACKEND_END_POINT + "/general";
const URL_BACKEND_XML_ALL = URL_BACKEND_GENERAL+"/all";
export const sendXMLFileToPopulateDatabase = (archivo) => {
    const formData = new FormData();
    formData.append('xml', archivo);

    return fetch(URL_BACKEND_XML_ALL, {
        method: 'POST',
        headers: {
            'Authorization': getTokenBearerInCookies()
        },
        body:formData
    })
    .then((res) =>{
        if (!res.ok) {
            throw new Error('Error al enviar el archivo',{cause:{status:res.status}});
          }
          return res.text()
    })
};