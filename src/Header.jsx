import React from 'react'
import Student from './Student'
import Admin from './Admin'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <header className="header-container">
      <h1 className="header-title">Student Management System</h1>

      <div className="btn-group">
        <Link to="/student">
          <button className="nav-btn">Student</button>
        </Link>

        <Link to="/admin">
          <button className="nav-btn">Admin</button>
        </Link>
      </div>
    </header>
  )
}




export default Header