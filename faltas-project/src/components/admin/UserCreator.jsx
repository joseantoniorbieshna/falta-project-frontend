import Selector from "../Utiles/Selector";

export default function UserCreator() {
    return (
        <div className="flex flex-col md:items-baseline items-center gap-1 md:px-5 p-2">
                <h1 className='font-bold text-2xl text-blacklight'>Creación de Usuario</h1>
                <div>
                    <Selector></Selector>
                </div>
        </div>
    )
}