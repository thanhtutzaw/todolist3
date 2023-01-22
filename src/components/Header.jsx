import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import useIndexDB from "../hooks/useIndexDB";
// let MdDarkMode
// import("react-icons/md").then(icon => {
//   if (icon) {
//     MdDarkMode = icon.MdDarkMode
//   }
//   console.log(MdDarkMode)
// })

export default function header(props) {
  const { selecting, todoLength } = props;
  const {userphoto, userName} = useIndexDB();

  const [opentools, setopentools] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

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

  const nevigate = useNavigate();

  const logoutHandle = () => {
    signOut(auth)
      .then(() => {
        nevigate("/login");
      })
      .catch((err) => {
        alert("Error signout ! ", err.message);
      });
  };
  function handleTools(e) {
    console.log(e.target);
    setopentools((prevstate) => !prevstate);
  }
  return (
    <>
      <header style={{ paddingTop: selecting ? "2.2rem" : "" }}>
        {/* <header style={{ pointerEvents: selectCount && 'none' }}> */}
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold">
            {todoLength} tasks for <span>Today</span>
          </p>
        </div>
        <div className="profile" onClick={handleTools}>
          {userName && (
            <img
              className="header-image"
              src={userphoto && userphoto}
              alt={userName ? `${userName}'s Profile` : ""}
            />
          )}
          {user && user.email === "testuser11@gmail.com" && (
            <img
              alt="testUser Profile"
              className="header-image"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            ></img>
          )}
        </div>
      </header>
      <div className="dropdown">
        {
          <div className={`tools ${opentools ? "open" : "close"}`}>
            <div className="tools-container">
              <div className="setting-item">
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
        }
      </div>
    </>
  );
}