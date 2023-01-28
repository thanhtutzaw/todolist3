import React, { Suspense, useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CgChevronRightR } from "react-icons/cg";
import usePrevent from "../hooks/usePrevent.js";
import useSelect from "../hooks/useSelect.js";
import useFireStoreData from "../hooks/useFireStoreData";
import { addTodo, deleteTodo } from "../utils/todo.js";
import SelectModal from "./SelectModal";
import BottomNav from "./BottomNav";
// import EditModal from "./EditModal.jsx";
import Header from "./Header";
import Todolist from "./Todolist";
import { useCallback } from "react";
import { auth } from "../lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast.jsx";
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
  const [canDelete, setcanDelete] = useState(true);
  const [counter, setcounter] = useState(5);
  // const deleteHandle = useCallback(
  // let timeout;
  useEffect(() => {
    const interval =
      counter > 1 &&
      deleteloading &&
      openDeleteToast &&
      setInterval(() => {
        setcounter((counter) => counter - 1);
        // console.log(counter);
      }, 1000);
    // if(deleteloading === false && counter === 0){
    //   clearInterval(interval)
    // }
    if (canDelete === false) {
      clearInterval(interval);
      setcounter(5);
    }
    return () => {
      setcounter(5);
      clearInterval(interval);
    };
  }, [deleteloading, openDeleteToast, canDelete]);
  // useEffect(() => {
  //   if (canDelete === false) {
  //     set;
  //   }
  // }, [canDelete]);
  // deleteloading === false && clearInterval(timeout);
  const deleteHandle = ()=>{
    setopenDeleteToast(true)
    setloading(true)
    let deleteTime;
    console.log(canDelete);
    // if(canDelete === false){
    //   clearTimeout(deleteTime);
    // }else{
    //   deleteTime = setTimeout(
    //     deleteTodo(
    //       // timeout,
    //       setcanDelete,
    //       canDelete,
    //       setcounter,
    //       counter,
    //       setopenDeleteToast,
    //       setloading,
    //       setisPrevent,
    //       clearSelect,
    //       todoRef,
    //       SelectedID
    //     ), 5000);

    // }
  }

  //   [SelectedID]
  // );
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
    animation: "selectMount 180ms ease",
  };
  const unmountStyle = {
    animation: "selectUnmount 250ms ease-out",
    // animationFillMode: "forwards",
  };
  const [mounted, setmounted] = useState(false);
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
      {/* <div style={{background:'rgba(100,100,100,.1)',position:'fixed',inset:'0',width:'100vw',height:'45vh',margin:'0 auto'}}>overlay</div> */}
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>
      {mounted && (
        <SelectModal
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
                // setConfirmModal((prev) => !prev);
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
            {/* {<Skeleton className={`loading ${!loading ? 'fadeOut' : ''}`} count={5} />} */}
            {/* {<Skeleton className={"loading"} count={5} />} */}
            {loading && <Skeleton className={"loading"} count={5} />}
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
