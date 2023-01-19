import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../lib/firebase";

export default function UpdatingModal(props) {

  return (
    <div className="closeConfirmModal">
      <p style={{ fontWeight: "500", fontSize: "22px" }}>🌟 Updating...</p>
      {/* <div>
        <button className="btn continueBtn" onClick={closeConfirm}>
          Keep editing
        </button>
        <button
          className="btn discardBtn"
          onClick={() => {
            closeConfirm();
            closeHandle();
          }}
        >
          Discard
        </button>
      </div> */}
      {/* {todo && (
        <>
          <div
            style={{
              pointerEvents: loading ? "none" : "auto",
              userSelect: loading ? "none" : "unset",
            }}
            className="editModal"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            key={todo.id}
          >
            <div
              // onSubmit={()=>{console.log("first")}}
              className="editInput"
              ref={editInput}
            >
              <textarea
                // enterKeyHint="done"
                style={{ userSelect: loading ? "none" : "unset" }}
                value={text}
                ref={inputRef}
                onChange={(e) => {
                  settext(e.target.value);
                }}
                className="textarea"
                // value={text}
              />
              <div className="editModalActions">
                <button onClick={closeHandle} className={`editCloseBtn`}>
                  Close
                </button>

                <button
                  onClick={() => {
                    updateHandle(todo.id);
                  }}
                  type="submit"
                  className="updateBtn"
                >
                  {loading ? "Updating..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </>
        // </div>
      )} */}
    </div>
  );
}
