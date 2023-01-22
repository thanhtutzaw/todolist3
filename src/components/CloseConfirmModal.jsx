import React from "react";

export default function CloseConfirmModal(props) {
  const { closeHandle, closeConfirm } = props;
  // const [text, settext] = useState(todo && todo.text);
  // const [loading, setloading] = useState(false);

  // const inputRef = useRef(null);
  // useEffect(() => {
  //   if (todo) {
  //     settext(todo.text);
  //   }
  // }, [todo]);

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
