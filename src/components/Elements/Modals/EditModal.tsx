import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { updateTodo } from "@/lib/firestore";
import ConfirmModal from "./ConfirmModal";
import UpdatingModal from "./UpdatingModal";

export default function EditModal(props: {
  todo: any;
  text: any;
  settext: Function;
  closeEditModal: Function;
  clearSelect: Function;
  setisPrevent: Function;
  confirmModalRef: RefObject<HTMLDialogElement>;
  editModalRef: RefObject<HTMLDialogElement>;
}) {
  const {
    confirmModalRef,
    text,
    settext,
    todo,
    closeEditModal,
    clearSelect,
    setisPrevent,
    editModalRef,
  } = props;
  // const actionButtonRef = useRef(null);
  const [loading, setloading] = useState(false);
  const UpdatingRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const Updating = UpdatingRef.current;
    // const actionButton = actionButtonRef.current;
    if (Updating) {
      loading ? Updating.showModal() : Updating.close();
    }

    // function adjustSubmitButtonPosition() {
    //   const isVirtualKeyboardOpen = window.innerHeight < window.outerHeight;

    //   actionButton.style.bottom = isVirtualKeyboardOpen ? "60px" : "0";
    // }
    // window.addEventListener("resize", adjustSubmitButtonPosition);
    // return () => {
    //   window.removeEventListener("resize", adjustSubmitButtonPosition);
    // };
  }, [loading]);

  const updateHandle = useCallback(
    updateTodo(
      todo?.id,
      editModalRef,
      text,
      todo,
      closeEditModal,
      setloading,
      setisPrevent,
      clearSelect
    ),
    [todo, text]
  );

  const inputRef = useRef(null);
  useEffect(() => {
    if (todo) {
      settext(todo.text);
    }
  }, [todo]);
  function closeConfirm() {
    confirmModalRef.current?.close();
  }
  return (
    <>
      <dialog id="confirmModal" ref={confirmModalRef}>
        <ConfirmModal
          closeConfirm={closeConfirm}
          closeEditModal={closeEditModal}
        />
      </dialog>
      <dialog ref={UpdatingRef} id="updating">
        <UpdatingModal />
      </dialog>
      {todo && (
        <div
          style={{
            pointerEvents: loading ? "none" : "auto",
            userSelect: loading ? "none" : "unset",
          }}
          className="container"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          key={todo.id}
        >
          <form>
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
                  console.log(confirmModalRef);
                  if (text !== todo.text) {
                    confirmModalRef.current?.showModal();
                  } else {
                    closeEditModal();
                  }
                }}
                className={`editCloseBtn`}
              >
                Close
              </button>

              <button
                onClick={() => {
                  if (todo.id !== "undefined") {
                    updateHandle();
                  }
                }}
                type="submit"
                className="updateBtn"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}