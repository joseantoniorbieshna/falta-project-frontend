import { useEffect, useState } from "react"
import { getloginUserToken, saveTokenInCookies } from "../service/AuthorizationService";
import { Navigate, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/authenticationState";
import { reload } from "ionicons/icons";
import InputPassword from "./Utiles/InputPassword";

export default function Login() {
    const { isAdmin, isLoggedIn, isChecking, checkIsLogin, logout } = useAuth();
    const [isProvedLogged, setIsProvedLogged] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        checkIsLogin()
        setIsProvedLogged(true) // aqui se pone a true sin terminar la peticion

    }, [])

    const handleLogin = (event) => {
        event.preventDefault();

        getloginUserToken(username, password)
            .then(res => {
                console.log(res);
                console.log("isAdmin:" + isAdmin);
                saveTokenInCookies(res)
                checkIsLogin();
            })
            .catch(err => {
                console.log(err);
                logout()
                let messageError = ""
                if (err.cause && err.cause.status == 401) {
                    messageError = "Usuario o contraseña no valido";
                } else {
                    messageError = "Hubo un error al intentar iniciar sesion";
                }
                toast.error(messageError, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            })

    }
    return (
        <div className="flex-auto justify-center bg-white">
            <div className="p-10 py-15 rounded-lg bg-white h-full flex flex-col items-center justify-center gap-5">
                <h1 className="text-4xl font-bold">FaltaTracker</h1>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-2xl text-center">Inicia Sesión</h2>
                    <p className="text-md text-center">Sustituye y pon faltas de manera sencilla</p>
                </div>
               
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <div className="flex flex-col justify-center ">
                        <input id="username" name="username" className="px-2 py-1 border-2 border-black rounded-[10px]" style={!username?{borderColor:"red"}:{}} type="text" value={username} placeholder="Usuario" onChange={({ target }) => { setUsername(target.value) }}></input>
                    </div>
                    <div className="flex flex-col justify-center ">
                        <InputPassword style={!password?{borderColor:"red"}:{}} placeholder="Contraseña" password={password} setPassword={setPassword}></InputPassword>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button className="p-3 w-full px-4 rounded-[10px] font-bold bg-green text-black">Iniciar Sesión</button>
                    </div>
                </form>
                <div className="text-center"><span className="font-bold">¿no tienes cuenta?</span> ponte en contacto con un admin</div>


            </div>
            {
                isProvedLogged && isAdmin && isLoggedIn && !isChecking && <Navigate to={"/admin"}></Navigate>
            }
            {
                isProvedLogged && !isAdmin && isLoggedIn && !isChecking && <Navigate to={"/horario"}></Navigate>
            }

        </div>
    )
}