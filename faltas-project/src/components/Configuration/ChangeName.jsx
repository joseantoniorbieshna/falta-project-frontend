import { useState } from "react";
import { useAuth } from "../../context/authenticationState";

export default function ChangeName(){
    const {isAdmin} = useAuth();
    const [nombre,setNombre] = useState()

    return (
    <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Cambiar Nombre</h1>
        </div>
        <input className="rounded-[5px] pl-1 border-[2px] border-[black] border-solid" placeholder="nombre" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}></input>
        <button className="px-3 border-[2px] border-[black] border-solid rounded-[5px]">Enviar</button>
    </div>
    )
}