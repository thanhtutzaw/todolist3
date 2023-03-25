import { AppContext } from '@/Context/AppContext';
import { checkStatus } from '@/lib/firestore';
import { AppContextType, todosProps } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import 'react-loading-skeleton/dist/skeleton.css';

const Todolist = (props: {
  setselectCount: Function;
  todos: todosProps[] | null[];
  todo: todosProps | null;
  SelectedID: number[];
  setSelectedID: Function;
}) => {
  const { setselectCount, todos, todo, SelectedID, setSelectedID } = props;
  const { isPrevent, setisPrevent } = useContext(AppContext) as AppContextType;
  const [isSelect, setisSelect] = useState(false);
  const [mounted, setmounted] = useState(true);
  const [checked, setchecked] = useState(todo?.completed);
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

  function handleSelect() {
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
  }
  // async function checkStatusHandle()
  const checkStatusHandle = checkStatus(todo, checked, setchecked, setisPrevent);
  const todoClass = `todo
  ${isSelect ? 'selected' : ''} 
  ${todo?.completed === true ? 'checked' : ''}`;
  if (!mounted) return <></>;
  return (
    <li
      // style={{scale:todo?.completed ? 0 : 1}}
      // style={{ transform: todo?.completed ? 'translateX(500px)' : '' }}
      onTransitionEnd={(e) => {
        if (todo?.completed === true) {
          // setmounted(false)
        }
      }}
      className={todoClass}
    >
      <label onClick={checkStatusHandle} className={`todo-label`}>
        {todo?.text}
        {/* {JSON.stringify(todo?.completed)} */}
      </label>
      <div onClick={handleSelect} className="todoActions">
        {isSelecting ? (
          <RiCheckboxCircleFill className="todo-checkbox-fill" />
        ) : (
          <RiCheckboxBlankCircleLine values={todo?.id?.toString()} className="todo-checkbox" />
        )}
      </div>
    </li>
  );
};
export default Todolist;
