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
  const exitDeleteToast = {
    animation: "exitDeleteToast .4s ease-in-out",
  };
  const LoadingToastClose = {
    animation: "LoadingToastClose .4s ease-in-out",
  };
  const LoadingToastOpen = {
    maxWidth: "200px",
  };
  function handleUndo() {
    props.setcanDelete(false);
    // setcanDelete(true);
    // props.setopenDeleteToast(false);

    // if(!props.openDeleteToast){
    // props.setToastMounted(false);
    // }
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
          ? props.deleteloading ? enterDeleteToast : LoadingToastOpen
          : props.deleteloading ? LoadingToastClose : exitDeleteToast
        // props.deleteloading
        //   ? props.deleteloading
        //     ? LoadingToastClose
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
      // className={`${!props.deleteloading ? s.loading : s.toast} `}
    >
      {/* {props.counter === 5 && props.canDelete && <p>deleting...</p>} */}
      {props.deleteloading ? (
        <>
          <p>
            Deleting {!props.deleteloading ? `... ` : `in ${props.counter}s`}
          </p>
          <button onClick={handleUndo} className={s.undoBtn}>
            {/* <a>Undo</a> */}
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
        console.log("fale and cancel delect");
        setopenDeleteToast(false);
        // setToastMounted(false)
        clearTimeout(deleteTime);
        clearSelect();
        setisPrevent(false);
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
