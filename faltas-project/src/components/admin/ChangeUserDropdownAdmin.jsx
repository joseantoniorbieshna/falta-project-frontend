import { useEffect, useState } from "react";
import { getAllProfesores } from "../../service/profesorService";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../context/authenticationState";
import Selector from "../Utiles/Selector";

export default function ChangeUserDropdownAdmin() {
    const [profesorSelected, setProfesorSelected] = useState(null);
    const [profesores, setProfesores] = useState([]);
    const messageSearch = "Introduce el nombre un profesor"
    const selectMessage = "Selecciona un profesor"
    const { isChecking, checkIsLogin, setReferenciaProfesor,referenciaProfesor } = useAuth()


    const changeUser = () => {
        if (profesorSelected != null  && profesorSelected.referencia!=null) {
            setReferenciaProfesor(profesorSelected.referencia);
        }
    }

    useEffect(() => {
        if (isChecking == false) {

            getAllProfesores()
                .then((profesoresList) => {
                    setProfesores(profesoresList)
                    if(referenciaProfesor!=null){

                        const profesorActual = profesoresList.find((element,index)=>{
                            return element.referencia==referenciaProfesor
                        })
                        console.log(profesorActual);
                        setProfesorSelected(profesorActual)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    checkIsLogin()
                });

        }
    }, [isChecking])

    useEffect(()=>{
        changeUser()
        console.log("profesor selected cambiado");
    },[profesorSelected])

    return (<Selector messageSearch={messageSearch} selectMessage={selectMessage} itemsInput={profesores}
         changeItemSelected={setProfesorSelected} itemSelected={profesorSelected}>
         </Selector>)

}