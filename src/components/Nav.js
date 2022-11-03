import React from "react";
import { VscAdd } from "react-icons/vsc";

function Nav({ inputRef, handleSubmit ,selectCount }) {
  return (
    <nav className="nav" style={{ pointerEvents: selectCount && 'none' }}>
      <form>
        <div>
          <input
          ref={inputRef}
            className="input-text"
            type="text"
            // value={text}
            // onChange={(e) => {
            //   settext(e.target.value);
            // }}
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
