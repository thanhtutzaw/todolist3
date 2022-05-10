import React, { useEffect, useState } from 'react'

import Header from './Header';
import Todolist from './Todolist';
import Nav from './Nav';

import { CgChevronRightR } from "react-icons/cg";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// import { auth } from './Firebase/firebase';

// Home js
function Home() {
  // const [redirect, setredirect] = useState(null);
  const auth = getAuth()
const nevigate = useNavigate()
useEffect(() => {
  if(localStorage.getItem('isUsersignin') === 'true'){
    nevigate('/')
  }else{
    nevigate('/login')
  }
}, []);
  // useEffect(() => {
    onAuthStateChanged( auth,(user)=>{
      if(!user){
       nevigate('/login')
       localStorage.setItem('isUsersignin','false')
        // setredirect("/login");
      }
    })
  // }, []);
  // if (redirect) {
  //  nevigate(redirect)
  // }

  return (
    <div className="main container ">
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>

      <Header />

      <Todolist />

      <Nav />
    </div>
  )
}

export default Home