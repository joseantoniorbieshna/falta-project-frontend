import { useEffect } from "react";

export default function useEffectAddWindowEvent({ handleResize, type = 'resize', condition=true }) {
    useEffect(() => {
        handleResize();

        if(condition){
            window.addEventListener(type, handleResize);
            console.log("Cargando useEffectWindowEvent Añadido");
        }else{
            window.removeEventListener(type, handleResize);
            console.log("Borrando useEffectWindowEvent");
        }
        return () => {
            window.removeEventListener(type, handleResize);
        };
    }, [condition]);
}