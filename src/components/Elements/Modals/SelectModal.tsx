import { MouseEventHandler } from "react";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";

export default function SelectModal(props: {
  mountStyle: any;
  unmountStyle: any;

  SelectedID: number[];
  deleteloading: boolean;
  selecting: boolean;
  // SelectModalMounted: boolean;
  setmounted: Function;
  clearSelect: Function;
  // setSelectModalMounted: Function;
  setisPrevent: Function;
  handleDeleteModal: Function;
  openEditModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const {
    // SelectModalMounted,
    // setSelectModalMounted,
    SelectedID,
    clearSelect,
    setisPrevent,
    openEditModal,
    deleteloading,
    handleDeleteModal,
  } = props;

  return (
    <div
      // onAnimationEnd={() => {
      //   if (!props.selecting) {
      //     props.setmounted(false);
      //   }
      // }}
      style={props.selecting ? props.mountStyle : props.unmountStyle}
      // style={mounted ? props.mountStyle : props.unmountStyle}
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
          // style={{
          //   pointerEvents:
          //     deleteloading || SelectedID.length > 1 ? "none" : "initial",
          // }}
          disabled={deleteloading || SelectedID.length > 1}
          onClick={openEditModal}
          className={`edit ${SelectedID.length > 1 ? "disabled" : ""}`}
        >
          Edit
        </button>

        <button
          style={{ pointerEvents: deleteloading ? "none" : "initial" }}
          disabled={deleteloading}
          onClick={() => {
            handleDeleteModal();
            // e.stopPropagation();
            // if (
            //   window.confirm(
            //     `Are you sure you wish to delete ${
            //       SelectedID.length > 1 ? "these" : "this"
            //     } ${SelectedID.length} ${
            //       SelectedID.length > 1 ? "items" : "item"
            //     }?`
            //   )
            // ) {
            //   props.deleteHandle();
            // }
          }}
          className="delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
