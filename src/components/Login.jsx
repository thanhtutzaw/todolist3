import React, { useEffect } from "react";
import { CgChevronRightR } from "react-icons/cg";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export default function Login() {
  const navigate = useNavigate();

  // const row = {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // };
  const btn = {
    padding: ".7rem",
    color: "white",
    backgroundColor: "#007af6",
    borderRadius: "5px",
    outline: "none",
    border: "1px solid rgba(0,0,0,.1)",
    cursor: "pointer",
    boxShadow: "0px 2px 20px #0000001f",
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%, -50%)",
    wordBreak: "break-word",
    whiteSpace: "nowrap",
  };
  useEffect(() => {
    // if (localStorage.getItem("isUsersignin") === "true") {
    //   navigate("/");
    // } else {
    //   navigate("/login");
    // }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     navigate("/");
    //     localStorage.setItem("isUsersignin", "true");
    //   }
    // });
  }, []);

  const provider = new GoogleAuthProvider();

  const signinHandle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert(`Cannot Signin ! ${err.message}`);
      });
  };
  const email = "testuser11@gmail.com";
  const password = "111111";
  const testUserSignInHandle = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert(`Cannot Signin ! ${err.message}`);
      });
  };
  return (
    <main>
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>
      <button onClick={signinHandle} style={btn}>
        Google Sign-in
      </button>
      <br></br>
      <div
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={testUserSignInHandle}
      >
        <p>Sign in as testUser</p>
      </div>
    </main>
  );
}
