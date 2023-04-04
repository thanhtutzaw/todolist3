import { MouseEventHandler } from 'react';

export default function ConfirmModal(props: {
  closeEditModal: Function;
  closeConfirm: MouseEventHandler<HTMLButtonElement>;
}) {
  const { closeEditModal, closeConfirm } = props;
  return (
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
  );
}
