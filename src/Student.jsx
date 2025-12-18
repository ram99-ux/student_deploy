import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {url} from './url'


function Student() {
    const [data, setdata] = useState([])
    const [student_i, setstudent_i] = useState([])
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [login, setlogin] = useState(
    localStorage.getItem("studentLoggedIn") ? true : false
);


    const org_name=sessionStorage.getItem("studentName")
    const org_password=sessionStorage.getItem("studentPassword")
    const org_id=sessionStorage.getItem("studentId")
    
    const org_email=sessionStorage.getItem("studentEmail")
    const org_department=sessionStorage.getItem("studentDepartment")


    useEffect(()=>{
        fetch();
    },[])

    const   fetch=()=>{
        axios.get(url)
        .then(res=>{
            setdata(res.data)
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const submit=(e)=>{
        e.preventDefault();

        const student=data.find((student)=>student.name===name && student.password===password,
           
    )
        if(!name || !password){
            alert("Please fill all the fields")
            return
        }
        if(data.length===0){
            alert("No Students found")
            return
        }
        else {

           
            console.log(student)
            if(!student){
                alert("Invalid Credentials")
                return
            }
            localStorage.setItem("studentLoggedIn",true)
            sessionStorage.setItem("studentName",name)
            sessionStorage.setItem("studentId",student.id)
            sessionStorage.setItem("studentEmail",student.email)
            sessionStorage.setItem("studentDepartment",student.department)  
            sessionStorage.setItem("studentPassword",password)

             setstudent_i(student)
             if(localStorage.getItem("studentLoggedIn")){

                 setlogin(true)

                 window.location.reload();

             }
             else if(!localStorage.getItem("studentLoggedIn")){
                 setlogin(false)
             }
           
            console.log(student_i)
            alert("Login Successful")
    }
    }
    const logout = () => {
    localStorage.removeItem("studentLoggedIn");
    sessionStorage.clear();
    setlogin(false);
    setname("");
    setpassword("");
    window.location.reload();
};

  return (
        <div className="student-page">

        
            {!login && (
                <>
                    <h2>Welcome Student</h2>

                    <form className="student-form" onSubmit={submit}>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />

                        <button type="submit">Login</button>
                    </form>
                </>
            )}

            {/* ------------ STUDENT PROFILE ------------ */}
            {login && (
                <div className="student-card">
                    <h5>Student ID: {org_id}</h5>
                    <h3>Name: {org_name}</h3>
                    <p>Email: {org_email}</p>
                    <p>Password: {org_password}</p>
                    <p>Department: {org_department}</p>

                    <button onClick={logout}>Log out</button>
                </div>
            )}
        </div>
    );
}


export default Student