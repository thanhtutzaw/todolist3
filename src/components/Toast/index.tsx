import { RefObject, useEffect } from "react";
import { deleteMultipleTodo } from "../../lib/firestore";
import s from "./Toast.module.css";
import DeleteToastItem from "./DeleteToastItem";

export default function Toast(props: {
  todoRef: RefObject<HTMLUListElement>;
  DeleteToastMounted: boolean;
  setisPrevent: Function;
  clearSelect: Function;
  SelectedID: number[];
  counter: number;
  canDelete: boolean;
  deleteloading: boolean;
  openDeleteToast: boolean;
  setloading: Function;
  setcanDelete: Function;
  setopenDeleteToast: Function;
  setDeleteToastMounted: Function;
}) {
  const {
    DeleteToastMounted,
    setDeleteToastMounted,
    SelectedID,
    todoRef,
    setloading,
    setisPrevent,
    clearSelect,
    canDelete,
    setcanDelete,
    counter,
    deleteloading,
    openDeleteToast,
    setopenDeleteToast,
  } = props;

  useEffect(() => {
    let deleteTime: NodeJS.Timeout | undefined;

    if (DeleteToastMounted === false) {
      setcanDelete(true);
    }
    if (DeleteToastMounted) {
      if (canDelete === false) {
        console.log("false and cancel Delect");
        setopenDeleteToast(false);
        clearSelect();
        setisPrevent(false);
        clearTimeout(deleteTime);
      }
      deleteTime = setTimeout(
        deleteMultipleTodo(
          setcanDelete,
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
  }, [canDelete, DeleteToastMounted]);
  return (
    <div
      style={{ visibility: DeleteToastMounted ? "visible" : "hidden" }}
      className={s.toastContainer}
    >
      {DeleteToastMounted && (
        <DeleteToastItem
          setloading={setloading}
          setDeleteToastMounted={setDeleteToastMounted}
          canDelete={canDelete}
          setcanDelete={setcanDelete}
          counter={counter}
          setopenDeleteToast={setopenDeleteToast}
          openDeleteToast={openDeleteToast}
          deleteloading={deleteloading}
        />
      )}
    </div>
  );
}
