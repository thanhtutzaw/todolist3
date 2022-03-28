import React from "react";
import profile from "../profile.webp";

function header() {
  return (
    <header>
      <div className="header-row">
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold">
            4 tasks for <span>Today</span>
          </p>
        </div>
        <div className="header-image">
          <img src={profile} alt="Profile" />
        </div>
      </div>
    </header>
  );
}

export default header;
