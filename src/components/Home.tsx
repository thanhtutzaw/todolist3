import { AppContext } from '@/Context/AppContext';
import DeleteModal from '@/components/Elements/Modal/DeleteModal';
import SelectModal from '@/components/Elements/Modal/SelectModal';
import useFirestoreData from '@/hooks/useFirestoreData';
import useSelect from '@/hooks/useSelect';
import { auth } from '@/lib/firebase';
import { addTodo } from '@/lib/firestore';
import { AppContextType } from '@/types';
import Button from '@Elements/Button/Button';
import { onAuthStateChanged } from 'firebase/auth';

import React, {
  FormEventHandler,
  MouseEvent,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CgChevronRightR } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import Header from './Header';
import { RenderTodoList } from './RenderTodoList';
import Toast from './Toast';
const EditModal = React.lazy(() => import('@/components/Elements/Modal/EditModal'));

const renderLoader = () => <p>Loading...</p>;
export default function Home() {
  const navigate = useNavigate();
  const todoRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const confirmModalRef = useRef<HTMLDialogElement>(null);

  const [EditModalMounted, setEditModalMounted] = useState(false);
  const [SelectModalMounted, setSelectModalMounted] = useState(false);

  const { DeleteModalMounted, editModalRef, setisPrevent} = useContext(
    AppContext
  ) as AppContextType;
  const { todos, settodos } = useFirestoreData();
  // const { isPrevent, setisPrevent } = usePrevent();
  const { SelectedID, setSelectedID, selectCount, setselectCount, clearSelect, selectAll } =
    useSelect(todos);

  // const pendingOps = new Set();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await addTodo(todoRef, inputRef, settodos, todos, setisPrevent);
    },
    [todos]
  );

  // const intervalRef = useRef<number | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const selecting = selectCount && SelectedID.length !== 0;

  useEffect(() => {
    const selecting = selectCount && SelectedID.length !== 0;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        clearSelect();
        setisPrevent(false);
      }
    }
    if (selecting) {
      setEditModalMounted(true);
      setSelectModalMounted(true);
      window.addEventListener('keyup', handleEscape);
    } else {
      setTimeout(() => {
        setSelectModalMounted(false);
      }, 200);
    }
    return () => {
      if (selecting) {
        window.removeEventListener('keyup', handleEscape);
      }
    };
  }, [selecting, SelectModalMounted]);

  const todo = todos !== null ? todos?.find((t) => t?.id === SelectedID.toString()) : null;

  const [text, settext] = useState(todo?.text);

  function closeEditModal() {
    editModalRef.current?.close();
    if (todo) {
      settext(todo.text);
    }
  }
  function openEditModal() {
    editModalRef.current?.showModal();
  }
  function confirmEditModal(e: MouseEvent<HTMLDialogElement>) {
    const dialog = document.querySelector('dialog');
    if (e.target === dialog) {
      if (text !== todo?.text) {
        confirmModalRef.current?.showModal();
      } else {
        closeEditModal();
      }
    }
  }

  return (
    <main>
      <Toast todoRef={todoRef} SelectedID={SelectedID} clearSelect={clearSelect} />
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <Button className="btn">
          <CgChevronRightR />
        </Button>
      </a>
      {SelectModalMounted && (
        <SelectModal
          openEditModal={openEditModal}
          clearSelect={clearSelect}
          SelectedID={SelectedID}
          selecting={selecting}
        />
      )}

      {EditModalMounted && (
        <dialog onClick={confirmEditModal} id="editModal" ref={editModalRef}>
          <Suspense fallback={renderLoader()}>
            <EditModal
              confirmModalRef={confirmModalRef}
              text={text}
              settext={settext}
              clearSelect={clearSelect}
              closeEditModal={closeEditModal}
              todo={todo}
            />
          </Suspense>
        </dialog>
      )}
      {DeleteModalMounted && <DeleteModal SelectedID={SelectedID} />}

      <Header selecting={selecting} todoLength={todos?.length} />

      <div className="selectionContainer">
        {SelectedID.length === 1 && selectCount && <button onClick={selectAll}>Select All</button>}
        {SelectedID.length >= 2 && <button onClick={clearSelect}>Deselect All</button>}
      </div>

      <section className={`todo-parent row`}>
        <RenderTodoList
          todoRef={todoRef}
          selectCount={selectCount}
          setselectCount={setselectCount}
          SelectedID={SelectedID}
          setSelectedID={setSelectedID}
        />
      </section>

      <BottomNav selectCount={selectCount} inputRef={inputRef} handleSubmit={handleSubmit} />
    </main>
  );
}
