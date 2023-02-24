import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../lib/firebase";
import ConfirmModal from "./ConfirmModal";
import UpdatingModal from "./UpdatingModal";

export default function EditModal(props) {
  const {
    text,
    settext,
    todo,
    editInput,
    closeHandle,
    clearSelect,
    setisPrevent,
  } = props;
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (loading) {
      document.getElementById("updating").showModal();
    } else {
      document.getElementById("updating").close();
    }
  }, [loading]);

  const updateHandle = async (id) => {
    const collectionRef = doc(db, "users", auth.currentUser.uid, "todos", id);
    const data = {
      ...todo,
      text,
    };
    if (text !== todo.text) {
      console.info("%cUpdating...", "color:grey");
      setloading(true);

      setisPrevent(true);
      try {
        await updateDoc(collectionRef, data);
        document.getElementById("editModal").close();
        console.info("%cUpdated ✔️", "color:green");
        setloading(false);
        clearSelect();
        setisPrevent(false);
      } catch (error) {
        alert("Update Error ! " + error.message);
      }
    } else {
      closeHandle();
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (todo) {
      settext(todo.text);
    }
  }, [todo]);
  function closeConfirm() {
    const confirmModal = document.querySelector("#confirmModal");
    confirmModal.close();
  }
  return (
    <>
      <dialog id="confirmModal">
        <ConfirmModal closeConfirm={closeConfirm} closeHandle={closeHandle} />
      </dialog>
      <dialog id="updating">
        <UpdatingModal />
      </dialog>
      {todo && (
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
          <div className="editInput" ref={editInput}>
            <textarea
              style={{ userSelect: loading ? "none" : "unset" }}
              value={text}
              ref={inputRef}
              onChange={(e) => {
                settext(e.target.value);
              }}
              className="textarea"
            />
            <div className="editModalActions">
              <button
                onClick={() => {
                  if (text !== todo.text) {
                    document.getElementById("confirmModal").showModal();
                  } else {
                    closeHandle();
                  }
                }}
                className={`editCloseBtn`}
              >
                Close
              </button>

              <button
                onClick={() => {
                  updateHandle(todo.id);
                }}
                type="submit"
                className="updateBtn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
