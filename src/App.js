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
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home";
import Login from "./components/Login";


function App() {
  const [isUserSignin, setisUserSignin] = useState(true);
  const [currentUser, setcurrentUser] = useState();

  const auth = getAuth();

    useEffect(() => {
      onAuthStateChanged(auth, (user) =>{
        if(user){
          setcurrentUser(user)
          return setisUserSignin(true)
        }
        setisUserSignin(false)
      } )
    }, []);

    // if(user){
      
    // }
    // else{

    // }
  
return (
  isUserSignin ? (
    <Router>
        
        <Routes>
          <Route  path="/" element={<Home />}>
          </Route>
          </Routes>
          
    </Router>
  ) : (
    <Router>
        
        <Routes>
          <Route  path="/" element={<Login />}>
          </Route>
          </Routes>
          
    </Router>
  )
)
  
    
  
  
}

export default App;
