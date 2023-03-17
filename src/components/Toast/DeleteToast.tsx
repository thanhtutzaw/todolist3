import { AppContext } from "@/Context/AppContext";
import { AppContextType } from "@/types";
import Button from "@Elements/Button/Button";
import { useContext } from "react";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import s from "./Toast.module.css";
type DeleteToastItemProps = {
  canDelete: boolean;
  setopenDeleteToast: Function;
  setcanDelete: Function;
};

export default function DeleteToast(props: DeleteToastItemProps) {
  const { setcanDelete, canDelete, setopenDeleteToast } = props;

  const {
    undoCount,
    deleteloading,
    setloading,
    openDeleteToast,
    setDeleteToastMounted,
  } = useContext(AppContext) as AppContextType;
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
          : !canDelete
          ? cancelDeleteToast
          : exitDeleteToast
      }
      className={s.deleteToast}
    >
      {!canDelete && !deleteloading && <p>Canceled</p>}
      {deleteloading
        ? canDelete && (
            <>
              <p>Deleting {`in ${undoCount}s`}</p>
              <Button
                theme="secondary"
                onClick={handleUndo}
                className={s.undoBtn}
              >
                Undo
              </Button>
            </>
          )
        : canDelete &&
          !deleteloading && (
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
