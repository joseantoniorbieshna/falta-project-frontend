const URL_BACKEND_AUTH = import.meta.env.VITE_BACKEND_END_POINT + "/auth";
const URL_BACKEND_LOGIN = URL_BACKEND_AUTH+"/log-in";
export const getloginUserToken = (user,password) => {
    return fetch(URL_BACKEND_LOGIN, {
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

export const saveTokenInCookies=(token)=>{
    window.localStorage.setItem(
        'tokenBackend',token
    )
}