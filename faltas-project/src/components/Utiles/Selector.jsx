import React, { useEffect, useState } from "react";
import { IonIcon } from '@ionic/react';
import { chevronDownOutline, searchOutline } from 'ionicons/icons';


const Selector = () => {

    const messageSearch = "Introduce el nombre un profesor"
    const selectMessage = "Selecciona un profesor"
    const [items, setItems] = useState([{ name: "Nieves" }, 
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee1" },
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee2" },
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee3" },
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee4" },
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee5" },
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee6" },
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee7" },
    { name: "Jose eeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeee8" },
    { name: "Fernando" }]);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <div className="w-[20rem] font-medium min-h-min max-h-80">
            <div
                onClick={() => setOpen(!open)}
                className={`bg-gray w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700"
                    }`}
            >
                {selected
                    ? selected?.length > 25
                        ? selected?.substring(0, 25) + "..."
                        : selected
                    : selectMessage}
                <IonIcon icon={chevronDownOutline}></IonIcon>
            </div>
            
            <ul
                className={`bg-white mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"
                    } `}
            >
                <div className="flex items-center px-2 sticky top-0 bg-white">
                    <IonIcon icon={searchOutline}></IonIcon>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder={messageSearch}
                        className="placeholder:text-gray-700 p-2 outline-none flex-auto"
                    />
                </div>
                {items?.map((item, index) => (
                    <li
                        key={index}
                        className={`p-2 text-sm hover:bg-sky-600 hover:text-black hover:bg-gray
            ${item?.name?.toLowerCase() === selected?.toLowerCase() &&
                            "bg-black text-white hover:bg-black hover:text-white "
                            }
            ${item?.name?.toLowerCase().includes(inputValue)
                                ? "block"
                                : "hidden"
                            }`}
                        onClick={() => {
                            if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                                setSelected(item?.name);
                                setOpen(false);
                                setInputValue("");
                            }
                        }}
                    >
                        {item?.name}
                    </li>
                ))}
            </ul>



        </div>
    );
};

export default Selector;