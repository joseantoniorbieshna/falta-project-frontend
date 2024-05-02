import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import ErrorMessage from './components/Utiles/ErrorMessage'
import MainMenu from './components/Menu/MainMenu'
import { HorarioMain } from './components/HorarioMain'
import FaltasMain from './components/FaltasMain'


function MyLandingContainer({ children }) {
  return (
    <div className='flex flex-col md:h-[100vh]'>
      {children}
    </div>
  );
}

function MyMainPageContainer({ children }) {
  return (
    <div className='mm-container-root flex flex-col md:flex-row'> {/*flex flex-col  md:flex-row md:h-[100vh]*/}
      {children}
    </div>
  );
}
function App() {

  return (
      <BrowserRouter basename={"/faltas"}>
        <Routes>
          <Route path='/' element={<MyLandingContainer><Landing/></MyLandingContainer>}></Route>
          <Route path='/home' element={<MyLandingContainer><Landing/></MyLandingContainer>}></Route>

          <Route path='/horario' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <HorarioMain></HorarioMain>
              </MyMainPageContainer>}>    
          </Route>
          <Route path='/faltas' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <FaltasMain></FaltasMain>
              </MyMainPageContainer>}>    
          </Route>
          <Route path='/settings' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <HorarioMain></HorarioMain>
              </MyMainPageContainer>}>    
          </Route>

          <Route path='/login' element={
              <MyMainPageContainer>
                  <MainMenu/>
                  <HorarioMain></HorarioMain>
              </MyMainPageContainer>}>    
          </Route>

          <Route path='/error' element={<ErrorMessage/>}></Route>
          <Route path='*' element={<ErrorMessage/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
