import { useEffect } from "react";

export default function useScrollComponent({ handleScroll, isMobile}){
    var eventsAdded = false;
    useEffect(() => {
        
        
        const container = handleScroll();


        if (isMobile && !eventsAdded && container!=null) {
            handleScroll();
            if(container!=null){container.addEventListener('scroll', handleScroll);}
            window.addEventListener('resize', handleScroll);
            eventsAdded = true;
        } else if (!isMobile && eventsAdded && container!=null) {
            if(container!=null){container.removeEventListener('scroll', handleScroll);}
            window.removeEventListener('resize', handleScroll);
            eventsAdded = false;
        }

        return () => {
            if(container!=null){container.removeEventListener('scroll', handleScroll);}
            window.removeEventListener('resize', handleScroll)
        };
    }, [isMobile]);
}