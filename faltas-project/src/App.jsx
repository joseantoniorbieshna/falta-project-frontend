import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import ErrorMessage from './components/Utiles/ErrorMessage'
import MainMenu from './components/Menu/MainMenu'
import { HorarioMain } from './components/HorarioMain'
import FaltasMain from './components/FaltasMain'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import AuthProvider,{ useAuth } from './context/authenticationState'
import AdminMain from './components/AdminMain'



function MyLandingContainer({ children }) {
  return (
    <div className='flex flex-col md:h-[100vh]'>
      {children}
    </div>
  );
}

function MyMainPageContainer({ children }) {
  const {isLoggedIn,checkIsLogin} = useAuth()
  useEffect(()=>{
      checkIsLogin();
  },[isLoggedIn])

  return (
    <>
    {
      isLoggedIn &&
      <div className='mm-container-root flex flex-col md:flex-row'> {/*flex flex-col  md:flex-row md:h-[100vh]*/}
        {children}
      </div>
    }
    </>
  );
}

function MyMainPageContainerLogin({ children }) {
  return (
    <>
      <div className='mm-container-root flex flex-col md:flex-row'> {/*flex flex-col  md:flex-row md:h-[100vh]*/}
        {children}
      </div>
    </>
  );
}
function App() {

  return (
      <BrowserRouter basename={"/faltas"}>
        <AuthProvider>
        <Routes>
          <Route path='/' element={<MyLandingContainer><Landing/></MyLandingContainer>}></Route>
          <Route path='/home' element={<MyLandingContainer><Landing/></MyLandingContainer>}></Route>

          <Route path='/horario' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <HorarioMain></HorarioMain>
              </MyMainPageContainer>}>    
          </Route>
          <Route path='/faltas/:year?/:month?/:day?' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <FaltasMain></FaltasMain>
              </MyMainPageContainer>}>    
          </Route>
          <Route path='/settings' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <div className='flex-auto  text-center'>
                    CONFIGURACION
                  </div>
              </MyMainPageContainer>}>    
          </Route>

          <Route path='/admin' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <AdminMain/>
              </MyMainPageContainer>}>    
          </Route>

          <Route path='/login' element={
              <MyMainPageContainerLogin>
                  <Login/>
              </MyMainPageContainerLogin>}>    
          </Route>

          <Route path='/error' element={<ErrorMessage/>}></Route>
          <Route path='*' element={<ErrorMessage/>}></Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
