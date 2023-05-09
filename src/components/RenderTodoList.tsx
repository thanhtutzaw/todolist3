import { AppContextType, todosProps } from '@/types';
import { RefObject, useContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Todo from './Todo';
import { AppContext } from '@/Context/AppContext';

export function RenderTodoList(props: {
  todoRef: RefObject<HTMLUListElement>;
  SelectedID: number[];
  selectCount: boolean;
  addLoading: boolean;
  setSelectedID: Function;
  setselectCount: Function;
}) {
  const { addLoading, todoRef, selectCount, setselectCount, SelectedID, setSelectedID } = props;
  const { loading, todos, labels } = useContext(AppContext) as AppContextType;

  const { tab, filter, setfilter } = useContext(AppContext) as AppContextType;
  // if (todos?.length === 0 && !loading) return <p className="empty">Create Some Todo !</p>;
  // if (todos.length === 0) return <>empty</>;

  // useEffect(() => {
  //   const dataStr = todos.map((t) => {
  //     return {
  //       timeStamp: t?.timeStamp?.toMillis(),
  //     };
  //   });
  //   const str = JSON.stringify(dataStr);
  //   // console.log(dataStr);
  //   const data = JSON.parse(str);

  // }, [todos]);

  const activeTab = labels.find((l) => l.text === tab);

  useEffect(() => {
    // if (todos.length === 0) return;
    setfilter(
      todos?.filter((t) => {
        if (tab === '' || tab === 'all') {
          return todos;
        } else {
          return t.label === activeTab?.id;
        }
      })
    );
  }, [todos, activeTab, tab]);
  if (filter.length === 0 && todos.length === 0 && (tab === '' || tab === 'all') && !loading)
    return <p className="empty">Create Some Todo !</p>;
  return (
    <ul
      ref={todoRef}
      style={{
        userSelect: selectCount ? 'none' : 'initial',
      }}
    >
      <SkeletonTheme height="55px">
        {loading && <Skeleton className={'loading'} count={10} />}
      </SkeletonTheme>
      {!loading &&
        filter.map((todo) => (
          <Todo
            addLoading={addLoading}
            todo={todo}
            setselectCount={setselectCount}
            SelectedID={SelectedID}
            setSelectedID={setSelectedID}
            key={todo?.id}
          />
        ))}
    </ul>
  );
}
