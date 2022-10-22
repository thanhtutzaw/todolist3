import React from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

export default function Todolist({ todo }) {
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


