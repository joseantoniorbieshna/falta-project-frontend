import { useEffect, useState } from "react";
import { getFaltasByDiaAndIndice } from "../../service/FaltaService"
import { processFaltas } from "../../utils/faltaProcess";
import Loading from "../Utiles/Loading";
import { useAuth } from "../../context/authenticationState";

export default function FaltaInGuardia({ dia, indice }) {
    const [allObject, setAllObject] = useState([]);
    const [isInRequest, setIsInRequest] = useState(true);
    const [ fechasDistinct, setFechasDistint ] = useState(new Set())
    const { referenciaProfesor } = useAuth();
    const loadData = () => {
        getFaltasByDiaAndIndice(dia, indice)
            .then((dataObject) => {
                console.log(dataObject);
                const resultDataSetObject = processFaltas(dataObject, referenciaProfesor);
                setAllObject(resultDataSetObject)

                const uniqueDates = new Set();
                resultDataSetObject.forEach(message => {
                    uniqueDates.add(message.fecha);
                });
                console.log(uniqueDates);

                setFechasDistint(uniqueDates);
                setIsInRequest(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <div className='flex flex-col items-center flex-auto overflow-auto w-[100%] pt-5'>

            {
                isInRequest ?
                    <Loading></Loading>
                    :
                    <>
                        {
                            [...fechasDistinct].map((fecha) => {
                                allObject.map((object) => {
                                    return <>
                                        {object}
                                    </>
                                })
                            })

                        }
                    </>


            }
        </div>
    )
}