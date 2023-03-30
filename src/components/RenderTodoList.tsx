import useFirestoreData from '@/hooks/useFirestoreData';
import { todosProps } from '@/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Todo from './Todo';
import { RefObject } from 'react';

export function RenderTodoList(props: {
  todoRef: RefObject<HTMLUListElement>;
  todos: todosProps[] | null[];
  SelectedID: number[];
  selectCount: boolean;
  setSelectedID: Function;
  setselectCount: Function;
}) {
  const { todos, todoRef, selectCount, setselectCount, SelectedID, setSelectedID } = props;
  const { loading } = useFirestoreData();

  if (todos.length === 0 && !loading) return <p className="empty">Create Some Todo !</p>;

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
        todos.map((todo, index: number) => (
          <Todo
            todo={todo}
            todos={todos}
            setselectCount={setselectCount}
            SelectedID={SelectedID}
            setSelectedID={setSelectedID}
            key={index}
          />
        ))}
    </ul>
  );
}
