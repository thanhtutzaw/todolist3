import { todosProps } from "interface";
import { useEffect, useState } from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import "react-loading-skeleton/dist/skeleton.css";

const Todolist = (props: {
  isPrevent: boolean;
  setisPrevent: Function;
  setselectCount: Function;
  todos: todosProps[];
  todo: todosProps;
  SelectedID: number[];
  setSelectedID: Function;
}) => {
  const {
    isPrevent,
    setisPrevent,
    setselectCount,
    todos,
    todo,
    SelectedID,
    setSelectedID,
  } = props;

  const [isSelect, setisSelect] = useState(false);
  useEffect(() => {
    if (SelectedID.length === 0) {
      setisSelect(false);
    }
    if (SelectedID.length > 0) {
    } else {
      setselectCount(false);
    }
    if (SelectedID.length === todos.length) {
      setisSelect(true);
    }
  }, [SelectedID, isPrevent]);
  const isSelecting = isSelect && SelectedID.length !== 0;
  return (
    <li className={`todo ${isSelect ? "selected" : ""}`}>
      <label className={`todo-label`}>{todo.text}</label>

      {isSelecting ? (
        <RiCheckboxCircleFill
          className="todo-checkbox-fill"
          onClick={() => {
            setisSelect((prev) => !prev);
            setSelectedID(SelectedID.filter((id) => id !== todo.id));
            setisPrevent(true);
            if (SelectedID.length === 1) {
              setisPrevent(false);
            }
          }}
        />
      ) : (
        <RiCheckboxBlankCircleLine
          values={todo?.id?.toString()}
          className="todo-checkbox"
          onClick={() => {
            setisSelect((prev) => !prev);
            setSelectedID([...SelectedID, todo.id]);
            setisPrevent(true);
            setselectCount(true);
          }}
        />
      )}
    </li>
  );
};
export default Todolist;
