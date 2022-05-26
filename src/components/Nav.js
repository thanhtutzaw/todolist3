import React from "react";
import { VscAdd } from "react-icons/vsc";

function Nav({ settext, handleSubmit, text }) {
  return (
    <nav className="nav">
      <form>
        <div>
          <input
            className="input-text"
            type="text"
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="add-btn-parent"
            onClick={handleSubmit}
          >
            <VscAdd className="add-btn" />
          </button>
        </div>
      </form>
    </nav>
  );
}

export default Nav;
