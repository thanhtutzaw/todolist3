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
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [Auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "ture"
  );
  // const [isUserSignin, setisUserSignin] = useState(true);
  // const [currentUser, setcurrentUser] = useState();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // if(localStorage.getItem('isUsersignin') === 'true'){
      //   nevigate('/')
      // }
      // else{
      //   nevigate('/login')
      // }

      if (user) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
      }
    });
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // nevigate('/')
  //       // setcurrentUser(user);
  //       // return setisUserSignin(true);
  //     }
  //     // setisUserSignin(false);
  //   });
  // }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* {Auth ? (<Route path="/" element={<Home />} />)
          : (<Route path="/login" element={<Login />} />)} */}
          
           
          <Route path="/" element={<Home Auth={Auth}/>} />
          

          <Route path="/login" element={<Login />} />
      
          
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
