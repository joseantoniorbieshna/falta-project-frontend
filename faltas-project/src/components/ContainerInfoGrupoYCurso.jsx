import './css/MensajeHorario.css'

export default function ContainerInfoGrupoYCurso({curso,grupos,profesor=null,profesorSustituto, classNameTextTitle}){
    return (
        <>
             <div className='m-info-container'>
                    <div className='m-curso'>
                        <p className='m-curso-text'><span className={`m-text-span ${classNameTextTitle}`}>Curso: </span>{curso}</p>
                    </div>
                    <div className='m-grupos'>
                        <p className='m-grupo-title'><span className={`m-text-span ${classNameTextTitle}`}>Grupos: </span>
                            {
                                grupos.length == 1 ?
                                    grupos.map((grupo, index) => {
                                        return <>{grupo.nombre}</>
                                    })
                                    :
                                    grupos.map((grupo, index) => {
                                        return <>{grupo.nombre}|</>
                                    })
                            }                    
                            </p>
                    </div>
                    {
                            profesor?
                            <div className='m-container-profesor'>
                                <p className='m-profesor-text'><span className={`m-text-span ${classNameTextTitle}`}>Profesor: </span>{profesor}</p>
                            </div>
                            :
                            <></>
                        }

{
                            profesorSustituto?
                            <div className='m-container-profesor'>
                                <p className='m-profesor-text'><span className={`m-text-span ${classNameTextTitle}`}>Profesor Sustituto: </span>{profesorSustituto}</p>
                            </div>
                            :
                            <></>
                        }


                </div>
        </>
    )
}