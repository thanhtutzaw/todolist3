import React from "react";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";

export default function SelectModal(props) {
  const {
    handleDeleteModal,
    deleteloading,
    clearSelect,
    SelectedID,
    setisPrevent,
  } = props;
  function editHandle() {
    document.getElementById("editModal").showModal();
  }
  return (
    <div
      onAnimationEnd={(e) => {
        if (!props.selecting) {
          props.setmounted(false);
        }
      }}
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
          style={{
            pointerEvents:
              deleteloading || SelectedID.length > 1 ? "none" : "initial",
          }}
          disabled={deleteloading || SelectedID.length > 1}
          onClick={editHandle}
          className={`edit ${SelectedID.length > 1 ? "disabled" : ""}`}
        >
          Edit
        </button>

        <button
          style={{ pointerEvents: deleteloading ? "none" : "initial" }}
          disabled={deleteloading}
          onClick={(e) => {
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
