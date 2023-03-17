import { AppContext } from "@/Context/AppContext";
import { AppContextType } from "@/types";
import { RefObject, useContext, useEffect } from "react";
import { deleteMultipleTodo } from "../../lib/firestore";
import s from "./Toast.module.css";
import DeleteToast from "./DeleteToast";
export default function Toast(props: {
  todoRef: RefObject<HTMLUListElement>;
  setisPrevent: Function;
  clearSelect: Function;
  SelectedID: number[];
}) {
  const { SelectedID, todoRef, setisPrevent, clearSelect } = props;
  const {
    DeleteToastMounted,
    cancelDelete,
    setcancelDelete,
    setopenDeleteToast,
    setloading,
  } = useContext(AppContext) as AppContextType;
  useEffect(() => {
    let deleteTime: NodeJS.Timeout | undefined;
    if (DeleteToastMounted === false) {
      setcancelDelete(true);
    }
    if (DeleteToastMounted) {
      if (cancelDelete === false) {
        console.info("%cUndo Delete ✔️", "color:grey");
        clearSelect();
        setisPrevent(false);
        setopenDeleteToast(false);
        clearTimeout(deleteTime);
      }
      deleteTime = setTimeout(
        deleteMultipleTodo(
          setcancelDelete,
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
  }, [cancelDelete, DeleteToastMounted]);
  return (
    <div
      style={{ visibility: DeleteToastMounted ? "visible" : "hidden" }}
      className={s.toastContainer}
    >
      {DeleteToastMounted && <DeleteToast />}
    </div>
  );
}
