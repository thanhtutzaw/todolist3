import React from "react";

export default function ConfirmModal(props) {
  const { closeHandle, closeConfirm } = props;
  return (
    <div className="confirmModal">
      <p style={{ fontWeight: "500", fontSize: "22px" }}>Discard Changes ?</p>
      <div>
        <button className="btn keepEditingBtn" onClick={closeConfirm}>
          Keep editing
        </button>
        <button
          className="btn discardBtn"
          onClick={() => {
            closeConfirm();
            closeHandle();
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
}
