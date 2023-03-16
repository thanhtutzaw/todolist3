import { AppContext } from "@/Context/AppContext";
import { AppContextType } from "@/types";
import { MouseEventHandler, useContext } from "react";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";

export default function SelectModal(props: {
  SelectedID: number[];
  selecting: boolean;
  clearSelect: Function;
  setisPrevent: Function;
  openEditModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const mountStyle = {
    animation: "selectMount 200ms ease-in",
  };
  const unmountStyle = {
    animation: "selectUnmount 250ms ease-out",
  };
  const { selecting, SelectedID, clearSelect, setisPrevent, openEditModal } =
    props;
  const { deleteloading, handleDeleteModal } = useContext(
    AppContext
  ) as AppContextType;
  return (
    <div
      style={selecting ? mountStyle : unmountStyle}
      className={`selectModal `}
    >
      <div>
        <IconContext.Provider value={{ className: "global-class-name" }}>
          <GrClose
            className="closeSelectBtn"
            onClick={() => {
              clearSelect();
              setisPrevent(false);
            }}
          />
        </IconContext.Provider>

        <p className="selectCount">{SelectedID.length}</p>
      </div>
      <div>
        <button
          disabled={deleteloading || SelectedID.length > 1}
          onClick={openEditModal}
          className={`edit ${SelectedID.length > 1 ? "disabled" : ""}`}
        >
          Edit
        </button>

        <button
          style={{ pointerEvents: deleteloading ? "none" : "initial" }}
          disabled={deleteloading}
          onClick={handleDeleteModal}
          className="delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
