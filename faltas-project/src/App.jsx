import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import ErrorMessage from './components/ErrorMessage'
import MainMenu from './components/MainMenu'
import { HorarioMain } from './components/HorarioMain'


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
