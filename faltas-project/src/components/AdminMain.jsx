import React, { useEffect, useState } from "react";
import XmlFileSender from "./admin/XmlFileSender";
import UserCreator from "./admin/UserCreator";
import { getAllProfesores } from "../service/profesorService";
import { data } from "autoprefixer";
import { useAuth } from "../context/authenticationState";
import { useNavigate } from "react-router-dom";
import ChangePasswordUserAdmin from "./admin/ChangePasswordUserAdmin";

export default function AdminMain() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isReady, setIsready] = useState(false)
    
    useEffect(() => {
        if (!isAdmin) {
            navigate("/login")
        }else{
            setIsready(true)
        }
    }, [])

    return (
        <>
            {
                isReady &&
                <section className="hh-section-horario flex-auto flex flex-col justify-center overflow-hidden items-center">
                    <div className="hm-title-container md:p-5 p-2 border-b-[3px] border-[#F0F0F0] w-full">
                        <h1 className='font-bold text-2xl text-blacklight'>Admin</h1>
                    </div>
                    <div className="flex-auto overflow-y-auto w-full">
                        <UserCreator></UserCreator>
                        <ChangePasswordUserAdmin></ChangePasswordUserAdmin>
                        <XmlFileSender></XmlFileSender>
                    </div>

                </section>
            }
        </>
    )
}
