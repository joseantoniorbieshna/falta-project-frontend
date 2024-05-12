const URL_BACKEND_AUTH = import.meta.env.VITE_BACKEND_END_POINT + "/auth";
const URL_BACKEND_AUTH_LOGIN = URL_BACKEND_AUTH+"/log-in";
const URL_BACKEND_AUTH_SIGNUP = URL_BACKEND_AUTH+"/sign-up";
const URL_BACKEND_AUTH_INFO = URL_BACKEND_AUTH+"/info";
export const getloginUserToken = (user,password) => {
    return fetch(URL_BACKEND_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: password
        })
    })
    .then((res) =>{
        if (!res.ok) {
            throw new Error('Error al iniciar',{cause:{status:res.status}});
          }
          return res.json();
    })
    .then((res)=>{
       return res.jwt
    })
};

export const createUserApi = (username,password,referenciaProfesor) => {
    console.log("u:"+username+" p:"+password+" ref:"+referenciaProfesor);
    return fetch(URL_BACKEND_AUTH_SIGNUP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            username: username,
            password: password,
            referenciaProfesor:referenciaProfesor
        })
    })
    .then((res) =>{
        if (!res.ok) {
            throw new Error('Error al crear usuario: ',{cause:{status:res.status}});
        }
        return res.json();
    })
};

export const getInfoUserAuthentication = () => {
    return fetch(URL_BACKEND_AUTH_INFO, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        }
    })
    .then((res) =>{
        if (!res.ok) {
            throw new Error('Error al iniciar',{cause:{status:res.status}});
          }
          return res.json();
    })
    .then((res)=>{
        const username = res.username
        const role = res.role
        const referenciaProfesor = res.referenciaProfesor
       return {username,role,referenciaProfesor}
    })
};

export const saveTokenInCookies=(token)=>{
    window.localStorage.setItem(
        'tokenBackend',token
    )
}

export const deleteTokenInCookies=()=>{
    window.localStorage.setItem(
        'tokenBackend',null
    )
}

export const getTokenBearerInCookies=()=>{
    return `Bearer ${window.localStorage.getItem('tokenBackend')}`
}

