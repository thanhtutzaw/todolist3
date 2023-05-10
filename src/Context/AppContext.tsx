import useFirestoreData from '@/hooks/useFirestoreData';
import useTheme from '@/hooks/useTheme';
import { AppContextType, labelProps, todosProps } from '@/types';
import { PropsWithChildren, createContext, useEffect, useRef, useState } from 'react';

export const AppContext = createContext<AppContextType | null>(null);
export default function AppProvider({ children }: PropsWithChildren) {
  const editModalRef = useRef<HTMLDialogElement>(null);
  const [isPrevent, setisPrevent] = useState(false);
  const [openDeleteToast, setopenDeleteToast] = useState(false);
  const [tab, settab] = useState('');

  const [deleteloading, setloading] = useState(false);

  const [DeleteToastMounted, setDeleteToastMounted] = useState(false);
  const [deleting, setdeleting] = useState(false);

  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [DeleteModalMounted, setDeleteModalMounted] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [filter, setfilter] = useState<todosProps[] | null[]>([]);

  useEffect(() => {
    window.location.hash = tab;
    tabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // const timeoutId = setTimeout(() => {
    //   const newTab = tab.replace(/%20/g, '-');
    //   window.location.replace(`#${newTab}`);
    //   tabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }, 200);
    // return () => clearTimeout(timeoutId);
  }, [tab]);

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
      console.log('delete confirm?');
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
  const { labels, setlabels, todos, settodos, loading } = useFirestoreData();
  return (
    <AppContext.Provider
      value={{
        filter,
        setfilter,
        labels,
        setlabels,
        todos,
        settodos,
        loading,
        theme,
        setTheme,
        tabRef,
        tab,
        settab,
        // timeAgo,
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
