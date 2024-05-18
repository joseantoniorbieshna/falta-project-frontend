import Loading from "../Utiles/Loading";
import { convertDateToStringESP } from "../../utils/myDateFunctions";
import React from "react";

export default function FaltaInGuardia({ allGuardias,fechasDistinct}) {
    return (
        <>

            {
                    <>
                        {
                            [...fechasDistinct].sort((fecha1, fecha2) => new Date(fecha1) - new Date(fecha2)).map((fecha, fechaIndex) => (
                                <div key={fechaIndex} className="w-full flex flex-col items-center">
                                   
                                    <div className="text-center font-bold text-2xl sticky top-0 bg-white w-full">{convertDateToStringESP(fecha)}</div>
                                    {
                                        allGuardias.filter(guardia=>guardia.props.fecha==fecha).map((guardia, index) => (
                                            <React.Fragment key={index}>
                                                {guardia}
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