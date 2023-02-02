import React from "react";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";

export default function SelectModal(props) {
  const { clearSelect, SelectedID, setisPrevent } = props;
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
          onClick={editHandle}
          className={`edit ${SelectedID.length > 1 ? "disabled" : ""}`}
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (
              window.confirm(
                `Are you sure you wish to delete ${
                  SelectedID.length > 1 ? "these" : "this"
                } ${SelectedID.length} ${
                  SelectedID.length > 1 ? "items" : "item"
                }?`
              )
            ) {
              props.deleteHandle();
            }
          }}
          className="delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
