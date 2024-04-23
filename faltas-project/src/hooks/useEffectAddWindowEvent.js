import { useEffect } from "react";

export default function useEffectAddWindowEvent({ handleResize, type = 'resize', conditionToChange=true}) {
    useEffect(() => {
        handleResize();

        window.addEventListener(type, handleResize);
        console.log("Cargando useEffectWindowEvent Añadido");
        return () => {
            window.removeEventListener(type, handleResize);
        };
    }, [conditionToChange]);
}