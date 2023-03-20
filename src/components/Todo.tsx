import { todosProps } from '@/types';
import { useEffect, useState } from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import 'react-loading-skeleton/dist/skeleton.css';

const Todolist = (props: {
  isPrevent: boolean;
  setisPrevent: Function;
  setselectCount: Function;
  todos: todosProps[] | null[];
  todo: todosProps | null;
  SelectedID: number[];
  setSelectedID: Function;
}) => {
  const { isPrevent, setisPrevent, setselectCount, todos, todo, SelectedID, setSelectedID } = props;

  const [isSelect, setisSelect] = useState(false);
  useEffect(() => {
    if (SelectedID.length === 0) {
      setisSelect(false);
      setselectCount(false);
    }
    if (SelectedID.length === todos.length) {
      console.log(SelectedID.length, todos.length);
      setisSelect(true);
    }
    if (SelectedID.length > 0) {
      setisPrevent(true);
    }
  }, [SelectedID, isPrevent]);
  const isSelecting = isSelect && SelectedID.length !== 0;
  return (
    <li
      onClick={() => {
        setisSelect((prev) => !prev);
        if (isSelecting) {
          if (SelectedID.length === 1) {
            setisPrevent(false);
          }
          setSelectedID(SelectedID.filter((id) => id !== todo?.id));
        } else {
          setSelectedID([...SelectedID, todo?.id]);
          setselectCount(true);
        }
      }}
      className={`todo ${isSelect ? 'selected' : ''}`}
    >
      <label className={`todo-label`}>{todo?.text}</label>

      {isSelecting ? (
        <RiCheckboxCircleFill className="todo-checkbox-fill" />
      ) : (
        <RiCheckboxBlankCircleLine values={todo?.id?.toString()} className="todo-checkbox" />
      )}
    </li>
  );
};
export default Todolist;
