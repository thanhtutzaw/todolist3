import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

export default function header(props) {

  const [opentools, setopentools] = useState(false);

  const auth = getAuth()

  const nevigate = useNavigate()

  const logoutHandle = () => {
    signOut(auth)
      .then(() => {
        nevigate('/login')
      })
      .catch((err) => {
        console.log("signout",err)
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
          <img src={props.userphoto} onClick={handleTools} alt={props.userName} />
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