import React from "react";
import { VscAdd } from "react-icons/vsc";
function Nav({inputRef, handleSubmit, selectCount }) {
  return (
    <nav className="nav" style={{ pointerEvents: selectCount && 'none' }}>
      <form onSubmit={handleSubmit}>
      
          <input
            ref={inputRef}
            className="input-text"
            type="text"
          />
        
        
          <button
            type="submit"
            className="add-btn-parent"
          >
            <VscAdd className="add-btn" />
          </button>
        
      </form>
    </nav>
  );
}
export default Nav;
