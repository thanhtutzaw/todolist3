import { useState } from "react";

export default function useSelect(todos) {
    const [SelectedID, setSelectedID] = useState([]);
    const [selectCount, setselectCount] = useState(false);

    function clearSelect() {
        setSelectedID([])
        setselectCount(false)
        // setisPrevent(prev => !prev)
    }
    function selectAll() {
        // todos.map(todo => setSelectedID(todo.id))
        const items = []
        for (let i = 0; i < todos.length; i++) {
            const id = todos[i].id
            items.push(id)
        }
        setSelectedID(items)
        setselectCount(true)
    }
    return { SelectedID, setSelectedID, selectCount, setselectCount, clearSelect, selectAll }
}