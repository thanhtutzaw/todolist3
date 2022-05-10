import React, { useContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../components/Firebase/firebase";
// import { auth } from './Firebase/firebase';
const AuthContext = React.createContext(auth);
// const auth = getAuth();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setcurrentUser] = useState(null);
    const provider = new GoogleAuthProvider()

    // function login (){
    //     return signInWithPopup(auth,provider)
    //     .then( (res)=>{
    //         // nevigate('/')
    //           // const user = res.user
    //           // setuser(user)
    //       })
    //       .catch( (err)=>{
    //           alert(`Error! ${err.message}`)
    //           console.log(err)
    //       })
    // }

  useEffect(() => {
    onAuthStateChanged( auth , (user)=> {
      setcurrentUser(user)
    })
      // const unsubscribe = onAuthStateChanged(auth, (user) => {
      //     setcurrentUser(user);
      //   });
      //   return unsubscribe
    }, []);
  // const value = {
  //   currentUser,
  //   login
  // };
  return <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>;
}
