import { AppContext } from '@/Context/AppContext';
import { AppContextType } from '@/types';
import { MouseEventHandler, RefObject, useContext, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GrClose } from 'react-icons/gr';
import Button from '../Button/Button';

export default function SelectModal(props: {
  SelectedID: number[];
  selecting: boolean;
  clearSelect: Function;
  exitWithoutSaving: boolean;
  confirmModalRef: RefObject<HTMLDialogElement>;
  openEditModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const mountStyle = {
    animation: 'selectMount 200ms ease-in',
  };
  const unmountStyle = {
    animation: 'selectUnmount 250ms ease-out',
  };
  const { exitWithoutSaving, confirmModalRef, selecting, SelectedID, clearSelect, openEditModal } =
    props;
  const {
    editModalRef,
    openDeleteModal,
    setopenDeleteModal,
    setDeleteModalMounted,
    setisPrevent,
    deleteloading,
    handleDeleteModal,
  } = useContext(AppContext) as AppContextType;
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (exitWithoutSaving) {
          console.log("confirm update");
          editModalRef.current?.showModal();
          confirmModalRef.current?.showModal();
        }
        if (SelectedID.length > 1 || !exitWithoutSaving) {
          console.log(e.key + ' (closing selectModal)');
          clearSelect();
          setisPrevent(false);
          setDeleteModalMounted(false);
          setopenDeleteModal(false);
        }
      }
    }
    window.addEventListener('keyup', handleEscape);
    return () => {
      window.removeEventListener('keyup', handleEscape);
    };
  }, [exitWithoutSaving]);
  const controlTabkey = !openDeleteModal ? 1 : -1;
  const mountAnimation = selecting ? mountStyle : unmountStyle;
  return (
    <div style={mountAnimation} className={`selectModal `}>
      <div>
        <IconContext.Provider value={{ className: 'global-class-name' }}>
          <GrClose
            className="closeSelectBtn"
            onClick={() => {
              clearSelect();
              setisPrevent(false);
            }}
          />
        </IconContext.Provider>
        <p className="selectCount">{SelectedID.length}</p>
      </div>
      <div>
        <Button
          tabIndex={controlTabkey}
          disabled={deleteloading || SelectedID.length > 1}
          onClick={openEditModal}
          className="edit"
        >
          Edit
        </Button>
        <Button
          tabIndex={controlTabkey}
          style={{ pointerEvents: deleteloading ? 'none' : 'initial' }}
          disabled={deleteloading}
          onClick={handleDeleteModal}
          className="delete"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
