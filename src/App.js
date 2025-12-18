import React from 'react'
import Home from './Home'
import Admin from './Admin'
import {  Route, Routes, Navigate } from 'react-router-dom'
import Header from './Header'
import Student from './Student'
function App() {


  const adminLoggedIn=localStorage.getItem("adminLoggedIn")
  const studentLoggedIn=localStorage.getItem("studentLoggedIn")
  return (
   

      <>
    
    

      {!adminLoggedIn && !studentLoggedIn && <Header />}
      <Routes>
        <Route path='/' element={adminLoggedIn ? <Navigate to="/home" /> : <Student />}/>
        <Route path='/student' element={!studentLoggedIn ? <Navigate to="/home" /> : <Student />}/>
        <Route path='/Admin' element={adminLoggedIn ? <Navigate to="/home" /> : <Admin />}/>
        <Route path='/home' element={adminLoggedIn?<Home/>:<Navigate to="/"/>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
   
      </>
    
  )
}

export default App