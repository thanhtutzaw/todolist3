import { AppContext } from '@/Context/AppContext';
// import usePrevent from '@/hooks/usePrevent';
import { AppContextType } from '@/types';
import { MouseEventHandler, useContext, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GrClose } from 'react-icons/gr';
import Button from '../Button/Button';

export default function SelectModal(props: {
  SelectedID: number[];
  selecting: boolean;
  clearSelect: Function;
  openEditModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const mountStyle = {
    animation: 'selectMount 200ms ease-in',
  };
  const unmountStyle = {
    animation: 'selectUnmount 250ms ease-out',
  };
  // const { selecting, SelectedID, clearSelect, setisPrevent, openEditModal } =
  //   props;
  const { selecting, SelectedID, clearSelect, openEditModal } = props;
  const {
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
        console.log(e.key, '(closing selectModal)');
        clearSelect();
        setisPrevent(false);
        setDeleteModalMounted(false);
        setopenDeleteModal(false);
      }
    }
    window.addEventListener('keyup', handleEscape);
    return () => {
      window.removeEventListener('keyup', handleEscape);
    };
  }, []);
  return (
    <div style={selecting ? mountStyle : unmountStyle} className={`selectModal `}>
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
          // tabIndex={0}
          tabIndex={!openDeleteModal ? 1 : -1}
          disabled={deleteloading || SelectedID.length > 1}
          onClick={openEditModal}
          // className={`edit ${SelectedID.length > 1 ? 'disabled' : ''}`}
          className="edit"
        >
          Edit
        </Button>

        <Button
        tabIndex={!openDeleteModal ? 1 : -1}
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
