import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setcurrentUser] = useState();
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (currentUser !== null) {
  //     navigate('/')
  //   } else {
  //     navigate('/login')
  //   }
  // }, [currentUser]);
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (user) => {
  //     setcurrentUser(user)
  //   })
  //   return unSubscribe;
  // }, []);
  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}