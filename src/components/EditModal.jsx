import React from 'react'

export default function EditModal(props) {
  const { todo, editInput } = props;
  return (
    <>
      {todo && (
        <div>
          <div className="editModal" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} key={todo.id}>
            <div className="editInput" ref={editInput} contentEditable>{todo.text}</div>
          </div>
        </div>
      )}
    </>
  )
}
