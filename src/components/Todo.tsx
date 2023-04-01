import { AppContext } from '@/Context/AppContext';
import useFirestoreData from '@/hooks/useFirestoreData';
import { checkStatus } from '@/lib/firestore';
import { AppContextType, todosProps } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import 'react-loading-skeleton/dist/skeleton.css';
const Todolist = (props: {
  addLoading: boolean;
  SelectedID: number[];
  todo: todosProps | null;
  setSelectedID: Function;
  setselectCount: Function;
  todos: todosProps[] | null[];
}) => {
  const { setselectCount, todos, todo, SelectedID, setSelectedID } = props;
  const { setisPrevent } = useContext(AppContext) as AppContextType;
  const [isSelect, setisSelect] = useState(false);
  const [mounted, setmounted] = useState(true);
  const [checked, setchecked] = useState(todo?.completed ?? false);
  useEffect(() => {
    if (SelectedID.length === 0) {
      setisSelect(false);
      setselectCount(false);
    }
    if (SelectedID.length === todos.length) {
      // console.log(SelectedID.length, todos.length);
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
  // const date = Timestamp.({todo?.timeStamp?.seconds, todo?.timeStamp?.nanoseconds}).toDate()
  // Timestamp.

  const date = new Date(todo?.timeStamp?.toDate()!);
  console.log(todo?.timeStamp?.toDate());
  const createdAt = date
    ? date?.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
  const finalTimeStamp = createdAt === 'Invalid Date' ? 'Adding' : createdAt;

  useEffect(() => {
    console
      .log
      // date?.toLocaleDateString('en-US', { day: 'numeric' }) +
      //   ' ' +
      //   date?.toLocaleDateString('en-US', { month: 'short' }) +
      //   ' ' +
      //   date?.toLocaleDateString('en-US', { year: 'numeric' })
      // todo?.timeStamp?.toDate()
      // todo
      ();
    // console.log(todo?.timeStamp?.toDate().toISOString(), todo?.text);
    // console.log(todo?.timeStamp, todo?.text);
    // console.log('myTime is working', todo?.timeStamp?.toDate(), todo?.text);
  }, []);

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
        {todo?.text}
        {/* <p className="date">{finalTimeStamp}</p> */}
        <p className="date">{finalTimeStamp}</p>
        {/* {fireTime!.toDate().toDateString()} */}
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
