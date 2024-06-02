import React, { useState, useContext, } from "react";
import { authenticationContext } from "./authenticationContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getInfoUserAuthentication } from "../service/AuthorizationService";
import { deleteTokenInCookies } from "../service/AuthorizationService";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(false);
    const [username, setUsername] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [referenciaProfesor, setReferenciaProfesor]= useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const checkIsLogin = () => {
      console.log("mi referencia es: "+referenciaProfesor);
      setIsChecking(true)
      getInfoUserAuthentication()
      .then((res)=>{
        const {username,role,referenciaProfesor,nombre}=res;
        console.log("username: "+username+" role: "+role+" referenciaProfesor: "+referenciaProfesor);
        setIsLoggedIn(true);
        setUsername(username)

        if(role=="ADMIN"){
          setIsAdmin(true)
          setNombre(username)
          console.log("SOY ADMIN");
        }else{
          setIsAdmin(false);
          setNombre(nombre);
          setReferenciaProfesor(referenciaProfesor)
          console.log("SOY USER");
        }
        setIsChecking(false)
      }).catch((err)=>{
        setAllNull()
        console.log("estoy en login:"+location.pathname!="/login");
        if(location.pathname!="/login"){
        toast.error("La sesión ha expirado o hubo un error. Vuelve a iniciar sesión", {
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
          
            navigate("/login")
          }
          setIsChecking(false)
        })
      };
  
    const logout = () => {
        deleteTokenInCookies();
        setIsLoggedIn(false)
        setUsername(null);
        setReferenciaProfesor(null);
        setIsAdmin(false);
    };

    const setAllNull=()=>{
      setIsLoggedIn(false)
      setUsername(null);
      setReferenciaProfesor(null);
      setIsAdmin(false);
    }
  
    return (
      <authenticationContext.Provider value={{isLoggedIn,isChecking,nombre, username, referenciaProfesor, isAdmin,setReferenciaProfesor, checkIsLogin, logout }}>
        {children}
      </authenticationContext.Provider>
    );
  };

  export const useAuth = () => {
    return useContext(authenticationContext);
  };

  export default AuthProvider;