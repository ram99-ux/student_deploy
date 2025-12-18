import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Home from './Home'
import { useNavigate } from 'react-router-dom'

import {ad_url} from './url'

function Admin() {
    const navigate=useNavigate()
    const [admins,setAdmins]=useState([])
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')

    useEffect(()=>{
        fetchAdmins()
    },[])
    
    const fetchAdmins=()=>{
         axios.get(ad_url)
        .then(res=>{
            setAdmins(res.data)
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    

const submit= async(e)=>{
     
     e.preventDefault();
      const admin = admins.find((admin) => admin.name === name && admin.password === password);
        if(!name || !password){
            alert("Please fill all the fields")
            return
        }
       
        if(admins.length===0){
            alert("No Admins found")
            return
        }
        else {

           
            console.log(admin)
            if(!admin){
                alert("Invalid Credentials")
                return
            } 
            
            
         localStorage.setItem("adminLoggedIn",true)
         localStorage.setItem("adminName",name)

         if(admin){   
            window.location.reload();
           
            }
        
            
        return true


        }

}


   
console.log(name,password)
console.log(admins)

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
);

}

export default Admin