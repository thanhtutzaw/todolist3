import React, { useEffect, useState } from 'react'
import { CgChevronRightR } from "react-icons/cg";
import { auth } from './Firebase/firebase';
import {signInWithPopup,GoogleAuthProvider,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

function Login() {
  const nevigate = useNavigate()

const row ={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
}
const btn = {
    padding: '.7rem',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: '5px',
    outline: 'none',
    border: '1px solid black',
    cursor: 'pointer',
    
    

    // "&:hover": {
    //     backgroundColor : 'red'
    // }

}
useEffect(() => {
  auth.onAuthStateChanged( (user)=>{
    if(user){
      nevigate('/')
    }
    
  })
}, []);
const signinHandle = () =>{
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth,provider)
    .then( (res)=>{
      nevigate('/')
        // const user = res.user
        // setuser(user)
    })
    .catch( (err)=>{
        alert(`Error! ${err.message}`)
        console.log(err)
    })
}





  return (
    <div className="main container " style={row}>
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>

      <button onClick={signinHandle} style={btn}>Google Sign-in</button>
    </div>
  )
}

export default Login