import React from "react";

export default function CloseConfirmModal(props) {
  const { closeHandle, closeConfirm } = props;
  return (
    <div className="closeConfirmModal">
      <p style={{ fontWeight: "500", fontSize: "22px" }}>Discard Changes ?</p>
      <div>
        <button className="btn continueBtn" onClick={closeConfirm}>
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
