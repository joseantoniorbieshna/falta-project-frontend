import React, { useState, useContext } from "react";
import { authenticationContext } from "./authenticationContext";
import { useNavigate } from "react-router-dom";
import { getInfoUserAuthentication } from "../service/AuthorizationService";
import { deleteTokenInCookies } from "../service/AuthorizationService";
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(false);
    const [username, setUsername] = useState(null);
    const [referenciaProfesor, setReferenciaProfesor]= useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const checkIsLogin = () => {
      setIsChecking(true)
      getInfoUserAuthentication()
      .then((res)=>{
        const {username,role,referenciaProfesor}=res;
        console.log("username: "+username+" role: "+role+" referenciaProfesor: "+referenciaProfesor);
        setIsLoggedIn(true);
        setUsername(username)

        if(role!="ADMIN"){
          setReferenciaProfesor(null)
          setIsAdmin(true)
        }else{
          setIsAdmin(false);
          setReferenciaProfesor(referenciaProfesor)
        }
        setIsChecking(false)
      }).catch((err)=>{
        setIsChecking(false)
        navigate("/login")
      })
    
      };
  
    const logout = () => {
        deleteTokenInCookies();
        setIsLoggedIn(true)
        setUsername(null);
        setReferenciaProfesor(null);
        setIsAdmin(false);
    };
  
    return (
      <authenticationContext.Provider value={{isLoggedIn,isChecking, username, referenciaProfesor, isAdmin, checkIsLogin, logout }}>
        {children}
      </authenticationContext.Provider>
    );
  };

  export const useAuth = () => {
    return useContext(authenticationContext);
  };

  export default AuthProvider;