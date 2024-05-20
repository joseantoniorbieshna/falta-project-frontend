import React, { useEffect, useState } from "react";
import { IonIcon } from '@ionic/react';
import { chevronDownOutline, searchOutline } from 'ionicons/icons';


const Selector = ({messageSearch,selectMessage,itemsInput, changeItemSelected, itemSelected}) => {

    const [items, setItems] = useState(itemsInput);
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        setItems(itemsInput)
    },[itemsInput])

    return (
        <div className="w-[20rem] font-medium min-h-min max-h-80">
            <div
                onClick={() => setOpen(!open)}
                className={`bg-gray w-full p-2 flex items-center justify-between rounded cursor-pointer ${itemSelected!=null && "text-gray-700"
                    }`}
            >
                {itemSelected!=null
                    ? itemSelected?.nombre?.length > 25
                        ? itemSelected?.nombre?.substring(0, 25) + "..."
                        : itemSelected.nombre
                    : selectMessage}
                <IonIcon icon={chevronDownOutline}></IonIcon>
            </div>
            
            <ul
                className={`absolute z-[50] bg-white mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"
                    } `}
            >
                <div className="flex items-center px-2 sticky top-0 bg-white">
                    <IonIcon icon={searchOutline}></IonIcon>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value.toLowerCase());
                        }}
                        placeholder={messageSearch}
                        className="placeholder:text-gray-700 p-2 outline-none flex-auto"
                    />
                </div>
                {items?.map((item, index) => (
                    
                    <li
                        key={index}
                        className={`p-2 text-sm hover:bg-sky-600 cursor-pointer 
            ${item?.nombre?.toLowerCase() === itemSelected?.nombre?.toLowerCase() ?
                            "bg-black text-white hover:bg-black hover:text-white"
                            : "hover:text-black hover:bg-gray"}
            ${item?.nombre?.toLowerCase().includes(inputValue)
                                ? "block"
                                : "hidden"
                            }`}
                        onClick={() => {
                            if (itemSelected==null || item?.nombre?.toLowerCase() !== itemSelected.nombre?.toLowerCase()) {
                                changeItemSelected(item);
                                setOpen(false);
                                setInputValue("");
                            }
                        }}
                    >
                        
                        {item?.nombre}
                    </li>
                ))}
            </ul>



        </div>
    );
};

export default Selector;