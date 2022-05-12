import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { db } from "./Firebase/firebase";

function Nav({settext,handleSubmit,text}) {
  
  return (
    <nav className="nav">
      <div>
      <input className="input-text" type="text" value={text} onChange={(e)=>{settext(e.target.value)}}/>
      </div>
      <div>
      <button className="add-btn-parent" onClick={handleSubmit}>
        <VscAdd className="add-btn" />
      </button>
      </div>
    </nav>
  );
}

export default Nav;
