import { useEffect, useState } from "react";

export default function useMobile() {
    const [isMobile,setMobile]=useState(false);
    const tamannoMaxMobile= 769;
    useEffect(() => {
        const handleResize=()=>{
            setMobile(window.innerWidth < tamannoMaxMobile)
        }
        handleResize();
        window.addEventListener('resize',handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return [isMobile]
}
