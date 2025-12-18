import React from 'react'
import Home from './Home'
import Admin from './Admin'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Header from './Header'
import Student from './Student'
function App() {


  const adminLoggedIn=localStorage.getItem("adminLoggedIn")
  const studentLoggedIn=localStorage.getItem("studentLoggedIn")
  return (
   

      <>
    
    <Router>

      {!adminLoggedIn && !studentLoggedIn && <Header />}
      <Routes>
        <Route path='/' element={adminLoggedIn ? <Navigate to="/home" /> : <Student />}/>
        <Route path='/student' element={!studentLoggedIn ? <Navigate to="/home" /> : <Student />}/>
        <Route path='/Admin' element={adminLoggedIn ? <Navigate to="/home" /> : <Admin />}/>
        <Route path='/home' element={adminLoggedIn?<Home/>:<Navigate to="/"/>}/>
      </Routes>
    </Router>
      </>
    
  )
}

export default App