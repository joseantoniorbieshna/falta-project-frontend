import { useEffect } from "react";

export default function useScrollComponent({ handleScroll, isMobile}){
    var eventsAdded = false;
    useEffect(() => {
        
        
        const container = handleScroll();


        if (isMobile && !eventsAdded && container!=null) {
            handleScroll();
            if(container!=null){container.addEventListener('scroll', handleScroll);}
            window.addEventListener('resize', handleScroll);
            console.log("Aquí se carga el método para el nav en color móvil");
            eventsAdded = true;
        } else if (!isMobile && eventsAdded && container!=null) {
            if(container!=null){container.removeEventListener('scroll', handleScroll);}
            window.removeEventListener('resize', handleScroll);
            console.log("Aquí se borra el método para el nav en color móvil");
            eventsAdded = false;
        }

        return () => {
            console.log("aqui borro el metodo para el nav en color movil");
            if(container!=null){container.removeEventListener('scroll', handleScroll);}
            window.removeEventListener('resize', handleScroll)
        };
    }, [isMobile]);
}