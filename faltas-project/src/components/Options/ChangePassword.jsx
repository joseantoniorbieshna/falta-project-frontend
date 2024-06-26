import { useEffect, useState } from "react";
import Selector from "../Utiles/Selector";
import { getAllProfesoresWithoutUser } from "../../service/profesorService";
import { changePasswordByUser, createUserApi } from "../../service/AuthorizationService";
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Utiles/Loading";
import { useAuth } from "../../context/authenticationState";
import InputPassword from "../Utiles/InputPassword";

export default function ChangePassword() {
    const {username}=useAuth();
    const [isInRequest, setIsInRequest] = useState(false)
    const [passwordActual, setPasswordActual] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepetirField, setPasswordRepetirField] = useState("");
    const { isChecking, checkIsLogin } = useAuth()


    const changePassword = (event) => {
        event.preventDefault();

        if (password != passwordRepetirField) {
            toast.error("Las contraseña a la que quieres cambiar tienen que ser igual en el campo repetir", {
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
            return
        }

        setIsInRequest(true)
        changePasswordByUser(username, passwordActual, password)
            .then((res) => {
                console.log("cambiado bien");
                toast.success("Contraseña cambiada con exito ", {
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
                checkIsLogin()
            })
            .catch(err => {
                setIsInRequest(false)
                toast.error(err.message, {
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
                checkIsLogin()
            });


    }

    useEffect(() => {
    }, [isChecking])

    return (
        <div className="flex w-full flex-col gap-1 md:px-5 p-2 items-center">
            <h1 className='font-bold text-2xl text-blacklight text-center'>Cambiar contraseña</h1>
            <form className="flex flex-col items-center">
                <div className="flex flex-row gap-3 mb-3 flex-wrap justify-center md:justify-start ">
                    <div className="flex flex-col justify-center flex-wrap gap-2">
                        <InputPassword placeholder="contraseña actual" password={passwordActual} setPassword={setPasswordActual}></InputPassword>
                        <InputPassword placeholder="Contraseña nueva" password={password} setPassword={setPassword}></InputPassword>
                        <InputPassword placeholder="Repetir contraseña nueva" password={passwordRepetirField} setPassword={setPasswordRepetirField}></InputPassword>
                    </div>
                </div>
                <button className=" p-2 rounded-lg bg-green" onClick={(event) => changePassword(event)}>Cambiar Contraseña</button>

            </form>
            {
                isInRequest &&
                <div >
                    <Loading />
                </div>
            }
        </div>
    )
}