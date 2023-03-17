import { AppContext } from "@/Context/AppContext";
import { AppContextType } from "@/types";
import { useContext, useState } from "react";
import Button from "../Button/Button";

export default function DeleteModal(props: { SelectedID: number[] }) {
  const { SelectedID } = props;
  const {
    DeleteModalMounted,
    setDeleteModalMounted,
    handleDeleteModal,
    setopenDeleteModal,
    openDeleteModal,
    deleteHandle,
  } = useContext(AppContext) as AppContextType;
  const [deleteConfirm, setdeleteConfirm] = useState(false);
  const mountModal = {
    animation: "deleteModalMount 300ms ease-in",
  };
  const unmountModal = {
    animation: "deleteModalUnmount 300ms ease-out",
    animationFillMode:'forwards'
  };
  const confirmAnimation = {
    animation: "confirmAnimation 300ms ease-out",
    animationFillMode:'forwards'
  };
  const length = SelectedID.length;
  const isPlural = length > 1;
  return (
    DeleteModalMounted &&
    <div
      style={
        openDeleteModal
          ? mountModal
          : deleteConfirm
          ? confirmAnimation
          : unmountModal
      }
      className="deleteConfirmModal"
      onAnimationEnd={() => {
        if (!openDeleteModal) {
          setDeleteModalMounted(false);
          // setopenDeleteModal(false)
        }
      }}
    >
      <p>{`Are you sure you wish to delete ${
        isPlural ? "these" : "this"
      } ${length} ${isPlural ? "items" : "item"}?`}</p>
      <div className="actions">
        <Button
          onClick={() => {
            deleteHandle();
            setdeleteConfirm(true);
          }}
          theme="danger"
        >
          Ok
        </Button>

        <Button
          onClick={() => {
            setopenDeleteModal(false);
          }}
          theme="secondary"
        >
          Cancel
        </Button>
      </div>
    </div> 
        
        
  );
}
