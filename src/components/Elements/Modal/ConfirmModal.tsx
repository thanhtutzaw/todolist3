import { MouseEventHandler, RefObject } from 'react';
import Dialog from './Dialog';
export default function ConfirmModal(props: {
  closeEditModal: Function;
  closeConfirm: MouseEventHandler<HTMLButtonElement>;
  confirmModalRef: RefObject<HTMLDialogElement>;
}) {
  const { closeEditModal, closeConfirm, confirmModalRef } = props;
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
            closeConfirm(e);
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
