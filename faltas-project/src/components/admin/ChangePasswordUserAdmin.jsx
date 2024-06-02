import { useEffect, useState } from "react";
import Selector from "../Utiles/Selector";
import { getAllProfesoresWithUser, getAllProfesoresWithoutUser } from "../../service/profesorService";
import { changePasswordByRefProfesor, createUserApi } from "../../service/AuthorizationService";
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Utiles/Loading";
import { useAuth } from "../../context/authenticationState";
import InputPassword from "../Utiles/InputPassword";

export default function ChangePasswordUserAdmin() {
    const [isInRequest, setIsInRequest] = useState(false)
    const [profesorSelected, SetProfesorSelected] = useState(null);
    const [profesores, setProfesores] = useState([]);
    const messageSearch = "Introduce el nombre un profesor"
    const selectMessage = "Selecciona un profesor"
    const [password, setPassword] = useState("");
    const [passwordRepetirField, setPasswordRepetirField] = useState("");
    const {isChecking,checkIsLogin} = useAuth()


    const crearUsuario = (event) => {
        event.preventDefault();

        if(password!=passwordRepetirField){
            toast.error("Las contraseñas tienen que ser iguales", {
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

        if (profesorSelected != null) {
            setIsInRequest(true)
            changePasswordByRefProfesor(profesorSelected.referencia,password)
                .then((res) => {
                    toast.success("Contraseña cambiada con exito.", {
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
                    SetProfesorSelected(null)
                    setIsInRequest(false)
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
        } else {
            toast.error("Selecciona un profesor", {
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
        }


    }

    useEffect(() => {
        if(isChecking==false){

            getAllProfesoresWithUser()
            .then((profesoresList) => {
                setProfesores(profesoresList)
            })
            .catch((err) => {
                console.log(err);
                checkIsLogin()
            });
            
        }
    }, [isChecking])

    return (
        <div className="flex flex-col md:items-baseline items-center gap-1 md:px-5 p-2">
            <h1 className='font-bold text-2xl text-blacklight'>Cambiar Contraseña</h1>
            <form className="flex flex-col items-center md:items-start">
                <div className="flex flex-row gap-3 mb-3 flex-wrap justify-center md:justify-start ">
                    <div className="flex justify-center flex-wrap gap-2">
                        <InputPassword placeholder="Contraseña" password={password} setPassword={setPassword}></InputPassword>
                        <InputPassword placeholder="Repetir contraseña" password={passwordRepetirField} setPassword={setPasswordRepetirField}></InputPassword>
                    </div>
                </div>
                <Selector messageSearch={messageSearch} selectMessage={selectMessage} itemsInput={profesores} changeItemSelected={SetProfesorSelected} itemSelected={profesorSelected} flotante={false}></Selector>
                <button className=" my-3 p-2 rounded-lg bg-green" onClick={(event)=>crearUsuario(event)}>Cambiar contraseña</button>

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