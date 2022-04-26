import { setUserId } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState,useEffect } from "react";
import profile from "../profile.webp";



function header(props) {
const [userphoto, setuserphoto] = useState();

const auth = getAuth()
const logoutHandle = () => {

  
  signOut(auth)
  .then( ()=>{
  })
  .catch( (err) => {
    console.log(err)
  })
}

useEffect(() => {
  onAuthStateChanged( auth , (user)=>{
    setuserphoto(user.photoURL)
})

}, []);


  return (
    <header>
      <div className="header-row">
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold">
            4 tasks for <span>Today</span>
          </p>
        </div>
        <div className="header-image">
          <img  src={userphoto} alt="Profile" onClick={logoutHandle}/>
        </div>
      </div>
    </header>
  );
}

export default header;
