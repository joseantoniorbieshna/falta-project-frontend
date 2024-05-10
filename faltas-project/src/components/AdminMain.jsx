import { useEffect, useState } from "react";

export default function AdminMain() {
    const [hasFile, setHasFile] = useState(false);
    const [fileName, setFileName] = useState('');

    const checkHasFileSelected = () => {
        const input = document.getElementById('file');
        if (input.files.length > 0) {
            setHasFile(true);
            setFileName(input.files[0].name);
        } else {
            setHasFile(false);
            setFileName('');
        }
    };

    useEffect(() => {
        checkHasFileSelected();
    }, []);

    const clickButtonFile = (e) => {
        e.preventDefault();
        document.getElementById('file').click();
    };

    return (
        <section className="hh-section-horario flex-1 flex flex-col justify-center">
            <div className="hm-title-container md:p-5 p-2 border-b-[3px] border-[#F0F0F0]">
                <h1 className='font-bold text-2xl text-blacklight'>Admin</h1>
            </div>

            <div className="flex-auto flex flex-col gap-1 md:px-5 p-2">
                <h1 className='font-bold text-2xl text-blacklight'>XML</h1>
                <form>
                    <div className="flex flex-row items-center">
                        <button onClick={clickButtonFile} className="bg-[black] text-[white] rounded-lg px-2">Seleccionar XML</button>
                        <input type="file" id="file" accept=".xml" onChange={checkHasFileSelected} className="hidden" />
                    </div>
                    {hasFile ?
                        <p>Xml seleccionado: {fileName}</p>
                        :
                        <p>No has seleccionado ningún archivo.</p>
                    }
                    <p><span className="text-[red]">ATENCION:</span>Resetearas la base</p>
                    <p>Esta acción puede tardar varios minutos...</p>

                    <div className="">
                        <button type="submit" className="bg-green text-[black] p-2 rounded-lg">Enviar XML</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
