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
  const [canDelete, setcanDelete] = useState(true);

  const [undoCount, setundoCount] = useState(5);
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
    if (canDelete === false) {
      clearInterval(intervalRef.current);
      setundoCount(5);
    }
    return () => {
      setundoCount(5);
      clearInterval(intervalRef.current);
    };
  }, [deleteloading, openDeleteToast, canDelete]);
  function handleDeleteModal() {
    setopenDeleteModal((prev) => !prev);
    if (!openDeleteModal) {
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
        canDelete,
        setloading,
        deleteHandle,
        deleteloading,
        openDeleteToast,
        handleDeleteModal,
        DeleteToastMounted,
        setDeleteToastMounted,
        DeleteModalMounted,
        setDeleteModalMounted,
        openDeleteModal,
        setopenDeleteToast,
        setcanDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
