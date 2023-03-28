import useFirestoreData from '@/hooks/useFirestoreData';
import { todosProps } from '@/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Todo from './Todo';

export function RenderTodoList(props: {
  todoRef: any;
  SelectedID: number[];
  selectCount: boolean;
  setSelectedID: Function;
  setselectCount: Function;
}) {
  const { todoRef, selectCount, setselectCount, SelectedID, setSelectedID } = props;
  const { todos, loading } = useFirestoreData();

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
        todos.map((todo: todosProps, index: number) => (
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
