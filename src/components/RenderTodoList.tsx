import useFirestoreData from '@/hooks/useFirestoreData';
import { AppContextType, labelProps, todosProps } from '@/types';
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
  const { loading, todos, labels } = useFirestoreData();

  const { active } = useContext(AppContext) as AppContextType;
  if (todos.length === 0 && !loading) return <p className="empty">Create Some Todo !</p>;
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

  const activeTab = labels.find((l) => l.text === active);
  const [filter, setfilter] = useState<todosProps[] | null[]>([]);
  useEffect(() => {
    setfilter(
      todos.filter((t) => {
        if (active === '') {
          return todos;
        } else {
          return t.label === activeTab?.id;
        }
      })
    );
  }, [todos, activeTab]);

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
            todos={todos}
            setselectCount={setselectCount}
            SelectedID={SelectedID}
            setSelectedID={setSelectedID}
            key={todo?.id}
          />
        ))}
    </ul>
  );
}
