import './css/MensajeHorario.css'
export default function MensajeHora({ mensaje, backgroundColor = '#dff2cd', dia, indice }) {
    return (
        <div className='m-hora' dia={dia} indice={indice} style={{ backgroundColor }}>
            {mensaje}
        </div>
    )
}