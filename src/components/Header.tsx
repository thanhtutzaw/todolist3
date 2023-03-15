import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useIndexDB from "@/hooks/useIndexDB";
import useTheme from "@/hooks/useTheme";
import { HeaderDropDown } from "./HeaderDropDown";
export default function Header(props: {
  selecting: boolean;
  todoLength: number;
}) {
  const { selecting, todoLength } = props;
  const { userphoto, userName } = useIndexDB();
  const { theme, setTheme } = useTheme();

  const [opentools, setopentools] = useState(false);
  const [mounted, setmounted] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const logoutHandle = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        // alert("Signout Error ! ", err);
        console.error("Signout Error ! ", err.message);
      });
  };
  const handleTools = () => {
    if (!mounted) setmounted(true);
    setopentools((prevstate) => !prevstate);
  };
  return (
    <>
      <header style={{ paddingTop: selecting ? "2rem" : "" }}>
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
      {mounted && (
        <HeaderDropDown
          setmounted={setmounted}
          theme={theme}
          setTheme={setTheme}
          opentools={opentools}
          setopentools={setopentools}
          logoutHandle={logoutHandle}
        ></HeaderDropDown>
      )}
    </>
  );
}
