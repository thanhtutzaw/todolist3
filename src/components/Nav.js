import React from "react";
import { VscAdd } from "react-icons/vsc";

function Nav({input,setinput, setisPrevent, inputRef, handleSubmit ,selectCount }) {
  return (
    <nav className="nav" style={{ pointerEvents: selectCount && 'none' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
          ref={inputRef}
            className="input-text"
            type="text"
            // onChange={setisPrevent(true)}
            // onChange={()=>console.log("ehy")}
            // value={input}
            // onChange={(e) => setisPrevent(true)}
            // onChange={(e)=>{setinput(e.target.value); }}
            // onChange={(e)=>{setinput(e.target.value); if(e.target.value !== ''){setisPrevent(true)}else{setisPrevent(false)}}}
            // value={text}
            // onChange={(e) => {
            //   settext(e.target.value);
            // }}
            // onChange={()=>{setisPrevent(true)}}
          />
        </div>
        <div>
          <button
            type="submit"
            className="add-btn-parent"
            
            
          >
            <VscAdd className="add-btn" />
          </button>
        </div>
      </form>
    </nav>
  );
}

export default Nav;
