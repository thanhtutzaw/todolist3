import { onAuthStateChanged } from "firebase/auth";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CgChevronRightR } from "react-icons/cg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import useFireStoreData from "../hooks/useFireStoreData";
import usePrevent from "../hooks/usePrevent.js";
import useSelect from "../hooks/useSelect.js";
import { addTodo, auth } from "../lib/firebase.js";
import BottomNav from "./BottomNav";
import Header from "./Header";
import SelectModal from "./SelectModal";
import Toast from "./Toast.jsx";
import Todolist from "./Todolist";
import DeleteModal from "./DeleteModal.jsx";
const EditModal = React.lazy(() => import("./EditModal.jsx"));

const renderLoader = () => <p>Loading...</p>;
export default function Home() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const editInput = useRef(null);
  const todoRef = useRef(null);

  const [todos, settodos, loading] = useFireStoreData();
  const { isPrevent, setisPrevent } = usePrevent();
  const {
    SelectedID,
    setSelectedID,
    selectCount,
    setselectCount,
    clearSelect,
    selectAll,
  } = useSelect(todos);

  const pendingOps = new Set();

  const handleSubmit = useCallback(
    addTodo(todoRef, inputRef, settodos, todos, setisPrevent),
    [todos]
  );
  const [deleteloading, setloading] = useState(false);
  const [openDeleteToast, setopenDeleteToast] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [canDelete, setcanDelete] = useState(true);
  const [counter, setcounter] = useState(5);
  const [ToastMounted, setToastMounted] = useState(false);
  function handleDeleteModal() {
    setopenDeleteModal((prev) => !prev);
    if (!openDeleteModal) {
      setDeleteModalMounted(true);
    }
  }
  useEffect(() => {
    const interval =
      counter > 1 &&
      deleteloading &&
      openDeleteToast &&
      setInterval(() => {
        setcounter((counter) => counter - 1);
      }, 1000);
    if (canDelete === false) {
      clearInterval(interval);
      setcounter(5);
    }
    return () => {
      setcounter(5);
      clearInterval(interval);
    };
  }, [deleteloading, openDeleteToast, canDelete]);

  const deleteHandle = () => {
    setopenDeleteModal(false);
    setopenDeleteToast(true);
    setToastMounted(true);
    setloading(true);
    let deleteTime;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe;
  }, []);

  const selecting = selectCount && SelectedID.length !== 0;

  const mountStyle = {
    animation: "selectMount 200ms ease-in",
  };
  const unmountStyle = {
    animation: "selectUnmount 250ms ease-out",
  };
  // const mountStyle = {
  //   animation: "selectMount 200ms ease-in",
  // };
  // const unmountStyle = {
  //   animation: "selectUnmount 250ms ease-out",
  // };
  const [mounted, setmounted] = useState(false);
  const [DeleteModalMounted, setDeleteModalMounted] = useState(false);
  useEffect(() => {
    if (selecting) {
      setmounted(true);
    }
  }, [selecting, mounted]);

  const todo = todos.find((t) => t.id === SelectedID.toString());
  const [text, settext] = useState(todo && todo.text);

  function closeHandle() {
    document.getElementById("editModal").close();
    if (todo) {
      settext(todo.text);
    }
  }
  return (
    <main>
      <Toast
        setToastMounted={setToastMounted}
        ToastMounted={ToastMounted}
        SelectedID={SelectedID}
        todoRef={todoRef}
        clearSelect={clearSelect}
        setisPrevent={setisPrevent}
        setloading={setloading}
        canDelete={canDelete}
        setcanDelete={setcanDelete}
        setcounter={setcounter}
        counter={counter}
        setopenDeleteToast={setopenDeleteToast}
        openDeleteToast={openDeleteToast}
        deleteloading={deleteloading}
      />
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>
      {mounted && (
        <SelectModal
          handleDeleteModal={handleDeleteModal}
          deleteloading={deleteloading}
          todoRef={todoRef}
          setisPrevent={setisPrevent}
          clearSelect={clearSelect}
          SelectedID={SelectedID}
          deleteHandle={deleteHandle}
          selecting={selecting}
          mountStyle={mountStyle}
          unmountStyle={unmountStyle}
          setmounted={setmounted}
        />
      )}

      {mounted && (
        <dialog
          onClick={(e) => {
            const dialog = document.querySelector("dialog");
            if (e.target === dialog) {
              if (text !== todo.text) {
                document.getElementById("confirmModal").showModal();
              } else {
                closeHandle();
              }
            }
          }}
          id="editModal"
        >
          <Suspense fallback={renderLoader()}>
            <EditModal
              text={text}
              settext={settext}
              setisPrevent={setisPrevent}
              clearSelect={clearSelect}
              closeHandle={closeHandle}
              todo={todos.find((t) => t.id === SelectedID.toString())}
              editInput={editInput}
            />
          </Suspense>
        </dialog>
      )}
      {DeleteModalMounted && (
        <DeleteModal
          setDeleteModalMounted={setDeleteModalMounted}
          DeleteModalMounted={DeleteModalMounted}
          openDeleteModal={openDeleteModal}
          // mountStyle={mountStyle}
          // unmountStyle={unmountStyle}
          handleDeleteModal={handleDeleteModal}
          deleteHandle={deleteHandle}
          SelectedID={SelectedID}
        />
      )}

      <Header selecting={selecting} todoLength={todos.length} />

      <div className="selectionContainer">
        {SelectedID.length === 1 && selectCount && (
          <button onClick={selectAll}>Select All</button>
        )}

        {SelectedID.length >= 2 && (
          <button onClick={clearSelect}>Deselect All</button>
        )}
      </div>

      <section className={`todo-parent row`}>
        <ul ref={todoRef} style={{ userSelect: selectCount && "none" }}>
          <SkeletonTheme height="55px">
            {loading && <Skeleton className={"loading"} count={10} />}
          </SkeletonTheme>
          {!loading &&
            todos.map((todo, index) => (
              <Todolist
                isPrevent={isPrevent}
                setisPrevent={setisPrevent}
                todos={todos}
                setselectCount={setselectCount}
                SelectedID={SelectedID}
                setSelectedID={setSelectedID}
                todo={todo}
                key={index}
              />
            ))}
        </ul>
      </section>

      <BottomNav
        selectCount={selectCount}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
