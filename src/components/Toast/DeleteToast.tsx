import { AppContext } from '@/Context/AppContext';
import { AppContextType } from '@/types';
import Button from '@Elements/Button/Button';
import { useContext } from 'react';
import { IconContext } from 'react-icons';
import { GrClose } from 'react-icons/gr';
import s from './Toast.module.css';

export default function DeleteToast() {
  const { deleting, setcancelDelete, cancelDelete, setopenDeleteToast } = useContext(
    AppContext
  ) as AppContextType;

  const { undoCount, deleteloading, setloading, openDeleteToast, setDeleteToastMounted } =
    useContext(AppContext) as AppContextType;

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
  function handleUndo() {
    setcancelDelete(false);
    setloading(false);
  }
  const animationState = openDeleteToast
    ? deleteloading
      ? mountDeleteToast
      : deletingAnimation
    : deleteloading
    ? undoDeleteAnimation
    : unmountDeleteToast;
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
              {deleteloading && <img width={50} src="cat-spinner.gif" alt="deleting" />}
              <p>Deleting {`in ${undoCount}s`}</p>
              <Button theme="secondary" onClick={handleUndo} className={s.undoBtn}>
                Undo
              </Button>
            </>
          )
        : cancelDelete &&
          !deleteloading && (
            <>
              {!deleting ? (
                <img width={50} src="checked.gif" alt="delete successful" />
              ) : (
                <img width={50} src="cat-spinner.gif" alt="deleting" />
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
