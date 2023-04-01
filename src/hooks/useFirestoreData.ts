import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { todosProps } from '@/types';

export default function useFirestoreData() {
  const [loading, setloading] = useState(true);
  const [todos, settodos] = useState<todosProps[]>([]);
  const sortedTodo = todos.sort((todo) => todo.timeStamp?.nanoseconds! - todo.timeStamp?.nanoseconds!);
  useEffect(() => {
    let unsubscribe: Function;

    onAuthStateChanged(auth, (user) => {
      if (user && db) {
        const q = query(
          collection(db, 'users/' + user.uid + '/todos'),
          orderBy('timeStamp', 'desc')
        );
        unsubscribe = onSnapshot(q, (snapshot) => {
          setloading(true);
          settodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              // date: new Date(doc.data().timeStamp.toDate()).toLocaleDateString('en-US', {
              //   day: 'numeric',
              //   month: 'short',
              //   year: 'numeric',
              // }),
            }))
          );
          setloading(false);
        });
      } else if ((window.location.href = '/login')) {
        unsubscribe();
      }
    });
    return () => unsubscribe();
  }, []);
  return {sortedTodo, todos, settodos, loading };
}
