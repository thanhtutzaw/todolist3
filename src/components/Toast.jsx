import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import s from "../styles/Toast.module.css";
import { deleteTodo } from "../utils/todo";

function ToastItem(props) {
  function handleUndo() {
    props.setcanDelete(false);
    // setcanDelete(true);
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
      {/* {props.counter === 5 && props.canDelete && <p>deleting...</p>} */}
      {props.deleteloading ? (
        <>
          <p>
            Deleting {!props.deleteloading ? `... ` : `in ${props.counter}s`}
          </p>
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

    if (openDeleteToast === false) {
      setcanDelete(true);
    }
    if (openDeleteToast) {
      if (canDelete === false) {
        console.log("fale and cancel delect");
        setopenDeleteToast(false);
        clearTimeout(deleteTime);
        clearSelect();
        setisPrevent(false);
      }
      deleteTime = setTimeout(
        deleteTodo(
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
        canDelete={canDelete}
        setcanDelete={setcanDelete}
        counter={counter}
        setopenDeleteToast={setopenDeleteToast}
        openDeleteToast={openDeleteToast}
        deleteloading={deleteloading}
      ></ToastItem>
    </div>
  );
}
