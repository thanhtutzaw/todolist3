import React, { useEffect, useState } from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import 'react-loading-skeleton/dist/skeleton.css'

const Todolist = (props) => {
  const { setisPrevent, setselectCount, todos, todo, SelectedID, setSelectedID } = props;

  const [isSelect, setisSelect] = useState(false);

  useEffect(() => {
    if (SelectedID.length === 0) {
      setisSelect(false)
      // setisPrevent(false)
    }
    if (SelectedID.length === 0 && isSelect) {
      setisPrevent(false)
    }
    if (SelectedID.length === todos.length) {
      setisSelect(true)
      // setSelectedID([todo.id])
    }
    // else if(SelectedID.length){
    //   setisSelect(true) 
    // }
  }, [SelectedID]);
  const isSelecting = isSelect && SelectedID.length !== 0
  return (
    <li className={`todo ${isSelect ? 'selected' : ''}`}>
      <label className={`todo-label`}>{todo.text}</label>

      {isSelecting
        ?
        <RiCheckboxCircleFill className="todo-checkbox-fill" onClick={(e) => {
          setisSelect((prev) => !prev);
          setSelectedID(SelectedID.filter((id) => id !== todo.id))
        }} />
        :
        <RiCheckboxBlankCircleLine value={todo.id} className="todo-checkbox" onClick={(e) => {
          setisSelect((prev) => !prev);
          setSelectedID([...SelectedID, todo.id])
          setselectCount(true)
          setisPrevent(true)
        }
        } />
      }
    </li>
  )
}
export default Todolist;