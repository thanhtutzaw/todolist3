import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../lib/firebase";

export default function EditModal(props) {
  const { todo, clearSelect, editInput } = props;
  const [text, settext] = useState(todo && todo.text);
  const [loading, setloading] = useState(false);
  // const isUpdating = text && text !== todo.text

  // useEffect(() => {
  //   console.log(isUpdating);
  // }, [text]);

  const updateHandle = async (id) => {
    const collectionRef = doc(db, "users", auth.currentUser.uid, "todos", id);
    // console.log(inputRef.current.value);
    // console.log(text);
    const data = {
      ...todo,
      text,
    };
    if (text !== todo.text) {
      console.info("%cUpdating...", "color:grey");
      setloading(true);
      try {
        await updateDoc(collectionRef, data);
        document.getElementById("editModal").close();
        console.info("%cUpdated ✔️", "color:green");
        setloading(false);
        clearSelect();
      } catch (error) {
        alert("Update Error ! " + error.message);
      }
    } else {
      closeHandle();
    }
    // settext("");
  };
  function closeHandle() {
    document.getElementById("editModal").close();
    if (todo) {
      settext(todo.text);
    }
  }
  const inputRef = useRef(null);
  useEffect(() => {
    if (todo) {
      settext(todo.text);
    }
  }, [todo]);
  return (
    <>
      {todo && (
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
      )}
    </>
  );
}
