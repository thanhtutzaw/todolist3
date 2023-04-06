import { auth, db } from '@/lib/firebase';
import { labelProps, todosProps } from '@/types';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFirestoreData() {
  const [loading, setloading] = useState(true);
  const [todos, settodos] = useState<todosProps[]>([]);
  const [labels, setlabels] = useState<labelProps[]>([]);
  // const sortedTodo = todos.sort(
  //   (todo) => todo.timeStamp?.nanoseconds! - todo.timeStamp?.nanoseconds!
  // );
  useEffect(() => {
    let unsubscribe: Function;
    let unsubscribeLabel: Function;

    onAuthStateChanged(auth, (user) => {
      if (user && db) {
        const q = query(
          collection(db, 'users/' + user.uid + '/todos'),
          orderBy('timeStamp', 'desc')
        );
        const queryLabel = query(
          collection(db, 'users/' + user.uid + '/labels')
          // orderBy('timeStamp', 'desc')
        );
        unsubscribeLabel = onSnapshot(queryLabel, (snapshot) => {
          setlabels(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
        unsubscribe = onSnapshot(q, (snapshot) => {
          setloading(true);
          settodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              label: ['Foo', 'Bar'],
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
        unsubscribeLabel();
      }
    });
    return () => {
      unsubscribe();
      unsubscribeLabel();
    };
  }, []);
  return { labels, setlabels, todos, settodos, loading };
}
