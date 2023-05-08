import { AppContext } from '@/Context/AppContext';
import DeleteModal from '@/components/Elements/Modal/DeleteModal';
import SelectModal from '@/components/Elements/Modal/SelectModal';
import useSelect from '@/hooks/useSelect';
import { addTodo } from '@/lib/firestore';
import { AppContextType } from '@/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
import Dialog from './Elements/Modal/Dialog';
import Footer from './Footer';
import Header from './Header';
import { RenderTodoList } from './RenderTodoList';
import SelectAllBtn from './SelectAllBtn';
import Tabs from './Tabs';
import Toast from './Toast';
import { CustomConsole } from './CustomConsole';
const EditModal = lazy(() => import('@/components/Elements/Modal/EditModal'));

const renderLoader = () => <p>Loading...</p>;
export default function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const todoRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const confirmModalRef = useRef<HTMLDialogElement>(null);
  const { todos, settodos } = useContext(AppContext) as AppContextType;
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
  useEffect(() => {
    if (typeof console !== 'undefined') {
      if (typeof console.log !== 'undefined') {
        console.log = (function (old_function) {
          return function (text) {
            old_function(text);
            const newMessage = text.replace('%c', '');
            setMessage([...message, newMessage]);
          };
        })(console.log.bind(console));
      } else {
        console.log = function () {};
      }
      // console.log = function (m) {
      //   const newMessage = m.replace('%c', '');
      //   setMessage([...message, newMessage]);
      // };
      dummyRef.current?.scrollIntoView({ behavior: 'smooth' });
      console.info = console.log;
    }
  }, [message]);
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
  const [label, setlabel] = useState(todo?.label || null);

  const closeEditModal = useCallback(() => {
    editModalRef.current?.close();
    if (todo) {
      settext(todo.text!);
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
        console.log('confirm edit');
      } else {
        closeEditModal();
      }
    }
  }
  const NotCompleteTodo = todos.filter((todo) => todo.completed !== true);
  const todoCount = NotCompleteTodo.length;
  // const [filteredTodos, setFilteredTodos] = useState<todosProps[] | null[]>(todos);
  // let filteredTodos: todosProps[] | null[];

  // useEffect(() => {
  //   filteredTodos = todos;
  // }, [todos]);
  const auth = getAuth();
  const constraintsRef = useRef(null);
  const addLabelRef = useRef(null);
  // const user = auth.currentUser;
  // if (!user) return <>{<p style={{ color: 'var(--light-text)' }}>Loading...</p>}</>;
  return (
    <main>
      <Toast todoRef={todoRef} SelectedID={SelectedID} clearSelect={clearSelect} />
      <CustomConsole message={message} dummyRef={dummyRef} />
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
        <Dialog id="editModal" onClick={confirmEditModal} ref={editModalRef}>
          <Suspense fallback={renderLoader()}>
            <EditModal
              exitWithoutSaving={exitWithoutSaving}
              confirmModalRef={confirmModalRef}
              label={label}
              setlabel={setlabel}
              text={text}
              settext={settext}
              clearSelect={clearSelect}
              closeEditModal={closeEditModal}
              todo={todo}
            />
          </Suspense>
        </Dialog>
      )}
      {DeleteModalMounted && <DeleteModal SelectedID={SelectedID} />}

      <Header todos={todos} settodos={settodos} todoCount={todoCount} selecting={selecting} />
      <div style={{ position: 'relative' }}>
        <section ref={constraintsRef} className="tabSection">
          <Tabs
            addLabelRef={addLabelRef}
            constraintsRef={constraintsRef}
            todos={todos}
            SelectedID={SelectedID}
          />
          <SelectAllBtn
            selectCount={selectCount}
            SelectedID={SelectedID}
            selectAll={selectAll}
            clearSelect={clearSelect}
          />
        </section>
      </div>

      <section className={`todo-parent row`}>
        <RenderTodoList
          addLoading={addLoading}
          todoRef={todoRef}
          selectCount={selectCount}
          setselectCount={setselectCount}
          SelectedID={SelectedID}
          setSelectedID={setSelectedID}
        />
      </section>

      <Footer
        addLabelRef={addLabelRef}
        setlabel={setlabel}
        SelectModalMounted={SelectModalMounted}
        selectCount={selectCount}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
