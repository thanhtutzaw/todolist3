import { RefObject, useCallback } from 'react';
import Dialog from './Dialog';
export default function ConfirmModal(props: {
  closeEditModal: Function;
  confirmModalRef: RefObject<HTMLDialogElement>;
}) {
  const { closeEditModal, confirmModalRef } = props;

  const closeConfirm = useCallback(() => {
    console.log('keep editing');
    confirmModalRef.current?.close();
  }, []);

  return (
    <Dialog id="confirmModal" ref={confirmModalRef}>
      <div className="confirmModal">
        <p>Discard Changes ?</p>
        <button className="btn keepEditingBtn" onClick={closeConfirm}>
          Keep Editing
        </button>
        <button
          className="btn discardBtn"
          onClick={(e) => {
            closeConfirm();
            closeEditModal();
            console.log('edit canceled');
          }}
        >
          Discard
        </button>
      </div>
    </Dialog>
  );
}
