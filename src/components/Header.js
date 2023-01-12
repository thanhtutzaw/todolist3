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
  const { userphoto, userName, todoLength, selectCount } = props


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
  function handleTools(e) {
    
    // alert('')
    console.log(e.target)
    setopentools((prevstate) => !prevstate);
  }
  return (
    <header>
    {/* <header style={{ pointerEvents: selectCount && 'none' }}> */}
      <div className="header-row">
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold">
            {todoLength} tasks for <span>Today</span>
          </p>
        </div>
        <div style={{cursor:'pointer'}} onClick={handleTools}>  
          <img  className="header-image" src={userphoto && userphoto}  alt={`${userName}'s Profile`} />
          {/* <img src={userphoto} onClick={handleTools}  alt={`profile`}/> */}
        </div>
      </div>
      <div className="dropdown">
        {/* <nav className={opentools ? "nav-active" : ""}>
        </nav> */}
        {(
          <div className={`tools-parent ${opentools ? 'fadeIn' : 'fadeOut'}` }>
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
    </header>
  );
}