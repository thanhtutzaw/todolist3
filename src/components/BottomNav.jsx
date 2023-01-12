import React from "react";
import { VscAdd } from "react-icons/vsc";

export default function BottomNav({ inputRef, handleSubmit, selectCount }) {
  return (
    <nav className="nav" style={{ pointerEvents: selectCount && "none" }}>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} className="input-text" type="text" />

        <button type="submit" className="add-btn-parent">
          <VscAdd className="add-btn" />
        </button>
      </form>
    </nav>
  );
}
