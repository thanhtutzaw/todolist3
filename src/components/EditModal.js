import React from 'react'

export default function EditModal(props) {
  const { todo, SelectedID, editInput } = props
    // const { SelectedID } = props;
  return (
    <>
      {/* {todo.id === SelectedID.toString() && <textarea className='editInput' ref={editInput} contentEditable defaultValue={todo.text} key={todo.id} />} */}
      {todo.id === SelectedID.toString() && 
      <div className="editModal" onClick={(e)=>{e.preventDefault(); e.stopPropagation();}} key={todo.id}>        
          <div className="editInput" ref={editInput} contentEditable>{todo.text}</div>
          {/* <textarea autoFocus className="editInput" ref={editInput} defaultValue={todo.text}></textarea> */}
          {/* <div ref={editInput}  contenteditable="true" aria-multiline="true" role="textbox" class="notranslate IZ65Hb-YPqjbf fmcmS-x3Eknd h1U9Be-YPqjbf" dir="ltr" tabindex="0" spellcheck="true">{todo.text}</div> */}
          
      </div>}
    </>
  )
}
