import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import s from "../styles/Toast.module.css";
import { deleteTodo } from "../utils/todo";

function ToastItem(props) {
  const enterDeleteToast = {
    transformStyle: "preserve-3d",
    animation: "enterDeleteToast .4s ease-in-out",
  };
  const cancelDeleteToast = {
    animation: "cancelDeleteToast .4s ease-in-out",
  };
  const LoadingToastOpen = {
    borderRadius: "1rem",
    maxWidth: "200px",
    animation: "LoadingToastOpen .2s ease",
  };
  const exitDeleteToast = {
    maxWidth: "200px",
    borderRadius: "1rem",
    animation: "exitDeleteToast .2s ease-out",
  };
  function handleUndo() {
    props.setcanDelete(false);
  }
  return (
    <div
      onAnimationEnd={() => {
        if (!props.openDeleteToast) {
          props.setToastMounted(false);
        }
      }}
      style={
        props.openDeleteToast
          ? props.deleteloading
            ? enterDeleteToast
            : LoadingToastOpen
          : props.deleteloading
          ? cancelDeleteToast
          : exitDeleteToast
        // props.deleteloading
        //   ? props.deleteloading
        //     ? cancelDeleteToast
        //     : LoadingToastOpen
        //   : !props.openDeleteToast
        //   ? exitDeleteToast
        //   : enterDeleteToast

        // !props.deleteloading ? loadingToast : LoadingToast
        // {
        // backgroundColor: props.deleteloading
        //   ? "rgba(224, 17, 17, 0.836)"
        //   : "red",
        // maxWidth: props.deleteloading ? "300px" : "100px",
        // borderRadius: props.deleteloading ? ".5rem" : "2rem",

        // }
      }
      // open={props.openDeleteToast}
      className={s.toast}
    >
      {props.deleteloading ? (
        props.canDelete ? (
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
            <p>
              Canceled
            </p>

          </>
        )
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
    ToastMounted,
    setToastMounted,
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

    if (ToastMounted === false) {
      setcanDelete(true);
    }
    if (ToastMounted) {
      if (canDelete === false) {
        console.log("false and cancel Delect");
        setopenDeleteToast(false);
        // setToastMounted(false)
        clearSelect();
        setisPrevent(false);
        clearTimeout(deleteTime);
      }
      deleteTime = setTimeout(
        deleteTodo(
          setToastMounted,
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
  }, [canDelete, ToastMounted]);
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
      style={{ visibility: ToastMounted ? "visible" : "hidden" }}
      className={s.toastContainer}
    >
      {ToastMounted && (
        <ToastItem
          setToastMounted={setToastMounted}
          canDelete={canDelete}
          setcanDelete={setcanDelete}
          counter={counter}
          setopenDeleteToast={setopenDeleteToast}
          openDeleteToast={openDeleteToast}
          deleteloading={deleteloading}
        ></ToastItem>
      )}
    </div>
  );
}
