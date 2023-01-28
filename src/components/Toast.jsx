import React from "react";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import s from "../styles/Toast.module.css";
import { useEffect } from "react";
import { deleteTodo } from "../utils/todo";

function ToastItem(props) {
  function handleUndo() {
    props.setcanDelete(false);
    // props.setopenDeleteToast(false);
  }
  return (
    <div
      style={{
        backgroundColor: props.deleteloading
          ? "rgba(224, 17, 17, 0.836)"
          : "red",
        maxWidth: props.deleteloading ? "300px" : "100px",
        borderRadius: props.deleteloading ? ".5rem" : "2rem",
      }}
      open={props.openDeleteToast}
      className={s.toast}
    >
      {props.deleteloading ? (
        <>
          <p>Deleting in {props.counter}s</p>
          <button onClick={handleUndo} className={s.undoBtn}>
            Undo
          </button>
        </>
      ) : (
        <>
          <p>Deleted</p>
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <GrClose
              className="closeSelectBtn"
              onClick={() => {
                props.setopenDeleteToast(false);
              }}
            />
          </IconContext.Provider>
        </>
      )}
    </div>
  );
}

export default function Toast(props) {
  const {
    SelectedID,
    todoRef,
    setloading,
    setisPrevent,
    clearSelect,
    canDelete,
    setcanDelete,
    setcounter,
    counter,
    deleteloading,
    openDeleteToast,
    setopenDeleteToast,
  } = props;

  useEffect(() => {
    let deleteTime;
    // console.log(canDelete);
    if (openDeleteToast) {
      if (canDelete === false) {
        console.log("fale and cancel delect");
        setopenDeleteToast(false);
        clearTimeout(deleteTime);
        clearSelect()
        setisPrevent(false)
      } 
        deleteTime = setTimeout(
          deleteTodo(
            // timeout,
            setcanDelete,
            canDelete,
            setcounter,
            counter,
            setopenDeleteToast,
            setloading,
            setisPrevent,
            clearSelect,
            todoRef,
            SelectedID
          ),
          5000
        );
        // console.log("do delete");
      
    }
    return () => clearTimeout(deleteTime);
  }, [canDelete, openDeleteToast]);
  // useEffect(() => {
  //   const timeout =
  //     counter < 1 &&
  //     deleteloading === true && openDeleteToast === true &&
  //     setInterval(() => {
  //       console.log(counter);
  //       setcounter(counter - 1);
  //     }, 5000);
  //   return () => clearInterval(timeout);
  // }, []);

  return (
    <div
      style={{ visibility: openDeleteToast ? "visible" : "hidden" }}
      className={s.toastContainer}
    >
      <ToastItem
        setcanDelete={setcanDelete}
        counter={counter}
        setopenDeleteToast={setopenDeleteToast}
        openDeleteToast={openDeleteToast}
        deleteloading={deleteloading}
      ></ToastItem>
    </div>
  );
}
