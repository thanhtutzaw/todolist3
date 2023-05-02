import { AppContextType } from '@/types';
import { PropsWithChildren, createContext, useEffect, useRef, useState } from 'react';

export const AppContext = createContext<AppContextType | null>(null);
export default function AppProvider({ children }: PropsWithChildren) {
  const editModalRef = useRef<HTMLDialogElement>(null);
  const [isPrevent, setisPrevent] = useState(false);
  const [openDeleteToast, setopenDeleteToast] = useState(false);
  const [active, setactive] = useState('');

  const [deleteloading, setloading] = useState(false);

  const [DeleteToastMounted, setDeleteToastMounted] = useState(false);
  const [deleting, setdeleting] = useState(false);

  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [DeleteModalMounted, setDeleteModalMounted] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.location.hash = active !== '' ? active : 'all';
    tabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [active]);
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
  function timeAgo(input: string | Date) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    let key: keyof typeof ranges;
    for (key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        const date = formatter.format(Math.round(delta), key);
        const ago = 'က';
        const day = 'ရက်နေ့';
        const week = 'ပတ်';
        const month = 'လ';
        const year = 'နှစ်';
        const hour = 'နာရီ';
        const minute = 'မိနစ်';
        const second = 'စက္ကန့်';
        const myanmarDate =
          'လွန်ခဲ့သော ' +
          date
            .replace('ago', ago)
            .replace('in', '')
            .replace('d', day)
            .replace('mo', month)
            .replace('w', week)
            .replace('y', year)
            .replace('h', hour)
            .replace('m', minute)
            .replace('s', second);
        return dateLocale === 'Myanmar' ? myanmarDate : date;
      }
    }
  }
  return (
    <AppContext.Provider
      value={{
        tabRef,
        active,
        setactive,
        timeAgo,
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
