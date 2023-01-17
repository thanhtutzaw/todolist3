import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
// let MdDarkMode
// import("react-icons/md").then(icon => {
//   if (icon) {
//     MdDarkMode = icon.MdDarkMode
//   }
//   console.log(MdDarkMode)
// })

export default function header(props) {
  const { userphoto, userName, todoLength } = props


  const [opentools, setopentools] = useState(false);

  const auth = getAuth()
  // const user = auth.currentUser

  // let displayName;
  // if(user){
  //   displayName = user.displayName
  // }

  // const user = auth.currentUser
  // let userName
  // if(user){
  //   userName = user.displayName
  // }

  const nevigate = useNavigate()

  const logoutHandle = () => {
    signOut(auth)
      .then(() => {
        nevigate('/login')
      })
      .catch((err) => {
        alert("Error signout ! ", err.message)
      })
  }
  function handleTools(e) {
    console.log(e.target)
    setopentools((prevstate) => !prevstate);
  }
  return (
    <>
      <header>
        {/* <header style={{ pointerEvents: selectCount && 'none' }}> */}
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold">
            {todoLength} tasks for <span>Today</span>
          </p>
        </div>
        <div style={{ cursor: 'pointer' }} onClick={handleTools}>
          {userName ? (<img className="header-image" src={userphoto && userphoto} alt={userName ? `${userName}'s Profile` : ''} />) : (<img alt="testUser Profile" className="header-image" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>)}
        </div>
      </header>
      <div className="dropdown">
        {(
          <div className={`tools ${opentools ? 'open' : 'close'}`}>
            <div className="tools-container">
              <div className="setting-item" >
                <MdDarkMode />
                {/* <MdDarkMode className="edit-btn" /> */}
                <span>Theme</span>
              </div>
              <div className="setting-item" onClick={logoutHandle}>
                <RiLogoutBoxFill />
                {/* <RiLogoutBoxFill className="delte-btn" /> */}
                <span>Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}