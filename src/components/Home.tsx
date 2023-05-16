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
import { CustomConsole } from './CustomConsole';
import Dialog from './Elements/Modal/Dialog';
import Footer from './Footer';
import Header from './Header';
import { RenderTodoList } from './RenderTodoList';
import SelectAllBtn from './SelectAllBtn';
import Tabs from './Tabs';
import Toast from './Toast';
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

  const todo = todos?.find((t) => t?.id === SelectedID.toString()) ?? null;
  const [text, settext] = useState(todo?.text || null);
  const [label, setlabel] = useState(todo?.label || null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await addTodo(todoRef, inputRef, settodos, label, todos, setisPrevent);
    },
    [todos, label]
  );
  const closeEditModal = useCallback(() => {
    editModalRef.current?.close();
    if (todo) {
      // settext(todo.text!);
    }
    if (todo && SelectedID.length !== 0) {
      settext(todo.text!);
      setlabel(todo.label!);
    } else {
      alert('this should not run');
      settext(null);
      setlabel(null);
    }
  }, [todo, label, SelectedID]);
  const exitWithoutSaving = text !== todo?.text || label !== todo?.label;
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
  const NotCompleteTodo = todos.filter((todo) => todo?.completed === false);
  const todoCount = NotCompleteTodo.length;

  const auth = getAuth();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const tabWidth = useRef<HTMLDivElement>(null);

  const addLabelRef = useRef(null);
  useEffect(() => {
    if (SelectedID.length === 0) {
      setlabel(null);
    } else {
      setlabel(todo?.label!);
    }
  }, [SelectedID, todo]);

  return (
    <main>
      <Toast todoRef={todoRef} SelectedID={SelectedID} clearSelect={clearSelect} />
      <CustomConsole message={message} dummyRef={dummyRef} />
      {SelectModalMounted && (
        <SelectModal
          exitWithoutSaving={exitWithoutSaving}
          confirmModalRef={confirmModalRef}
          openEditModal={() => editModalRef.current?.showModal()}
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
        <section
          style={{ height: SelectedID.length !== 0 ? '50px' : '90px' }}
          ref={constraintsRef}
          className="tabSection"
        >
          <Tabs
            tabWidth={tabWidth}
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
          todoRef={todoRef}
          selectCount={selectCount}
          setselectCount={setselectCount}
          SelectedID={SelectedID}
          setSelectedID={setSelectedID}
        />
      </section>

      <Footer
        label={label}
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
