export default function DayNavigationMobile({ dayIndex, diasTextoAbreviado, actualDay, isActual, isActive, setActive, showDayNumber }) {
    const classNameActualDay = isActual ? 'last-day-horario-head' : ''
    const classNameActiveDay = isActive ? 'active-horario-head' : ''
    const classNameNotShowDayNumber = !showDayNumber? 'hh-is-only-day-of-week-name':''
    const funcionOnCLick = (event) => {
        /* PARA QUE NO APAREZCA EN LA RUTA */
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'instant' });
        }
        /* ACTIVAR EL COLOR */
        setActive(dayIndex)
    }
    return (
        <a href={`#day-${dayIndex}`} name={`#day-${dayIndex}`} className={`hh-menu-mobile-part-day ${classNameActualDay} ${classNameActiveDay} ${classNameNotShowDayNumber}`} onClick={funcionOnCLick}>
            <div className='hh-menu-mobile-day-day_number' >
                {diasTextoAbreviado}
            </div>
            {
                showDayNumber?
                <div className='hh-menu-mobile-day-day_text'>
                    {actualDay}
                </div>
                :
                <></>
            }
        
        </a>
    )
};