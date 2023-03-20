import { todosProps } from "@/types";
import { useState } from "react";

export default function useSelect(todos?: todosProps[] | null[]) {
  const [SelectedID, setSelectedID] = useState<any[]>([]);
  const [selectCount, setselectCount] = useState(false);

  function clearSelect() {
    setSelectedID([]);
    setselectCount(false);
  }
  function selectAll() {
    const items = [];
    if(todos?.length === 0 || !todos) return;
    // if(!todos || todos.length === 0 || todos === null) return;
    for (let i = 0; i < todos.length; i++) {
      const id = todos[i]?.id;
      items.push(id);
    }
    setSelectedID(items);
    setselectCount(true);
  }
  return {
    SelectedID,
    setSelectedID,
    selectCount,
    setselectCount,
    clearSelect,
    selectAll,
  };
}
