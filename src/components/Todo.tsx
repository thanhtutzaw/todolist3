import { AppContext } from '@/Context/AppContext';
import useFirestoreData from '@/hooks/useFirestoreData';
import { checkStatus } from '@/lib/firestore';
import { AppContextType, labelProps, todosProps } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import 'react-loading-skeleton/dist/skeleton.css';
const Todolist = (props: {
  addLoading: boolean;
  SelectedID: number[];
  todos: todosProps[] | null[];
  todo: todosProps | null;
  setSelectedID: Function;
  setselectCount: Function;
}) => {
  const { setselectCount, todos, todo, SelectedID, setSelectedID } = props;
  const { labels } = useFirestoreData();
  const { active, setactive, dateLocale, timeAgo, setisPrevent } = useContext(
    AppContext
  ) as AppContextType;
  const [isSelect, setisSelect] = useState(false);
  const [mounted, setmounted] = useState(true);
  const [checked, setchecked] = useState(todo?.completed ?? false);
  useEffect(() => {
    if (SelectedID.length === 0) {
      setisSelect(false);
      setselectCount(false);
    }
    if (SelectedID.length === todos.length) {
      setisSelect(true);
    }
    if (SelectedID.length > 0) {
      setisPrevent(true);
    }
  }, [SelectedID]);
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
  const isSelecting = isSelect && SelectedID.length !== 0;
  const checkStatusHandle = checkStatus(todo, checked, setchecked, setisPrevent);
  const todoClass = `todo ${isSelect ? 'selected' : ''} ${todo?.completed ? 'checked' : ''} `;

  const timeStamp = new Timestamp(todo?.timeStamp?.seconds!, todo?.timeStamp?.nanoseconds!);
  const date = new Date(timeStamp.toDate()!);
  const label = labels.find((l) => l.id === todo?.label);

  if (!mounted) return <></>;
  return (
    <li
      // style={{scale:todo?.completed ? 0 : 1}}
      // style={{ transform: todo?.completed ? 'translateX(500px)' : '' }}
      onTransitionEnd={() => {
        if (todo?.completed === true) {
          // setmounted(false)
        }
      }}
      className={todoClass}
    >
      <label onClick={checkStatusHandle} className={`todo-label`}>
        <p>{todo?.text}</p>
        <p style={{ lineHeight: dateLocale === 'Myanmar' ? '1' : 'initial' }} className="date">
          {timeAgo(date)}
        </p>
        {todo?.label !== null && todo?.label && active === '' && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setactive(label?.text);
            }}
            className="label"
          >
            {label?.text}
          </div>
        )}

        {/* <p className="date">{timeAgo('2023-02-09T15:29:01+0000')}</p> */}
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
