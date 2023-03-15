import Button from "@Elements/Button/Button";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import s from "./Toast.module.css";
type DeleteToastItemProps = {
  setDeleteToastMounted: Function;
  setopenDeleteToast: Function;
  setcanDelete: Function;
  setloading: Function;
  openDeleteToast: boolean;
  deleteloading: boolean;
  canDelete: boolean;
  counter: number;
};

export default function DeleteToastItem(props: DeleteToastItemProps) {
  const {
    setcanDelete,
    setloading,
    openDeleteToast,
    setDeleteToastMounted,
    deleteloading,
    canDelete,
    counter,
    setopenDeleteToast,
  } = props;
  const enterDeleteToast = {
    transformStyle: "preserve-3d",
    animation: "enterDeleteToast .4s ease-in-out",
  };
  const cancelDeleteToast = {
    animation: "cancelDeleteToast .4s ease-in-out",
  };
  const LoadingToastOpen = {
    borderRadius: "1rem",
    maxWidth: "200px",
    animation: "LoadingToastOpen .2s ease",
  };
  const exitDeleteToast = {
    maxWidth: "200px",
    borderRadius: "1rem",
    animation: "exitDeleteToast .2s ease-out",
  };
  function handleUndo() {
    setcanDelete(false);
    setloading(false);
  }
  return (
    <div
      onAnimationEnd={() => {
        if (!openDeleteToast) {
          setDeleteToastMounted(false);
        }
      }}
      style={
        openDeleteToast
          ? deleteloading
            ? enterDeleteToast
            : LoadingToastOpen
          : deleteloading
          ? cancelDeleteToast
          : exitDeleteToast
      }
      className={s.toast}
    >
      {deleteloading ? (
        canDelete ? (
          <>
            <p>Deleting {!deleteloading ? `... ` : `in ${counter}s`}</p>
            <Button onClick={handleUndo} className={s.undoBtn}>
              Undo
            </Button>
          </>
        ) : (
          <>
            <p>Canceled</p>
          </>
        )
      ) : (
        <>
          <p>Deleted</p>
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <GrClose
              className="closeSelectBtn"
              onClick={() => {
                setopenDeleteToast(false);
              }}
            />
          </IconContext.Provider>
        </>
      )}
    </div>
  );
}
