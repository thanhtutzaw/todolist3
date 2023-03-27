import { AppContext } from '@/Context/AppContext';
import { AppContextType } from '@/types';
import { RefObject, useContext, useEffect, useState } from 'react';
import { deleteMultipleTodo } from '../../lib/firestore';
import DeleteToast from './DeleteToast';
import s from './Toast.module.css';
export default function Toast(props: {
  todoRef: RefObject<HTMLUListElement>;
  clearSelect: Function;
  SelectedID: number[];
}) {
  const { SelectedID, todoRef, clearSelect } = props;
  const [cancelDelete, setcancelDelete] = useState(true);

  const {
    setdeleting,
    setisPrevent,
    DeleteToastMounted,
    setopenDeleteToast,
    setloading,
  } = useContext(
    AppContext
  ) as AppContextType;
  useEffect(() => {
    let deleteTime: NodeJS.Timeout | undefined;
    if (DeleteToastMounted) {
      if (cancelDelete === false) {
        console.info('%cDelete Canceled ✔️', 'color:grey');
        clearSelect();
        setisPrevent(false);
        setopenDeleteToast(false);
        clearTimeout(deleteTime);
      }
      deleteTime = setTimeout(
        deleteMultipleTodo(
          setdeleting,
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
    } else {
      setcancelDelete(true);
    }
    return () => clearTimeout(deleteTime);
  }, [cancelDelete, DeleteToastMounted]);
  return (
    <div
      style={{ visibility: DeleteToastMounted ? 'visible' : 'hidden' }}
      className={s.toastContainer}
    >
      {DeleteToastMounted && (
        <DeleteToast          
          cancelDelete={cancelDelete}
          setcancelDelete={setcancelDelete}
        />
      )}
    </div>
  );
}
