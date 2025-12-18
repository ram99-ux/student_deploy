import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {url} from './url'


function Home() {
    const navigate=useNavigate()
    const [data, setdata] = useState([])
    const [ids, setids] = useState()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [department, setdepartment] = useState('')
    const [text, settext] = useState(true)
    const [cancel, setcancel] = useState(false)
    
    useEffect(() => {
        read();
    }, []);
    
    const read = () => {
        axios.get(url)
        .then(res => {
            console.log(res.data)
            setdata(res.data)
        })
        .catch(err => console.log(err))
    }

    const post = async () => {
        axios.post(url, {
            id: data.length + 1,
            name,
            email,
            password,
            department
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        settext(true);
        setname('');
        setemail('');
        setpassword('');
        setdepartment('');
        setTimeout(() => {
            read();
        }, 500);
    }

    const edit = (item) => {
        setname(item.name)
        setemail(item.email)
        setpassword(item.password)
        setdepartment(item.department)
        setids(item.id)
        settext(false)
        setcancel(true)
    }

    const update = async (ids) => {
        if(!window.confirm("Are you sure you want to update this student?")) {
            return;
        }
        axios.put(`${url}/${ids}`, {
            name,
            email,
            password,
            department
        })
        .then(res => console.log(res))
        .then(settext(true))
        .then(setname(''))    
        .then(setemail(''))
        .then(setpassword(''))
        .then(setdepartment(''))
        .then(setcancel(false))
        .catch(err => console.log(err))
        

        setTimeout(() => {
            read();
        }, 500);
        
    }

    const remove = async (id) => {
        if(!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }
        const parsedId = parseInt(id);
        axios.delete(`${url}/${parsedId}`)
        .then(res => console.log(res))
    
        .catch(err => console.log(err))

        setTimeout(() => {
            read();
        }, 500);

      
    }     
    const canceled = () => {
        settext(true);
        setname('');    
        setemail('');
        setpassword('');
        setdepartment('');
        setcancel(false);
    }
    
    const logout = () => {
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminName");
        navigate('/');
        // window.location.reload();
    }
    
    return (
        <div className="home">
          <div className="home-inner">
            
            {/* Form section */}

        <h3>User : {localStorage.getItem("adminName")}</h3>
        <h4>Login Succesfull</h4>

            <div className="card form-card">
                <h2 className="card-title">
                    {text ? 'Add Student' : 'Update Student'}
                </h2>

                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e)=>setname(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e)=>setemail(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e)=>setpassword(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <input 
                        type="text" 
                        value={department} 
                        onChange={(e)=>setdepartment(e.target.value)} 
                    />
                </div>

                <button 
                    className="btn primary-btn"
                    onClick={() => (text ? post() : update(ids))}
                >
                    {text ? "Add Student" : "Update"}
                </button>

               {cancel &&
                <button className='btn primary-btn' onClick={()=>canceled()}>
                    Cancel
                </button>
               }

               <button className='btn primary-btn' onClick={logout}>Logout</button>

            </div>

            {/* List section */}
            <div className="card list-card">
                <h2 className="card-title">Students</h2>

                <div className="students-list">
                    {data.map((item)=>(
                        <div className="student-card" key={item._id}>
                            <div className="student-main">
                                <p><span>Name:</span> {item.name}</p>
                                <p><span>Email:</span> {item.email}</p>
                                <p><span>Password:</span> {item.password}</p>
                                <p><span>Department:</span> {item.department}</p>
                            </div>
                            <div className="student-actions">
                                <button 
                                    className="btn small-btn"
                                    onClick={()=>edit(item)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn small-btn danger-btn"
                                    onClick={()=>remove(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
    )
}

export default Home
