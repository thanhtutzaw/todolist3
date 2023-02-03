import React, { useCallback } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

export const HeaderDropDown = (props) => {
  const enterTools = {
    animation: "enterTools 200ms ease-in",
  };
  const exitTools = {
    animation: "exitTools 250ms ease-out",
    // animationFillMode: "forwards",
  };
  return (
    <div
      className="dropdown"
      onAnimationEnd={() => {
        if (!props.opentools) {
          props.setmounted(false);
        }
        console.log("end dropdown");
      }}
    >
      <div
        style={props.opentools ? enterTools : exitTools}
        className={`tools `}
      >
        <div className="tools-container">
          <div
            onClick={useCallback(() => {
              props.setTheme((prev) => (prev === "light" ? "dark" : "light"));
              props.setopentools(false);
              console.log("callback running");
            }, [props.theme, props.opentools])}
            className="setting-item"
          >
            {props.theme === "light" ? <MdDarkMode /> : <MdLightMode />}
            <span>Theme</span>
          </div>
          <div className="setting-item" onClick={props.logoutHandle}>
            <RiLogoutBoxFill />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
