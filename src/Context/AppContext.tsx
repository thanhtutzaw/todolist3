import { AppContextType } from '@/types';
import { PropsWithChildren, createContext, useEffect, useRef, useState } from 'react';

export const AppContext = createContext<AppContextType | null>(null);
export default function AppProvider({ children }: PropsWithChildren) {
  const editModalRef = useRef<HTMLDialogElement>(null);
  const [isPrevent, setisPrevent] = useState(false);
  const [openDeleteToast, setopenDeleteToast] = useState(false);

  const [deleteloading, setloading] = useState(false);

  const [DeleteToastMounted, setDeleteToastMounted] = useState(false);
  const [deleting, setdeleting] = useState(false);

  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [DeleteModalMounted, setDeleteModalMounted] = useState(false);

  useEffect(() => {
    function preventRefresh(event: BeforeUnloadEvent) {
      event.returnValue = 'You have unfinished changes!';
    }
    if (isPrevent) {
      window.addEventListener('beforeunload', preventRefresh);
    }
    return () => {
      if (isPrevent) {
        window.removeEventListener('beforeunload', preventRefresh);
      }
    };
  }, [isPrevent]);

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
  const [dateLocale, setDateLocale] = useState(localStorage.getItem('dateLocale') ?? 'Myanmar');

  return (
    <AppContext.Provider
      value={{
        dateLocale,
        setDateLocale,
        setloading,
        deleteHandle,
        deleteloading,
        openDeleteToast,
        setopenDeleteToast,
        handleDeleteModal,
        DeleteToastMounted,
        setopenDeleteModal,
        setDeleteToastMounted,
        DeleteModalMounted,
        setDeleteModalMounted,
        openDeleteModal,
        editModalRef,
        isPrevent,
        setisPrevent,
        deleting,
        setdeleting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
