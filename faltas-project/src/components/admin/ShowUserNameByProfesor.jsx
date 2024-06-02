import { useEffect, useState } from "react";
import Selector from "../Utiles/Selector";
import { getAllProfesoresWithUser, getAllProfesoresWithoutUser } from "../../service/profesorService";
import { changePasswordByRefProfesor, createUserApi, findUsernameByReferenciaProfesor } from "../../service/AuthorizationService";
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Utiles/Loading";
import { useAuth } from "../../context/authenticationState";

export default function ShowUserNameByProfesor() {
    const [isInRequest, setIsInRequest] = useState(false)
    const [profesorSelected, SetProfesorSelected] = useState(null);
    const [usernameShow,setUsernameShow] = useState(null);
    const [profesores, setProfesores] = useState([]);
    const messageSearch = "Introduce el nombre un profesor"
    const selectMessage = "Selecciona un profesor"
    const {isChecking,checkIsLogin} = useAuth()


    const mostrarUsername = (event) => {


        if (profesorSelected != null) {
            setUsernameShow(null);
            setIsInRequest(true)
            findUsernameByReferenciaProfesor(profesorSelected.referencia)
                .then((res) => {
                    toast.success("Usuario encontrado con exito.", {
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
                    setUsernameShow(res)
                    setIsInRequest(false)
                    checkIsLogin()
                })
                .catch(err => {
                    setIsInRequest(false)
                    SetProfesorSelected(null)
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

    useEffect(()=>{
        if(profesorSelected!=null){
            mostrarUsername()
        }
    },[profesorSelected])

    return (
        <div className="flex flex-col md:items-baseline items-center gap-1 md:px-5 p-2">
            <h1 className='font-bold text-2xl text-blacklight text-center'>Mostrar nombre usuario</h1>
            <form className="flex flex-col items-center md:items-start">
                {usernameShow!=null && <h1><span className="font-bold">Usuario:</span> {usernameShow}</h1>}
                <Selector messageSearch={messageSearch} selectMessage={selectMessage} itemsInput={profesores} changeItemSelected={SetProfesorSelected} itemSelected={profesorSelected} flotante={false}></Selector>
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