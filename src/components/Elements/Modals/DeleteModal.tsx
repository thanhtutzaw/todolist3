import { MouseEventHandler, useContext, useState } from "react";
import Button from "../Button/Button";
import { AppContext } from "@/Context/AppContext";
import { AppContextType } from "@/types";

export default function DeleteModal(props: {
  SelectedID: number[];
}) {
  const {
    SelectedID,
  } = props;
  const {
    setDeleteModalMounted,
    handleDeleteModal,
    openDeleteModal,
    deleteHandle
  } = useContext(AppContext) as AppContextType;
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
        if (!openDeleteModal) {
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
        >
          Ok
        </Button>

        <Button onClick={handleDeleteModal} theme="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
