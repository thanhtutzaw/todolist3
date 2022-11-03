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
  const { userphoto, todoLength, selectCount } = props
  

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
        console.log("signout", err)
      })
  }
  const handleTools = () => {
    setopentools((prevstate) => !prevstate);
  }
  return (
    <header style={{ pointerEvents: selectCount && 'none' }}>
      <div className="header-row">
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold"> 
            {todoLength} tasks for <span>Today</span>
          </p>
        </div>
        <div className="header-image">
          <img src={userphoto && userphoto} onClick={handleTools} alt={`profile`} />
          {/* <img src={userphoto} onClick={handleTools}  alt={`profile`}/> */}
        </div>
      </div>
      <div className="dropdown">
        <nav className={opentools ? "nav-active" : ""}>
        </nav>
        {opentools && (
          <div className="tools-parent">
            <div className="tools-container">
              <div className="edit-parent" >
                <MdDarkMode className="edit-btn" />
                <span>Theme</span>
              </div>
              <div className="delete-parent" onClick={logoutHandle}>
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