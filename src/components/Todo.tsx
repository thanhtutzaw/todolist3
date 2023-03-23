import { auth, db } from '@/lib/firebase';
import { todosProps } from '@/types';
import { doc, updateDoc } from 'firebase/firestore';
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
  async function checkStatusHandle() {
    if (!db) {
      alert('Firestore database is not available');
      throw new Error('Firestore database is not available');
    }
    if (!auth.currentUser) {
      alert('User is not authenticated');
      throw new Error('User is not authenticated');
    }
    const id = todo?.id;
    if (id === undefined) return;
    const collectionRef = doc(db, 'users', auth.currentUser.uid, 'todos', id?.toString());
    console.log(collectionRef);
    setchecked(!checked);
    const newData = {
      ...todo,
      // completed: checked,
      completed: !todo?.completed,
    };
    setisPrevent(true);
    try {
      await updateDoc(collectionRef, newData);
      setisPrevent(false);
    } catch (error: any) {
      alert('Update Error ! ' + error.message);
    }
  }
  return mounted ? (
    <li
      // style={{scale:todo?.completed ? 0 : 1}}
      // style={{ transform: todo?.completed ? 'translateX(500px)' : '' }}
      onTransitionEnd={(e) => {
        if (todo?.completed === true) {
          // setmounted(false)
        }
      }}
      className={`todo ${isSelect ? 'selected' : ''} ${todo?.completed === true ? 'checked' : ''}`}
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
  ) : (
    <></>
  );
};
export default Todolist;
