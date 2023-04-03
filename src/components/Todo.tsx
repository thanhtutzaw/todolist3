import { AppContext } from '@/Context/AppContext';
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
  const { dateLocale, setisPrevent } = useContext(AppContext) as AppContextType;
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
  const timeStamp = new Timestamp(todo?.timeStamp?.seconds!, todo?.timeStamp?.nanoseconds!);
  const date = new Date(timeStamp.toDate()!);
  // const createdAt = date
  //   ? date?.toLocaleDateString('en-US', {
  //       day: 'numeric',
  //       month: 'short',
  //       year: 'numeric',
  //     })
  //   : '';
  // const finalTimeStamp = createdAt === 'Invalid Date' ? 'Adding' : createdAt;
  function timeAgo(input: string | Date) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    let key: keyof typeof ranges;
    for (key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        const date = formatter.format(Math.round(delta), key);
        const ago = 'က';
        const day = 'ရက်နေ့';
        const week = 'ပတ်';
        const month = 'လ';
        const year = 'နှစ်';
        const hour = 'နာရီ';
        const minute = 'မိနစ်';
        const second = 'စက္ကန့်';
        const myanmarDate =
          'လွန်ခဲ့သော ' +
          date
            .replace('ago', ago)
            .replace('in', '')
            .replace('d', day)
            .replace('mo', month)
            .replace('w', week)
            .replace('y', year)
            .replace('h', hour)
            .replace('m', minute)
            .replace('s', second);
        return dateLocale === 'Myanmar' ? myanmarDate : date;
      }
    }
  }

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
        <p className="date">{timeAgo(date)}</p>
        {/* <p className="date">{finalTimeStamp}</p> */}
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
