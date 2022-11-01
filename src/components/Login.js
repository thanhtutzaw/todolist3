import React, { useEffect } from "react";
import { CgChevronRightR } from "react-icons/cg";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
// const {login} = useAuth()

export default function Login() {
  const nevigate = useNavigate();

  const row = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const btn = {
    padding: ".7rem",
    color: "black",
    backgroundColor: "white",
    borderRadius: "5px",
    outline: "none",
    border: "1px solid rgba(0,0,0,.1)",
    cursor: "pointer",
    boxShadow: "0px 2px 20px #0000001f",

    // "&:hover": {
    //     backgroundColor : 'red'
    // }
  };
  useEffect(() => {
    // if (localStorage.getItem("isUsersignin") === "true") {
    //   nevigate("/");
    // } else {
    //   nevigate("/login");
    // }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     nevigate("/");
    //     localStorage.setItem("isUsersignin", "true");
    //   }
    // });
  }, []);

  const provider = new GoogleAuthProvider();

  const signinHandle = () => {

    signInWithPopup(auth, provider)
      .then((res) => {
        nevigate("/");
      })
      .catch((err) => {
        alert(`Error! ${err.message}`);
        console.log(err);
      });
  };

  return (
    <div className="main container " style={row}>
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>

      <button onClick={signinHandle} style={btn}>
        Google Sign-in
      </button>
    </div>
  );
}

