const URL_BACKEND_AUTH = import.meta.env.VITE_BACKEND_END_POINT + "/auth";
const URL_BACKEND_AUTH_LOGIN = URL_BACKEND_AUTH + "/log-in";
const URL_BACKEND_AUTH_SIGNUP = URL_BACKEND_AUTH + "/sign-up";
const URL_BACKEND_AUTH_INFO = URL_BACKEND_AUTH + "/info";
const URL_BACKEND_CHANGE_PASSWORD_BY_USER = URL_BACKEND_AUTH +"/change-password-by-user";
const URL_BACKEND_CHANGE_PASSWORD_BY_REF_PROF = URL_BACKEND_AUTH +"/change-password-by-ref-prof";
const URL_BACKEND_FIND_USERNAME_BY_REF_PROFESOR = URL_BACKEND_AUTH +"/user-by-ref-profesor"
export const getloginUserToken = (user, password) => {
    console.log(URL_BACKEND_AUTH_LOGIN);
    return fetch(URL_BACKEND_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user,
            password: password
        })
    })
        .then((res) => {
            console.log(res);
            if (!res.ok) {
                throw new Error('Error al iniciar', { cause: { status: res.status } });
            }
            return res.json();
        })
        .then((res) => {
            return res.jwt
        })
};

export const createUserApi = async (username, password, referenciaProfesor) => {
    return await fetch(URL_BACKEND_AUTH_SIGNUP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            username: username,
            password: password,
            referenciaProfesor: referenciaProfesor
        })
    })
    .then(response => {
        if (response.status!=201) {
            return response.json().then(res => {
                let errorMessage = res.message || "No se ha podido crear el usuario";
                throw new Error(errorMessage, { cause: { status: response.status } });
            });
        }
        return response.json();
    })
};

export const changePasswordByUser = async (username, actualPassword, passwordToChange) => {
    return await fetch(URL_BACKEND_CHANGE_PASSWORD_BY_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            username: username,
            actualPassword: actualPassword,
            passwordToChange: passwordToChange
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(res => {
                console.log(res);
                let errorMessage = res.message || "No se ha podido cambiar la contraseña.";
                throw new Error(errorMessage, { cause: { status: response.status } });
            });
        }
        return response.text();
    })
};

export const changePasswordByRefProfesor = async (referenciaProfesor, password) => {
    return await fetch(URL_BACKEND_CHANGE_PASSWORD_BY_REF_PROF, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        },
        body: JSON.stringify({
            referenciaProfesor: referenciaProfesor,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(res => {
                console.log(res);
                let errorMessage = res.message || "No se ha podido cambiar la contraseña.";
                throw new Error(errorMessage, { cause: { status: response.status } });
            });
        }
        return response.text();
    })
};
export const findUsernameByReferenciaProfesor = async (referenciaProfesor,) => {
    return await fetch(`${URL_BACKEND_FIND_USERNAME_BY_REF_PROFESOR}?referenciaProfesor=${referenciaProfesor}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenBearerInCookies()
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(res => {
                console.log(res);
                let errorMessage = res.message || "No se ha podido encontrar el usuario.";
                throw new Error(errorMessage, { cause: { status: response.status } });
            });
        }
        return response.text();
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
        .then((res) => {
            if (!res.ok) {
                throw new Error('Error al iniciar', { cause: { status: res.status } });
            }
            return res.json();
        })
        .then((res) => {
            const username = res.username
            const role = res.role
            const nombre = res.nombre
            const referenciaProfesor = res.referenciaProfesor
            return { username, role, referenciaProfesor,nombre }
        })
};

export const saveTokenInCookies = (token) => {
    window.localStorage.setItem(
        'tokenBackend', token
    )
}

export const deleteTokenInCookies = () => {
    window.localStorage.setItem(
        'tokenBackend', null
    )
}

export const getTokenBearerInCookies = () => {
    return `Bearer ${window.localStorage.getItem('tokenBackend')}`
}

