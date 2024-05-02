import { useEffect } from "react";

export default function useResizeComponentAndWindow({handleResize}){
    useEffect(() => {
        const observer = new ResizeObserver((entries)=>{
            for (let entry of entries) {
                handleResize()               
            }
        })
        
        const container = handleResize();


        if (container!=null) {
            handleResize();
            if(container!=null){observer.observe(container);};
            window.addEventListener('resize', handleResize);
        }

        return () => {
            observer.disconnect();
            if(container!=null){container.removeEventListener('resize', handleResize);}
            window.removeEventListener('resize', handleResize)
        };
    }, []);
}