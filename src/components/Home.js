import React, { useEffect, useState } from 'react'

import Header from './Header';
import Todolist from './Todolist';
import Nav from './Nav';

import { CgChevronRightR } from "react-icons/cg";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import { auth } from './Firebase/firebase';


function Home() {
  const auth = getAuth()
const nevigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged( (user)=>{
      if(!user){
        nevigate('/login')
      }
    })
  }, []);

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