import { RefObject, useContext, useEffect } from "react";
import { deleteMultipleTodo } from "../../lib/firestore";
import s from "./Toast.module.css";
import DeleteToastItem from "./DeleteToastItem";
import { AppContext } from "@/Context/AppContext";
import { AppContextType } from "@/types";
export default function Toast(props: {
  todoRef: RefObject<HTMLUListElement>;
  setisPrevent: Function;
  clearSelect: Function;
  SelectedID: number[];
}) {
  const { SelectedID, todoRef, setisPrevent, clearSelect } = props;
  const {
    DeleteToastMounted,
    canDelete,
    setcanDelete,
    setopenDeleteToast,
    setloading,
  } = useContext(AppContext) as AppContextType;
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
          canDelete={canDelete}
          setcanDelete={setcanDelete}
          setopenDeleteToast={setopenDeleteToast}
        />
      )}
    </div>
  );
}
