import React from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
function Todolist({ todo }) {
  return (
    <section>
      <ul>
        <li className="todo">
          <RiCheckboxBlankCircleLine className="todo-checkbox" />
          <label className="todo-label">{todo.text}</label>
        </li>
      </ul>
    </section>
  );
}

export default Todolist;
