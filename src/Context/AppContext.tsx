import { AppContextType } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const AppContext = createContext<AppContextType | null>(null);
export function AppProvider({ children }: PropsWithChildren) {
  const editModalRef = useRef<HTMLDialogElement>(null);

  const [undoCount, setundoCount] = useState(5);
  const [cancelDelete, setcancelDelete] = useState(true);
  const [deleteloading, setloading] = useState(false);
  const [openDeleteToast, setopenDeleteToast] = useState(false);
  const [DeleteToastMounted, setDeleteToastMounted] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [DeleteModalMounted, setDeleteModalMounted] = useState(false);

  const intervalRef = useRef<NodeJS.Timer | number | undefined>();

  useEffect(() => {
    // const interval : string | number | NodeJS.Timeout | undefined | false =
    if (undoCount > 1 && deleteloading && openDeleteToast) {
      intervalRef.current = setInterval(() => {
        setundoCount((undoCount) => undoCount - 1);
      }, 1000);
    }
    if (cancelDelete === false) {
      clearInterval(intervalRef.current);
      setundoCount(5);
    }
    return () => {
      setundoCount(5);
      clearInterval(intervalRef.current);
    };
  }, [deleteloading, openDeleteToast, cancelDelete]);
  function handleDeleteModal() {
    setopenDeleteModal((prev) => !prev);
    if (!openDeleteModal) {
      // setopenDeleteModal(true);
      setDeleteModalMounted(true);
    }
  }
  const deleteHandle = () => {
    setopenDeleteModal(false);
    setopenDeleteToast(true);
    setDeleteToastMounted(true);
    setloading(true);
    // let deleteTime;
  };
  return (
    <AppContext.Provider
      value={{
        undoCount,
        cancelDelete,
        setloading,
        deleteHandle,
        deleteloading,
        openDeleteToast,
        handleDeleteModal,
        DeleteToastMounted,
        setopenDeleteModal,
        setDeleteToastMounted,
        DeleteModalMounted,
        setDeleteModalMounted,
        openDeleteModal,
        setopenDeleteToast,
        setcancelDelete,
        editModalRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
