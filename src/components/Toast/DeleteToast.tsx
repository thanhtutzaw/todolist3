import { AppContext } from '@/Context/AppContext';
import { AppContextType } from '@/types';
import Button from '@Elements/Button/Button';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { GrClose } from 'react-icons/gr';
import s from './Toast.module.css';

export default function DeleteToast(props: { setcancelDelete: Function; cancelDelete: boolean }) {
  const [undoCounter, setundoCounter] = useState(5);
  const { setcancelDelete, cancelDelete } = props;
  const {
    deleting,
    deleteloading,
    setloading,
    openDeleteToast,
    setopenDeleteToast,
    setDeleteToastMounted,
  } = useContext(AppContext) as AppContextType;

  const mountDeleteToast = {
    transformStyle: 'preserve-3d',
    animation: 'mountDeleteToast .4s ease-in-out',
  };
  const undoDeleteAnimation = {
    animation: 'undoDeleteAnimation .4s ease-in-out forwards',
  };
  const deletingAnimation = {
    maxWidth: '200px',
    borderRadius: '1rem',
    animation: 'deletingAnimation .2s ease forwards',
  };
  const unmountDeleteToast = {
    maxWidth: '200px',
    borderRadius: '1rem',
    animation: 'unmountDeleteToast .2s ease-out forwards',
  };
  const handleUndo = useCallback(() => {
    setcancelDelete(false);
    setloading(false);
  }, []);
  const animationState = openDeleteToast
    ? deleteloading
      ? mountDeleteToast
      : deletingAnimation
    : deleteloading
    ? undoDeleteAnimation
    : unmountDeleteToast;
  const intervalRef = useRef<NodeJS.Timer | number | undefined>();
  useEffect(() => {
    if (undoCounter > 1 && deleteloading) {
      console.log('undo counting');
      intervalRef.current = setInterval(() => {
        setundoCounter((prev) => prev - 1);
      }, 1000);
    }
    if (!cancelDelete) {
      clearInterval(intervalRef.current);
      setundoCounter(5);
    }
    return () => {
      setundoCounter(5);
      clearInterval(intervalRef.current);
    };
  }, [deleteloading, cancelDelete]);
  return (
    <div
      onAnimationEnd={() => {
        if (!openDeleteToast) {
          setDeleteToastMounted(false);
        }
      }}
      style={animationState}
      className={s.deleteToast}
    >
      {!cancelDelete && !deleteloading && <p>Canceled</p>}
      {deleteloading
        ? cancelDelete && (
            <>
              {deleteloading && <img width={50} src="/assets/cat-spinner.gif" alt="deleting" />}
              <p>Deleting {`in ${undoCounter}s`}</p>
              <Button tabIndex={0} theme="secondary" onClick={handleUndo} className={s.undoBtn}>
                Undo
              </Button>
            </>
          )
        : cancelDelete &&
          !deleteloading && (
            <>
              {!deleting ? (
                <img
                  width={50}
                  src="/assets/cat-spinner.gif"
                  alt="delete successful"
                  aria-label="delete successful"
                />
              ) : (
                <img
                  width={50}
                  src="/assets/cat-spinner.gif"
                  alt="deleting"
                  aria-label="deleting"
                />
              )}
              <p>{deleting ? 'Deleting' : 'Deleted'}</p>
              <IconContext.Provider value={{ className: 'global-class-name' }}>
                <GrClose
                  className="closeSelectBtn"
                  onClick={() => {
                    setopenDeleteToast(false);
                  }}
                />
              </IconContext.Provider>
            </>
          )}
    </div>
  );
}
