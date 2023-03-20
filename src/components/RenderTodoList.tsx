import useFirestoreData from '@/hooks/useFirestoreData';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Todo from './Todo';
import { useContext } from 'react';
import { AppContext } from '@/Context/AppContext';
import { AppContextType, todosProps } from '@/types';

export function RenderTodoList(props: {
  todoRef: any;
  selectCount: any;
  setselectCount: any;
  SelectedID: any;
  setSelectedID: any;
}) {
  const {
    todoRef,
    selectCount,
    setselectCount,
    SelectedID,
    setSelectedID,
  } = props;
  const { todos, loading } = useFirestoreData();
  const { isPrevent, setisPrevent } = useContext(AppContext) as AppContextType;
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
            isPrevent={isPrevent}
            setisPrevent={setisPrevent}
            todos={todos}
            todo={todo}
            setselectCount={setselectCount}
            SelectedID={SelectedID}
            setSelectedID={setSelectedID}
            key={index}
          />
        ))}
    </ul>
  );
}
