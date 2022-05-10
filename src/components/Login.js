import React, { useEffect, useState } from 'react'
import { CgChevronRightR } from "react-icons/cg";
import { auth } from './Firebase/firebase';
import {signInWithPopup,GoogleAuthProvider,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'
import btnImage from '../signin-assets/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png'
import GoogleLogin from 'react-google-login';


// const {login} = useAuth()



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
    border: '1px solid rgba(0,0,0,.2)',
    cursor: 'pointer',
    boxShadow: '0px 3px 3px #0000004f'
    
    

    // "&:hover": {
    //     backgroundColor : 'red'
    // }

}
//Login js
useEffect(() => {

    if(localStorage.getItem('isUsersignin') === 'true'){
      nevigate('/')
    }else{
      nevigate('/login')
    }



  auth.onAuthStateChanged( (user)=>{
    if(user){
      nevigate('/')
      localStorage.setItem('isUsersignin','true')
    }
    // else{
    //   nevigate('/login')
    // }
    
  })
}, []); 
const provider = new GoogleAuthProvider()
const signinHandle = () =>{
  console.log("hey")
 
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
          {/* <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div> */}
        </button>
      </a>

      <button onClick={signinHandle} style={btn}>Google Sign-in</button>
      {/* <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} onSuccess={signinHandle} disabledStyle={false} theme="light"></GoogleLogin> */}
    </div>
  )
}

export default Login