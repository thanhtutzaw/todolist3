import "./App.css";
import logo from "./logo.svg";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";

import Todolist from "./components/Todolist";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  // const nevigate = useNavigate()
  // const [isUserSignin, setisUserSignin] = useState(true);
  const [currentUser, setcurrentUser] = useState();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // nevigate('/')
        // setcurrentUser(user);
        // return setisUserSignin(true);
      }
      // setisUserSignin(false);
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
