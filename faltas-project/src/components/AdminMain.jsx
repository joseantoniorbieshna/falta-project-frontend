import React from "react";
import XmlFileSender from "./admin/XmlFileSender";
import UserCreator from "./admin/UserCreator";

export default function AdminMain() {
    return (
        <section className="hh-section-horario flex-auto flex flex-col justify-center overflow-hidden items-center">
            <div className="hm-title-container md:p-5 p-2 border-b-[3px] border-[#F0F0F0] w-full">
                <h1 className='font-bold text-2xl text-blacklight'>Admin</h1>
            </div>
            <div className="flex-auto overflow-y-scroll w-full">
                <UserCreator></UserCreator>
                <XmlFileSender></XmlFileSender>
            </div>
            
        </section>
    )
}
