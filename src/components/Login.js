import React, { useState } from 'react'
import { CgChevronRightR } from "react-icons/cg";
import { auth } from './Firebase/firebase';
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
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
    
    

    "&:hover": {
        backgroundColor : 'red'
    }

}



const signinHandle = () =>{
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth,provider)
    .then( (res)=>{
        // const user = res.user
        // setuser(user)
    })
    .catch( (err)=>{
        console.log(err)
    })
}


function Login() {
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