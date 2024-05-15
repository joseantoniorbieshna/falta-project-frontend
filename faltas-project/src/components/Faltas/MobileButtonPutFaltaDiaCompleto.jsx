import { useState } from "react"
import { getAllDayOfWeekString } from "../../utils/HoursAndWeekFunctions"
import PopUpCreateFaltaHorarioDiaCompleto from "../PopUps/PopUpCreateFaltaHorarioDiaCompleto"

export default function MobileButtonPutFaltaDiaCompleto({dia}){
    const diaDeLaSemanaPalabra = getAllDayOfWeekString()
    const [isOpen,setIsOpen] = useState(false)
    const changeToClose=()=>{
        setIsOpen(false)
    }
    return (
        <>
        <button onClick={()=>setIsOpen(true)} className='col-span-2 w-[98%] rounded-[20px] bg-green p-8 my-5 cursor-pointer font-bold'>FALTAR DIA COMPLETO {diaDeLaSemanaPalabra[dia].toUpperCase()}</button>
        {
            isOpen && <PopUpCreateFaltaHorarioDiaCompleto dia={dia} changeToClose={changeToClose}></PopUpCreateFaltaHorarioDiaCompleto>
        }
        </>
    )
}