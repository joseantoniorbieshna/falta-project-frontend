import React, { useState } from "react";
import { sendXMLFileToPopulateDatabase } from "../../service/xmlService";
import { toast,Bounce } from "react-toastify";
import Loading from "../Utiles/Loading";

export default function XmlFileSender() {
    const [isInRequest,setIsInRequest] = useState(false)
    const [responseMessage,setResponseMessage] = useState(null)
    const [hasFile,setHasFile] = useState(false)
    const [archivo, setArchivo] = useState(null);
    const [fileName, setFileName] = useState('');

    const loadFileInState = () => {
        const input = document.getElementById('file');
        if (input.files.length > 0) {
            setHasFile(true);
            setArchivo(input.files[0])
            setFileName(input.files[0].name);
        } else {
            setArchivo(null)
            setHasFile(false);
            setFileName('');
        }
    };

    const sendFile=(event)=>{
        setIsInRequest(true)
        event.preventDefault()
        if (hasFile && archivo!=null) {

            sendXMLFileToPopulateDatabase(archivo)
            .then(data=>{
                setResponseMessage(data)
                setIsInRequest(false)
                console.log("lo que sucedio fue:"+data);
            })
            .catch(err=>{
                setResponseMessage(null)
                setIsInRequest(false)
                console.log("el error es:"+err.message);
            })
          
        }else{
            toast.error("Selecciona un archivo xml", {
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
                setIsInRequest(false)
        }

    }

    const clickButtonFile = (e) => {
        e.preventDefault();
        document.getElementById('file').click();
    };

    return (
            <div className="flex flex-col md:items-baseline items-center gap-1 md:px-5 p-2">
                <h1 className='font-bold text-2xl text-blacklight'>XML</h1>
                <form className=" flex flex-col md:items-baseline items-center">
                    <div className="flex flex-row items-center">
                        <button onClick={clickButtonFile} className="bg-[black] text-[white] rounded-lg px-2">Seleccionar XML</button>
                        <input type="file" id="file" accept=".xml" onChange={loadFileInState} className="hidden" />
                    </div>
                    {hasFile ?
                        <p>Xml seleccionado: {fileName}</p>
                        :
                        <p>No has seleccionado ningún archivo.</p>
                    }
                    <p><span className="text-[red]">ATENCION:</span>Resetearas la base</p>
                    <p>Esta acción puede tardar varios minutos...</p>

                    <div className="">
                        <button type="submit" className="bg-green text-[black] p-2 rounded-lg" onClick={sendFile}>Enviar XML</button>
                    </div>
                    {
                        isInRequest &&
                        <div >
                            <Loading/>
                        </div>
                    }

                    {
                        responseMessage!=null && !isInRequest && <p className="md:px-0 px-5">{responseMessage.split('\n').map((linea,index)=><React.Fragment key={index}>{linea}<br/></React.Fragment>)}</p>
                    }
                    
                </form>
            </div>
    )
}
