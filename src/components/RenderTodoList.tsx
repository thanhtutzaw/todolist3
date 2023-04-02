import useFirestoreData from '@/hooks/useFirestoreData';
import { todosProps } from '@/types';
import { RefObject } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Todo from './Todo';

export function RenderTodoList(props: {
  todoRef: RefObject<HTMLUListElement>;
  todos: todosProps[] | null[];
  sortedTodo: todosProps[];
  SelectedID: number[];
  selectCount: boolean;
  addLoading: boolean;
  setSelectedID: Function;
  setselectCount: Function;
}) {
  const {
    sortedTodo,
    addLoading,
    todos,
    todoRef,
    selectCount,
    setselectCount,
    SelectedID,
    setSelectedID,
  } = props;
  const { loading } = useFirestoreData();

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
        sortedTodo.map((todo) => (
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
