import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "./url";

function Student({ setStudentLoggedIn }) {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const loggedIn = localStorage.getItem("studentLoggedIn") === "true";

  useEffect(() => {
    axios.get(url)
      .then(res => setData(res.data))
      .catch(console.log);
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if (!name || !password) {
      alert("Please fill all fields");
      return;
    }

    const student = data.find(
      s => s.name === name && s.password === password
    );

    if (!student) {
      alert("Invalid Credentials");
      return;
    }

    // ✅ Store session data
    localStorage.setItem("studentLoggedIn", "true");
    sessionStorage.setItem("studentName", student.name);
    sessionStorage.setItem("studentId", student.id);
    sessionStorage.setItem("studentEmail", student.email);
    sessionStorage.setItem("studentDepartment", student.department);

    // ✅ IMPORTANT
    setStudentLoggedIn(true);
    navigate("/student");
  };

  const logout = () => {
    localStorage.removeItem("studentLoggedIn");
    sessionStorage.clear();

    setStudentLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="student-page">
      {!loggedIn ? (
        <>~
          <h2>Welcome Student</h2>

          <form className="student-form" onSubmit={submit}>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <div className="student-card">
          <h5>ID: {sessionStorage.getItem("studentId")}</h5>
          <h3>Name: {sessionStorage.getItem("studentName")}</h3>
          <p>Email: {sessionStorage.getItem("studentEmail")}</p>
          <p>Department: {sessionStorage.getItem("studentDepartment")}</p>

          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Student;
