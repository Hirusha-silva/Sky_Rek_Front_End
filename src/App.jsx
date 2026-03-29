import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import {Toaster} from 'react-hot-toast'
import ClientPage from './pages/client/clientPage'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "538698889525-4oise5389cpqh69qaopt4ejjo7lsuluv.apps.googleusercontent.com"
const clientSecret = "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" 

function App() {
  return (
    
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
      <div className='w-full min-h-screen  bg-primary text-secondary' >  
        <Toaster position="top-right"/>  
        <Routes path="/">
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />   /*adminta pitipassen dena onama admin page eke sub route ekak hadanna puluwan */
          <Route path="/test" element={<TestPage />} />
          <Route path="/*" element={<ClientPage />} />  
        </Routes>
      </div>
      </GoogleOAuthProvider>
    </BrowserRouter>

  )
}

export default App
