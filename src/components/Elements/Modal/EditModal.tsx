import { AppContext } from '@/Context/AppContext';
import { updateTodo } from '@/lib/firestore';
import { AppContextType, todosProps } from '@/types';
import { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import UpdatingModal from './UpdatingModal';

export default function EditModal(props: {
  todo: todosProps | null;
  text: string | null;
  settext: Function;
  exitWithoutSaving: boolean;
  clearSelect: Function;
  closeEditModal: Function;
  confirmModalRef: RefObject<HTMLDialogElement>;
}) {
  const [loading, setloading] = useState(false);
  const [eloading, setLoading] = useState(false);
  const UpdatingRef = useRef<HTMLDialogElement>(null);
  const { exitWithoutSaving, confirmModalRef, text, settext, todo, closeEditModal, clearSelect } =
    props;

  // const actionButtonRef = useRef(null);
  const { setisPrevent, editModalRef } = useContext(AppContext) as AppContextType;
  useEffect(() => {
    const UpdateRef = UpdatingRef.current;
    // const actionButton = actionButtonRef.current;
    if (UpdateRef) {
      loading ? UpdateRef.showModal() : UpdateRef.close();
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
      todo?.id!,
      editModalRef,
      text!,
      todo!,
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
  const closeConfirm = useCallback(() => {
    confirmModalRef.current?.close();
  }, []);
  return (
    <>
      <dialog id="confirmModal" ref={confirmModalRef}>
        <ConfirmModal closeConfirm={closeConfirm} closeEditModal={closeEditModal} />
      </dialog>
      <dialog ref={UpdatingRef} id="updating">
        <UpdatingModal />
      </dialog>
      {todo && (
        <div
          style={{
            pointerEvents: loading ? 'none' : 'auto',
            userSelect: loading ? 'none' : 'unset',
          }}
          className="container"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          key={todo.id}
        >
          <form>
            {/* {eloading&&<> */}
            <textarea
              style={{ userSelect: loading ? 'none' : 'unset' }}
              value={text || ''}
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
                  if (todo) {
                    updateHandle();
                  }
                }}
                type="submit"
                className="updateBtn"
              >
                Save
              </button>
            </div>
            {/* </>} */}
          </form>
        </div>
      )}
    </>
  );
}
