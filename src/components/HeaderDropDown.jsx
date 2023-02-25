import React, { useCallback } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

export const HeaderDropDown = (props) => {
  const { setmounted, theme, setTheme, opentools, setopentools, logoutHandle } =
    props;
  const enterTools = {
    animation: "enterTools 300ms ease-in",
  
  };
  const exitTools = {
    animation: "exitTools 500ms ease-in",
  
  };
  return (
    <div
      className="dropdown"
      onAnimationEnd={() => {
        if (!opentools) {
          setmounted(false);
        }
        console.log("unmount dropdown");
      }}
    >
      <div style={opentools ? enterTools : exitTools} className={`tools `}>
        <div className="tools-container">
          <div
            onClick={useCallback(() => {
              setTheme((prev) => (prev === "light" ? "dark" : "light"));
              setopentools(false);
              // console.log("callback running");
            }, [theme, opentools])}
            className="setting-item"
          >
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
            <span>Theme</span>
          </div>
          <div className="setting-item" onClick={logoutHandle}>
            <RiLogoutBoxFill />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
