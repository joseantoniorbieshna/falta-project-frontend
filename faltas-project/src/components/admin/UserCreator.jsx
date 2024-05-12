import { useEffect, useState } from "react";
import Selector from "../Utiles/Selector";
import { getAllProfesores } from "../../service/profesorService";
import { createUserApi } from "../../service/AuthorizationService";
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Utiles/Loading";

export default function UserCreator() {
    const [isInRequest, setIsInRequest] = useState(false)
    const [profesorSelected, SetProfesorSelected] = useState(null);
    const [profesores, setProfesores] = useState([]);
    const messageSearch = "Introduce el nombre un profesor"
    const selectMessage = "Selecciona un profesor"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const crearUsuario = (event) => {
        event.preventDefault();
        if (profesorSelected != null) {
            console.log("entre");
            setIsInRequest(true)
            createUserApi(username, password, profesorSelected.referencia)
                .then((res) => {
                    toast.success("Usuario '" + username + "' creado con exito! ", {
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
                    const indiceElemento = profesores.indexOf(profesorSelected)
                    profesores.splice(indiceElemento, 1)
                    SetProfesorSelected(null)
                    setIsInRequest(false)
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

        getAllProfesores()
            .then((profesoresList) => {
                setProfesores(profesoresList)
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    return (
        <div className="flex flex-col md:items-baseline items-center gap-1 md:px-5 p-2">
            <h1 className='font-bold text-2xl text-blacklight'>Creación de Usuario</h1>
            <form className="flex flex-col items-center">
                <div className="flex flex-row gap-3 mb-3 flex-wrap justify-center md:justify-start ">
                    <div className="flex justify-center border-2 rounded-md">
                        <input id="username" name="username" className="px-2" type="text" value={username} placeholder="Usuario" onChange={({ target }) => { setUsername(target.value) }}></input>
                    </div>
                    <div className="flex justify-center border-2 rounded-md ">
                        <input className="px-2" type="password" id="pass" name="password" value={password} placeholder="contraseña" onChange={({ target }) => { setPassword(target.value) }}></input>
                    </div>
                </div>
                <Selector messageSearch={messageSearch} selectMessage={selectMessage} itemsInput={profesores} changeItemSelected={SetProfesorSelected} itemSelected={profesorSelected}></Selector>
                <button className=" my-3 p-2 rounded-lg bg-green" onClick={(event)=>crearUsuario(event)}>Crear usuario</button>

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