import { setUserId } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState,useEffect } from "react";
import profile from "../profile.webp";
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

function header(props) {
const [userphoto, setuserphoto] = useState();
const [opentools, setopentools] = useState(false);


const auth = getAuth()
const nevigate = useNavigate()
// const user = auth.currentUser
useEffect(() => {
  onAuthStateChanged( auth , (user)=>{
    if (user) {

      const photoURL = user.photoURL;
      console.log(photoURL)
      setuserphoto(photoURL)

    
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
    // if (user !== null) {
    //   // alert('user exist')
    //   // The user object has basic properties such as display name, email, etc.
    //   const displayName = user.displayName;
    //   const email = user.email;
    //   const photoURL = user.photoURL;
    //   console.log(photoURL)
    //   setuserphoto(photoURL)
    //   const emailVerified = user.emailVerified;
    
    //   // The user's ID, unique to the Firebase project. Do NOT use
    //   // this value to authenticate with your backend server, if
    //   // you have one. Use User.getToken() instead.
    //   const uid = user.uid;
    // }
  })
}, []);
// useEffect(() => {
//   onAuthStateChanged( auth , (user)=>{
//     user ? setuserphoto(user.photoURL) : setuserphoto()
//     // setuserphoto(user.photoURL)
//   })
// }, []);


const logoutHandle = () => {

  
  signOut(auth)
  .then( ()=>{
    nevigate('/login')
  })
  .catch( (err) => {
    console.log(err)
  })
}

const handleTools = () => {
  setopentools((prevstate) => !prevstate);
}

  


  return (
    <header>
      <div className="header-row">
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold">
            {props.todoLength} tasks for <span>Today</span>
          </p>
        </div>
        <div className="header-image">
          {/* <img  src={userphoto} srcSet={`${userphoto} 1x , ${userphoto} 2x`}  onClick={logoutHandle}/> */}
          <img src={userphoto} onClick={handleTools}  />


        </div>
      </div>
        <div className="dropdown">
        <nav className={opentools ? "nav-active" : ""}>
          {/* <div className="nav-icon-parent" onClick={}>
            <MdModeEdit className="nav-icon" />
          </div> */}
        </nav>

        {opentools && (
          <div className="tools-parent">
            <div className="tools-container">
              <div  className="edit-parent" >
                <MdDarkMode className="edit-btn" />
                <span>Theme</span>
              </div>
              <div  className="delete-parent" onClick={logoutHandle}>
                <RiLogoutBoxFill className="delte-btn" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default header;
