import React, { useEffect, useState } from 'react'

import Header from './Header';
import Todolist from './Todolist';
import Nav from './Nav';

import { CgChevronRightR } from "react-icons/cg";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './Firebase/firebase';



function Home() {




  


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