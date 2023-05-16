import { AppContext } from '@/Context/AppContext';
import { checkStatus } from '@/lib/firestore';
import { AppContextType, todosProps } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import 'react-loading-skeleton/dist/skeleton.css';
const Todolist = (props: {
  SelectedID: number[];
  todo: todosProps | null;
  setSelectedID: Function;
  setselectCount: Function;
}) => {
  const { setselectCount, todo, SelectedID, setSelectedID } = props;
  const { labels, filter } = useContext(AppContext) as AppContextType;
  const { tab, settab, dateLocale, setisPrevent } = useContext(AppContext) as AppContextType;
  const [isSelect, setisSelect] = useState(false);
  const [mounted, setmounted] = useState(true);
  const [checked, setchecked] = useState(todo?.completed ?? false);
  useEffect(() => {
    if (SelectedID.length === 0) {
      setisSelect(false);
      setselectCount(false);
    }
    if (SelectedID.length === filter.length) {
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
  // const date = new Date(timeStamp.toDate()!);
  const date = timeStamp.toDate();
  const label = labels.find((l) => l.id === todo?.label);

  if (!mounted) return <></>;
  // const [now, setNow] = useState(new Date());
  // const current = new Date().toLocaleTimeString();
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNow(new Date());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     settime(timeAgo(date));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [time]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     settime(timeAgo(date));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   // console.log('loading');
  //   setTimeout(() => {
  //     settime(timeAgo(date));
  //   }, 200);
  // }, [todo?.timeStamp]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     settime(timeAgo(date));
  //   }, 1000);

  //   return () => clearTimeout(interval);
  // }, []);
  const timeAgo = (input: string | Date) => {
    const date = input instanceof Date ? input : new Date(input);
    // return date.toLocaleDateString() + 'aheefek';
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
        // settime(dateLocale === 'Myanmar' ? myanmarDate : date);
        // console.log('returning');
        return dateLocale === 'Myanmar' ? myanmarDate : date;
      }
    }
  };
  const [time, settime] = useState(timeAgo(date));
  useEffect(() => {
    const interval = setInterval(() => {
      settime(timeAgo(date));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [date]);

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
        <p className="date">
          {/* <p style={{ lineHeight: dateLocale === 'Myanmar' ? '1' : 'initial' }} className="date"> */}
          {time}
        </p>
        {todo?.label &&
          label?.text &&
          todo.label !== 'undefined' &&
          (tab === '' || tab === 'all') && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                settab(label?.text);
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
