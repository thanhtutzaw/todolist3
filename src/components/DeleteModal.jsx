import React, { useState } from "react";
import Button from "./Elements/Button/Button";

export default function DeleteModal(props) {
  const {
    setDeleteModalMounted,
    handleDeleteModal,
    openDeleteModal,
    deleteHandle,
    SelectedID,
  } = props;
  const [deleteConfirm, setdeleteConfirm] = useState(false);
  const mountStyle = {
    animation: "deleteModalMount 200ms ease-in",
  };
  const deleteConfirmStyle = {
    animation: "deleteConfirmStyle 300ms ease-out",
  };
  const unmountStyle = {
    animation: "deleteModalUnmount 200ms ease-out",
  };
  const length = SelectedID.length;
  return (
    <div
      style={
        openDeleteModal
          ? mountStyle
          : deleteConfirm
          ? deleteConfirmStyle
          : unmountStyle
      }
      className="deleteConfirmModal"
      onAnimationEnd={() => {
        if (!openDeleteModal ) {
          setDeleteModalMounted(false);
        }
      }}
    >
      <p>{`Are you sure you wish to delete ${
        length > 1 ? "these" : "this"
      } ${length} ${length > 1 ? "items" : "item"}?`}</p>
      <div className="deleteConfirmActions">
        <Button
          onClick={() => {
            deleteHandle();
            setdeleteConfirm(true);
          }}
          theme="danger"
          title="Ok"
        />
        <Button onClick={handleDeleteModal} theme="secondary" title="Cancel" />
      </div>
    </div>
  );
}
