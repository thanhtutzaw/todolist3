import { AppContext } from '@/Context/AppContext';
import { AppContextType, todosProps } from '@/types';
import { useCallback, useContext, useState } from 'react';

export default function useSelect(todos?: todosProps[] | null[]) {
  const [SelectedID, setSelectedID] = useState<any[]>([]);
  const [selectCount, setselectCount] = useState(false);
  const { filter, setfilter } = useContext(AppContext) as AppContextType;
  const clearSelect = useCallback(() => {
    setSelectedID([]);
    setselectCount(false);
  }, []);
  function selectAll() {
    const items = [];
    if (filter?.length === 0 || !filter) return;
    // if(!todos || todos.length === 0 || todos === null) return;
    for (let i = 0; i < filter.length; i++) {
      const id = filter[i]?.id;
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
