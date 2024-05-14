import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
      <App></App>
  </React.StrictMode>
)