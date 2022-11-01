import React, { useContext, useEffect, useState } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = React.createContext(auth);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // const [currentUser, setcurrentUser] = useState(null);

  // useEffect(() => {
  //   onAuthStateChanged( auth , (user)=> {
  //     setcurrentUser(user)
  //   })
  //   console.log("context", currentUser)
  //   }, []);



  return <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>;
}
