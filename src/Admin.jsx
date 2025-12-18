import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ad_url } from './url'

function Admin({ setAdminLoggedIn }) {

  const navigate = useNavigate()
  const [admins, setAdmins] = useState([])
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')

  useEffect(() => {
    axios.get(ad_url)
      .then(res => setAdmins(res.data))
      .catch(err => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault()

    if (!name || !password) {
      alert("Please fill all fields")
      return
    }

    const admin = admins.find(
      a => a.name === name && a.password === password
    )

    if (!admin) {
      alert("Invalid Credentials")
      return
    }

    // ✅ IMPORTANT
    localStorage.setItem("adminLoggedIn", "true")
    localStorage.setItem("adminName", name)

    setAdminLoggedIn(true)   // 🔥 triggers rerender
    navigate("/home")
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>Admin Login</h1>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Admin
