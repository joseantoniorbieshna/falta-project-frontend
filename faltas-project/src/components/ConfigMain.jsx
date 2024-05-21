import { useAuth } from "../context/authenticationState"
import ChangeName from "./Configuration/ChangeName"
export default function ConfigMain() {
    const {isAdmin} = useAuth();
    return (
        <div className="flex-auto flex flex-col items-center">
            <h1 className='w-[90%] p-5 font-bold text-2xl text-blacklight flex flex-col items-center
            border-b-[3px] border-b-[#f0f0f0] border-b-solid'>Configuración</h1>
            <div className="w-[90%] flex flex-col items-start pt-2">
                {
                    !isAdmin &&
                    <ChangeName />
                }
            </div>
        </div>
    )
}