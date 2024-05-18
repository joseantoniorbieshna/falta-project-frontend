import React, { useEffect, useState } from "react";
import { getFaltasByDiaAndIndice } from "../../service/FaltaService"
import { processFaltas } from "../../utils/faltaProcess";
import Loading from "../Utiles/Loading";
import { useAuth } from "../../context/authenticationState";
import { convertDateToString } from "../../utils/myDateFunctions";

export default function FaltaInGuardia({ dia, indice }) {
    const [allObject, setAllObject] = useState([]);
    const [isInRequest, setIsInRequest] = useState(true);
    const [fechasDistinct, setFechasDistint] = useState(new Set())
    const { referenciaProfesor } = useAuth();
    const loadData = () => {
        getFaltasByDiaAndIndice(dia, indice)
            .then((dataObject) => {
                const resultDataSetObject = processFaltas(dataObject, referenciaProfesor,true);
                setAllObject(resultDataSetObject)

                const uniqueDates = new Set();
                dataObject.forEach((object, index) => {
                    uniqueDates.add(object.fecha);
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
        <>

            {
                isInRequest ?
                    <Loading></Loading>
                    :
                    <>
                        {
                            [...fechasDistinct].sort((fecha1, fecha2) => new Date(fecha1) - new Date(fecha2)).map((fecha, fechaIndex) => (
                                <div key={fechaIndex} className="w-full flex flex-col items-center">
                                   
                                    <div className="text-center font-bold text-2xl sticky top-0 bg-white w-full">{convertDateToString(fecha)}</div>
                                    {
                                        allObject.filter(myobj=>myobj.props.fecha==fecha).map((object, index) => (
                                            <React.Fragment key={index}>
                                                {object}
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </>


            }
        </>
    )
}