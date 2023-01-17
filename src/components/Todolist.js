import React, { useEffect, useState } from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import 'react-loading-skeleton/dist/skeleton.css'

const Todolist = (props) => {
  const { isPrevent, setisPrevent, setselectCount, todos, todo, SelectedID, setSelectedID } = props;

  const [isSelect, setisSelect] = useState(false);
const [clicked, setclicked] = useState(false);
const [unclicked, setunclicked] = useState(false);
  useEffect(() => {
    if (SelectedID.length === 0) {
      setisSelect(false)
      // setisPrevent(false)
    }
    if (SelectedID.length === 0 && isSelect) {
      // setisPrevent("dfdfdsfd")
      // setisPrevent(false)
    }
    if (SelectedID.length > 0) {
      // setisPrevent(true)
    } else {
      // setisPrevent(false)
      setselectCount(false)
    }
    if (SelectedID.length === todos.length) {
      setisSelect(true)
      // setSelectedID([todo.id])
    }
    // else if(SelectedID.length){
    //   setisSelect(true) 
    // }
    // if(clicked && isSelecting){
    //   setisPrevent(true)
    // }else if(unclicked){
    //   // setisPrevent(false)
      
    // }
  }, [unclicked,clicked,SelectedID, isPrevent]);
  function handlePrevent(){
    // setisPrevent((prev)=> !prev)
  }
  const isSelecting = isSelect && SelectedID.length !== 0
  return (
    <li className={`todo ${isSelect ? 'selected' : ''}`}>
      <label className={`todo-label`}>{todo.text}</label>

      {isSelecting
        ?
        <RiCheckboxCircleFill className="todo-checkbox-fill" onClick={(e) => {
          setisSelect((prev) => !prev);
          setSelectedID(SelectedID.filter((id) => id !== todo.id))
          // handlePrevent()
          setisPrevent(true)
          if(SelectedID.length === 1){
            setisPrevent(false)
          }
          // setunclicked(true)
        }} />
        :
        <RiCheckboxBlankCircleLine value={todo.id} className="todo-checkbox" onClick={(e) => {
          setisSelect((prev) => !prev);
          setSelectedID([...SelectedID, todo.id])
          // handlePrevent()
          setisPrevent(true)
          // setclicked(true)
          setselectCount(true)
        }
        } />
      }
    </li>
  )
}
export default Todolist;