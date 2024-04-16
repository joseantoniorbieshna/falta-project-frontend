import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import ErrorMessage from './components/ErrorMessage'
function App() {

  return (
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Landing/>}></Route>
          <Route path='/home' element={<Landing/>}></Route>
          <Route path='/login' element={<ErrorMessage/>}></Route>
          <Route path='/error' element={<ErrorMessage/>}></Route>
          <Route path='*' element={<ErrorMessage/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
