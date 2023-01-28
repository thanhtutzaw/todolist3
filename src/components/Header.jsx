import { getAuth, signOut } from "firebase/auth";
import React, { Suspense, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useIndexDB from "../hooks/useIndexDB";
import useTheme from "../hooks/useTheme";
import { HeaderDropDown } from "./HeaderDropDown";
// const HeaderDropDown = React.lazy(() => import("./HeaderDropDown"));
// const renderLoader = () => <p>Loading...</p>;
export default function Header(props) {
  const { selecting, todoLength } = props;
  const { userphoto, userName } = useIndexDB();
  const { theme, setTheme } = useTheme();

  const [opentools, setopentools] = useState(false);
  const [mounted, setmounted] = useState(false);

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

  const navigate = useNavigate();

  const logoutHandle = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        alert("Signout Error ! ", err.message);
        console.error("Signout Error ! ", err.message);
      });
  };
  const handleTools = () => {
    if (!mounted) setmounted(true);
    setopentools((prevstate) => !prevstate);
    console.log({ mounted });
    console.log({ opentools });
  };
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
      {/* <Suspense fallback={renderLoader()}> */}
      {mounted && (
        <HeaderDropDown
          mounted={mounted}
          setmounted={setmounted}
          theme={theme}
          setTheme={setTheme}
          opentools={opentools}
          setopentools={setopentools}
          logoutHandle={logoutHandle}
        ></HeaderDropDown>
      )}
      {/* </Suspense> */}
    </>
  );
}
