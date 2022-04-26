import "./App.css";
import logo from "./logo.svg";

import React, { useState } from "react";
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
  const auth = getAuth();
  onAuthStateChanged(auth, (user) =>{
    if(user){
      return setisUserSignin(true)
    }
    setisUserSignin(false)
  } )
    // if(user){
      
    // }
    // else{

    // }
  
return (
  (isUserSignin === true) ? (
    <Router>
        
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          </Routes>
          
    </Router>
  ) : (
    <Router>
        
        <Routes>
          <Route exact path="/" element={<Login />}>
          </Route>
          </Routes>
          
    </Router>
  )
)
  
    
  
  
}

export default App;
