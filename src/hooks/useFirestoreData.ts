import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { todosProps } from '@/types';

export default function useFirestoreData() {
  const [loading, setloading] = useState(true);
  const [todos, settodos] = useState<todosProps[]>([]);
  useEffect(() => {
    let unsubscribe: Function;
    // if (todos.length === 0) {
    //   setloading(false);
    // }
    // setloading(true);

    onAuthStateChanged(auth, (user) => {
      if (user && db) {
        const q = query(
          collection(db, 'users/' + user.uid + '/todos'),
          orderBy('timeStamp', 'desc')
        );
        unsubscribe = onSnapshot(q, (snapshot) => {
          // if (snapshot.size) {
          setloading(true);
          snapshot.docs.map((doc) => {
            // console.log(doc.data().timeStamp);
            // console.log(...doc.data());
          });
          console.log();
          settodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          setloading(false);
          // }else{
          // setloading(false);
          // }
        });
      } else if ((window.location.href = '/login')) {
        unsubscribe();
      }
    });
    return () => unsubscribe();
  }, []);
  return { todos, settodos, loading };
}
