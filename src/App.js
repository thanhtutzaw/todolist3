import "./App.css";
import React from "react";
import {
  BrowserRouter as Router, Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home.jsx";
// import { UserContext } from "./Context/UserContext";
// import { useUserData } from "./lib/hook";
import Login from "./components/Login.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
// import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  
  // const userData = useUserData()
  return (
      // <UserContext.Provider value = {userData} >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}
