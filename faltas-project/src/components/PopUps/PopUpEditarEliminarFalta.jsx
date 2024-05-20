import { IonIcon } from '@ionic/react';
import './css/PopUpGeneral.css'
import '../css/MensajeHorario.css'
import { close, trash } from 'ionicons/icons';
import MyCalendar from '../Utiles/MyCalendar';
import { createFalta, deleteFaltaApi, editarFaltaApi } from '../../service/FaltaService';
import { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertDateToString } from '../../utils/myDateFunctions';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authenticationState';
import { getAllDayOfWeekString, getAllHoursOfDayString } from '../../utils/HoursAndWeekFunctions';
export default function PopUpCreateFaltaHorario({ dia, indice, referenciaSesion, changeToClose, materia, containerInfoGrupoYCurso, comentarioInput, fechaInput }) {
    const navigate = useNavigate();
    const [openDelete, setOpenDelete] = useState(false)
    const [myDate, setMyDate] = useState(fechaInput);
    const [comentario, setComentario] = useState(comentarioInput);
    const diaDeLaSemanaPalabra = getAllDayOfWeekString()
    const indiceDeLaSemanaPalabra = getAllHoursOfDayString()
    const { checkIsLogin } = useAuth()


    const editarFalta = () => {
        /* VALIDACION */
        if (myDate == null) {
            toast.error("Introduce una fecha", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return
        }
        /* QUERY */
        const faltaEditObject = { dia, indice, referenciaSesion, comentario, fecha: convertDateToString(fechaInput), fechaNueva: convertDateToString(myDate) }
        console.log(faltaEditObject);
        editarFaltaApi(faltaEditObject)
            .then((data) => {
                toast.success('Falta editada con exito!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                checkIsLogin()

            })
            .catch((err) => {
                console.log(err.message);
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                checkIsLogin()
            })
    }

    const borrarFalta = () => {
        const faltaDeleteObject = { dia, indice, referenciaSesion, fecha: convertDateToString(fechaInput) }
        console.log(faltaDeleteObject);
        deleteFaltaApi(faltaDeleteObject)
            .then((data) => {
                toast.success('Falta eliminada con exito!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setOpenDelete(false)
                checkIsLogin()
            })
            .catch((err) => {
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                checkIsLogin()
            })
    }

    const noPropagationChangeToClose = (e) => {
        if (e.target.id == 'parent-menu-mensaje') { changeToClose() }
    }

    return (
        <div className={`menumenh-container-parent`} id='parent-menu-mensaje' onClick={(e) => noPropagationChangeToClose(e)}>
            <div className="menumenh-container">
                <IonIcon icon={close} onClick={changeToClose} className={'menumenh-close-button text-blacklight text-4xl cursor-pointer'}></IonIcon>
                <div className='menunh-container-middle'>
                    <h1 className='menumenh-title text-2xl font-bold border-gradient-edit'>Editar/Eliminar falta</h1>
                    <div className='menumenh-container-info'>
                        <h2 className='text-lg font-bold break-words'>{materia}</h2>
                        <div className='flex flex-row items-end'>
                            <p className='mr-2 font-bold'>Información día:</p>
                            <p className=''>{diaDeLaSemanaPalabra[dia]} a {indiceDeLaSemanaPalabra[indice]}</p>
                        </div>
                        <div className='flex flex-wrap flex-row items-center'>
                            <p className='mr-1 font-bold'>Fecha:</p>
                            <MyCalendar myDate={myDate} setMyDate={setMyDate} day={dia}></MyCalendar>
                        </div>
                        {containerInfoGrupoYCurso}
                        <div className='menumenh-info-comentario'>
                            <p className='font-bold'>Comentario:</p>
                            <textarea type="text" className='m-text-comment w-[100%]' value={comentario} onChange={(e) => setComentario(e.target.value)} />
                        </div>
                        <div className='menumh-send-container'>
                            <button className='menumh-button menumh-button-edit font-bold' onClick={(e) => editarFalta()}>Editar</button>
                            <button className='menumh-button menumh-button-rechazar font-bold' onClick={(e) => setOpenDelete(!openDelete)}>borrar</button>
                        </div>

                        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                            <div className="text-center w-56">
                                <IonIcon icon={trash} className={"text-4xl text-[red]"}></IonIcon>
                                <div className="mx-auto my-4 w-48">
                                    <h3 className="text-lg font-black text-gray-800">CONFIRMAR BORRADO</h3>
                                    <p className="text-sm text-gray-500">
                                        ¿Seguro que quieres borrar esta falta?
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="btn btn-danger w-full rounded-lg bg-[red] text-[white] font-bold py-1"
                                        onClick={borrarFalta}>Borrar</button>
                                    <button
                                        className="btn btn-danger w-full rounded-lg bg-[black] text-[white] font-bol py-1"
                                        onClick={() => setOpenDelete(false)}>Cancelar</button>
                                </div>
                            </div>
                        </Modal>

                    </div>
                </div>
            </div>
        </div>
    );
}