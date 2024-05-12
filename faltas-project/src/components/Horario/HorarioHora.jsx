import './css/Horario.css'
export default function HorarioHora({ children, isActual = false }) {
    const clasesStyle = isActual ? 'actual-day' : 'no-actual-day'
    return (
        <div className={`hh-hora ${clasesStyle}`}>
            {children}
        </div>
    );
}