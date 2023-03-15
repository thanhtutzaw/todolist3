import { MouseEventHandler } from "react";

export default function ConfirmModal(props: {
  closeEditModal: Function;
  closeConfirm: MouseEventHandler<HTMLButtonElement>;
}) {
  const { closeEditModal, closeConfirm } = props;
  return (
    <div className="confirmModal">
      <p style={{ fontWeight: "500", fontSize: "22px" }}>Discard Changes ?</p>
      <div>
        <button className="btn keepEditingBtn" onClick={closeConfirm}>
          Keep Editing
        </button>
        <button
          className="btn discardBtn"
          onClick={(e) => {
            closeConfirm(e);
            closeEditModal();
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
}
