import React from "react";
import {VscAdd} from 'react-icons/vsc'


function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li className="add-btn-parent">
          <VscAdd className="add-btn" />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
