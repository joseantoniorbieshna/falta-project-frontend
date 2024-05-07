import { useState } from "react"
import { getloginUserToken, saveTokenInCookies } from "../service/AuthorizationService";
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = (event)=> {
        event.preventDefault();

        getloginUserToken(username,password)
        .then(res=>{
            console.log(res);
            saveTokenInCookies(res)
            navigate('/horario');
        })
        .catch(err=>{
            let messageError=""
            if(err.cause && err.cause.status==401){
                messageError="Usuario o contraseña no valido";
            }else{
                messageError="Hubo un error al intentar iniciar sesion";
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
    <div className="flex-auto flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold">LOGIN</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <div className="flex justify-center border-2 rounded-md">
                <input id="username" name="username" className="px-2" type="text" value={username} placeholder="Usuario" onChange={({target})=>{setUsername(target.value)}}></input>
            </div>
            <div className="flex justify-center border-2 rounded-md ">
                <input className="px-2" type="password" id="pass" name="password" value={password} placeholder="contraseña" onChange={({target})=>{setPassword(target.value)}}></input>
            </div>
            <div className="flex justify-center">
                <button className="border-2 px-2 rounded-md">Iniciar sesion</button>
            </div>
        </form>
    </div>
    )
}