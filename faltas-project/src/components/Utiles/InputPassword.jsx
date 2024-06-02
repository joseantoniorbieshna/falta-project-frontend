import React, { useState } from "react";
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

export default function InputPassword({style={},password, setPassword,placeholder}) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="relative">
        <input 
          className="px-2 py-1 border-2 border-black rounded-[10px] pr-3"
          type={showPassword ? "text" : "password"}
          style={style}
          value={password}
          placeholder={placeholder}
          onChange={({ target }) => { setPassword(target.value) }}  
        />
        <IonIcon 
          icon={showPassword ? eyeOutline : eyeOffOutline} 
          onClick={() => setShowPassword(!showPassword)} 
          className="absolute inset-y-0 right-0 m-auto mr-3 text-gray-400 cursor-pointer"
        />
      </div>
    )
}