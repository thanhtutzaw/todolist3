import { AppContext } from "@/Context/AppContext";
import SelectModal from "@/components/Elements/Modals/SelectModal";
import useFirestoreData from "@/hooks/useFirestoreData";
import usePrevent from "@/hooks/usePrevent";
import useSelect from "@/hooks/useSelect";
import { auth } from "@/lib/firebase";
import { addTodo } from "@/lib/firestore";
import { AppContextType } from "@/types";
import Button from "@Elements/Button/Button";
import DeleteModal from "@Elements/Modals/DeleteModal";
import { onAuthStateChanged } from "firebase/auth";

import React, {
  FormEventHandler,
  MouseEvent,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CgChevronRightR } from "react-icons/cg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import Header from "./Header";
import Toast from "./Toast";
import Todolist from "./Todolist";
const EditModal = React.lazy(() => import("@Elements/Modals/EditModal"));

const renderLoader = () => <p>Loading...</p>;
export default function Home() {
  const navigate = useNavigate();
  const todoRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const confirmModalRef = useRef<HTMLDialogElement>(null);

  const [EditModalMounted, setEditModalMounted] = useState(false);
  const [SelectModalMounted, setSelectModalMounted] = useState(false);

  const { DeleteModalMounted, openDeleteModal, editModalRef } = useContext(
    AppContext
  ) as AppContextType;
  const { todos, settodos, loading } = useFirestoreData();
  const { isPrevent, setisPrevent } = usePrevent();
  const {
    SelectedID,
    setSelectedID,
    selectCount,
    setselectCount,
    clearSelect,
    selectAll,
  } = useSelect(todos);

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
        navigate("/login");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const selecting = selectCount && SelectedID.length !== 0;

  useEffect(() => {
    const selecting = selectCount && SelectedID.length !== 0;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        clearSelect();
        setisPrevent(false);
      }
    }
    if (selecting) {
      setEditModalMounted(true);
      setSelectModalMounted(true);
      window.addEventListener("keyup", handleEscape);
    } else {
      setTimeout(() => {
        setSelectModalMounted(false);
      }, 200);
    }
    return () => {
      if (selecting) {
        window.removeEventListener("keyup", handleEscape);
      }
    };
  }, [selecting, SelectModalMounted]);

  const todo = todos.find((t) => t.id === SelectedID.toString());

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

  return (
    <main>
      <Toast
        todoRef={todoRef}
        SelectedID={SelectedID}
        clearSelect={clearSelect}
        setisPrevent={setisPrevent}
      />
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <Button className="btn">
          <CgChevronRightR />
        </Button>
      </a>
      {SelectModalMounted && (
        <SelectModal
          openEditModal={openEditModal}
          setisPrevent={setisPrevent}
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
              setisPrevent={setisPrevent}
              clearSelect={clearSelect}
              closeEditModal={closeEditModal}
              todo={todo}
            />
          </Suspense>
        </dialog>
      )}
      {/* {openDeleteModal && <DeleteModal SelectedID={SelectedID} />} */}
      <DeleteModal SelectedID={SelectedID} />

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
        <ul
          ref={todoRef}
          style={{ userSelect: selectCount ? "none" : "initial" }}
        >
          <SkeletonTheme height="55px">
            {loading && <Skeleton className={"loading"} count={10} />}
          </SkeletonTheme>
          {!loading &&
            todos.map((todo, index) =>
              todos.length !== 0 ? (
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
              ) : (
                <p className="empty">Empty!</p>
              )
            )}
        </ul>
      </section>

      <BottomNav
        selectCount={selectCount}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
      />
    </main>
  );

  function confirmEditModal(e: MouseEvent<HTMLDialogElement>) {
    const dialog = document.querySelector("dialog");
    if (e.target === dialog) {
      if (text !== todo?.text) {
        confirmModalRef.current?.showModal();
      } else {
        closeEditModal();
      }
    }
  }
}
