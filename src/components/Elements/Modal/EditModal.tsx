import { AppContext } from '@/Context/AppContext';
import { updateTodo } from '@/lib/firestore';
import { AppContextType, todosProps } from '@/types';
import { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import UpdatingModal from './UpdatingModal';
import Dialog from './Dialog';

export default function EditModal(props: {
  todo: todosProps | null;
  label: string | null;
  setlabel: Function;
  text: string | null;
  settext: Function;
  exitWithoutSaving: boolean;
  clearSelect: Function;
  closeEditModal: Function;
  confirmModalRef: RefObject<HTMLDialogElement>;
}) {
  const [loading, setloading] = useState(false);
  const UpdatingRef = useRef<HTMLDialogElement>(null);
  const {
    label,
    setlabel,
    exitWithoutSaving,
    confirmModalRef,
    text,
    settext,
    todo,
    closeEditModal,
    clearSelect,
  } = props;

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
      label!,
      text!,
      todo!,
      closeEditModal,
      setloading,
      setisPrevent,
      clearSelect
    ),
    [todo, text, label]
  );

  const inputRef = useRef(null);
  useEffect(() => {
    if (todo) {
      settext(todo.text);
    }
  }, [todo]);
  const closeConfirm = useCallback(() => {
    console.log('keep editing');
    confirmModalRef.current?.close();
  }, []);
  function close() {
    if (exitWithoutSaving) {
      confirmModalRef.current?.showModal();
      // console.log('confirm update');
    } else {
      closeEditModal();
      console.log('close edit');
    }
  }
  const { labels } = useContext(AppContext) as AppContextType;
  return (
    <>
      <Dialog id="confirmModal" ref={confirmModalRef}>
        <ConfirmModal closeConfirm={closeConfirm} closeEditModal={closeEditModal} />
      </Dialog>
      <Dialog id="updating" ref={UpdatingRef}>
        <UpdatingModal />
      </Dialog>
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
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  if (value !== '') {
                    setlabel(e.target.value);
                    // console.log(label);
                  }
                }}
              >
                <option value="">Change Label</option>
                {labels.map((l) => (
                  <>
                    <option value={l.id.toString()}>{l.text}</option>
                  </>
                ))}
              </select>
              <button onClick={close} className="editCloseBtn">
                Close
              </button>
              <button
                disabled={loading}
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
          </form>
        </div>
      )}
    </>
  );
}
