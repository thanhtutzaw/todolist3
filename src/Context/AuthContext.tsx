import { PropsWithChildren, createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setcurrentUser] = useState(null);
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (user) => {
  //     setcurrentUser(user)
  //   })
  //   return unSubscribe;
  // }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
