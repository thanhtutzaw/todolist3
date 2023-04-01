import { AppContext } from '@/Context/AppContext';
import DeleteModal from '@/components/Elements/Modal/DeleteModal';
import SelectModal from '@/components/Elements/Modal/SelectModal';
import useFirestoreData from '@/hooks/useFirestoreData';
import useSelect from '@/hooks/useSelect';
import { auth } from '@/lib/firebase';
import { addTodo } from '@/lib/firestore';
import { AppContextType } from '@/types';
import { onAuthStateChanged } from 'firebase/auth';
import {
  FormEventHandler,
  MouseEvent,
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { RenderTodoList } from './RenderTodoList';
import Toast from './Toast';
const EditModal = lazy(() => import('@/components/Elements/Modal/EditModal'));

const renderLoader = () => <p>Loading...</p>;
export default function Home() {
  const navigate = useNavigate();
  const { sortedTodo, todos, settodos } = useFirestoreData();
  const todoRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const confirmModalRef = useRef<HTMLDialogElement>(null);
  const [EditModalMounted, setEditModalMounted] = useState(false);
  const [SelectModalMounted, setSelectModalMounted] = useState(false);
  const { DeleteModalMounted, editModalRef, setisPrevent } = useContext(
    AppContext
  ) as AppContextType;
  const { SelectedID, setSelectedID, selectCount, setselectCount, clearSelect, selectAll } =
    useSelect(todos);

  // const pendingOps = new Set();
  const [addLoading, setAddLoading] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await addTodo(todoRef, inputRef, settodos, todos, setisPrevent);
    },
    [todos]
  );

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
    if (selecting) {
      setEditModalMounted(true);
      setSelectModalMounted(true);
    } else {
      setTimeout(() => {
        setSelectModalMounted(false);
      }, 200);
    }
  }, [selecting]);

  const todo = todos !== null ? todos?.find((t) => t?.id === SelectedID.toString()) : null;

  const [text, settext] = useState(todo?.text || null);

  const closeEditModal = useCallback(() => {
    editModalRef.current?.close();
    if (todo) {
      settext(todo.text!);
    } else {
    }
  }, [todo]);
  function openEditModal() {
    editModalRef.current?.showModal();
  }
  const exitWithoutSaving = text !== todo?.text;
  function confirmEditModal(e: MouseEvent<HTMLDialogElement>) {
    const dialog = document.querySelector('dialog');
    if (e.target === dialog) {
      if (exitWithoutSaving) {
        confirmModalRef.current?.showModal();
        console.log('show confirm');
      } else {
        closeEditModal();
      }
    }
  }
  const NotCompleteTodo = todos.filter((todo) => todo.completed !== true);
  const todoCount = NotCompleteTodo.length;
  return (
    <main>
      <Toast todoRef={todoRef} SelectedID={SelectedID} clearSelect={clearSelect} />

      {SelectModalMounted && (
        <SelectModal
          exitWithoutSaving={exitWithoutSaving}
          confirmModalRef={confirmModalRef}
          openEditModal={openEditModal}
          clearSelect={clearSelect}
          SelectedID={SelectedID}
          selecting={selecting}
        />
      )}

      {EditModalMounted && todo && (
        <dialog onClick={confirmEditModal} id="editModal" ref={editModalRef}>
          <Suspense fallback={renderLoader()}>
            <EditModal
              exitWithoutSaving={exitWithoutSaving}
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

      <Header todos={todos} settodos={settodos} todoCount={todoCount} selecting={selecting} />

      <div className="selectionContainer">
        {SelectedID.length === 1 && selectCount && (
          <button tabIndex={-1} onClick={selectAll}>
            Select All
          </button>
        )}
        {SelectedID.length >= 2 && <button onClick={clearSelect}>Deselect All</button>}
      </div>

      <section className={`todo-parent row`}>
        <RenderTodoList
          sortedTodo={sortedTodo}
          addLoading={addLoading}
          todos={todos}
          todoRef={todoRef}
          selectCount={selectCount}
          setselectCount={setselectCount}
          SelectedID={SelectedID}
          setSelectedID={setSelectedID}
        />
      </section>

      <Footer
        SelectModalMounted={SelectModalMounted}
        selectCount={selectCount}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
