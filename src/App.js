import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Admin from "./Admin";
import Home from "./Home";
import Student from "./Student";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const [studentLoggedIn, setStudentLoggedIn] = useState(
    localStorage.getItem("studentLoggedIn") === "true"
  );

  return (
    <Router>
      {/* Show header only if no one is logged in */}
      {!adminLoggedIn && !studentLoggedIn && <Header />}

      <Routes>
        {/* Landing page → Student Login */}
        <Route
          path="/"
          element={<Student setStudentLoggedIn={setStudentLoggedIn} />}
        />

        {/* ✅ ADMIN LOGIN PAGE */}
        <Route
          path="/admin"
          element={
            adminLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Admin setAdminLoggedIn={setAdminLoggedIn} />
            )
          }
        />

        {/* ✅ ADMIN HOME */}
        <Route
          path="/home"
          element={
            adminLoggedIn ? (
              <Home setAdminLoggedIn={setAdminLoggedIn} />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        {/* ✅ STUDENT PROFILE */}
        <Route
          path="/student"
          element={
            studentLoggedIn ? (
              <Student setStudentLoggedIn={setStudentLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
