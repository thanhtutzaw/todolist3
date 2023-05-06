import { auth, db } from '@/lib/firebase';
import { labelProps, todosProps } from '@/types';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFirestoreData() {
  const [loading, setloading] = useState(true);
  const [todos, settodos] = useState<todosProps[]>([]);
  const [labels, setlabels] = useState<labelProps[]>([]);
  // const sortedTodo = todos.sort(
  //   (todo) => todo.timeStamp?.nanoseconds! - todo.timeStamp?.nanoseconds!
  // );
  // const timeAgo = (input: any) => {
  //   const timeStamp = new Timestamp(input.seconds!, input.nanoseconds!).toDate();
  //   // const date = timeStamp.toDate();
  //   const date = timeStamp instanceof Date ? timeStamp : new Date(timeStamp);
  //   // return date.toLocaleDateString() + 'aheefek';
  //   const formatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
  //   const ranges = {
  //     years: 3600 * 24 * 365,
  //     months: 3600 * 24 * 30,
  //     weeks: 3600 * 24 * 7,
  //     days: 3600 * 24,
  //     hours: 3600,
  //     minutes: 60,
  //     seconds: 1,
  //   };
  //   const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  //   let key: keyof typeof ranges;
  //   for (key in ranges) {
  //     if (ranges[key] < Math.abs(secondsElapsed)) {
  //       const delta = secondsElapsed / ranges[key];
  //       const date = formatter.format(Math.round(delta), key);
  //       const ago = 'က';
  //       const day = 'ရက်နေ့';
  //       const week = 'ပတ်';
  //       const month = 'လ';
  //       const year = 'နှစ်';
  //       const hour = 'နာရီ';
  //       const minute = 'မိနစ်';
  //       const second = 'စက္ကန့်';
  //       const myanmarDate =
  //         'လွန်ခဲ့သော ' +
  //         date
  //           .replace('ago', ago)
  //           .replace('in', '')
  //           .replace('d', day)
  //           .replace('mo', month)
  //           .replace('w', week)
  //           .replace('y', year)
  //           .replace('h', hour)
  //           .replace('m', minute)
  //           .replace('s', second);
  //       // settime(dateLocale === 'Myanmar' ? myanmarDate : date);
  //       // console.log('returning');
  //       //  return dateLocale === 'Myanmar' ? myanmarDate : date;
  //       return date;
  //     }
  //   }
  // };
  useEffect(() => {
    let unsubscribe: Function;
    let unsubscribeLabel: Function;
    // let unsubscribe: undefined | (() => void);
    // let unsubscribeLabel: undefined | (() => void);

    const unsub = onAuthStateChanged(auth, (user) => {
      // if (!user || !db) return;
      if (!user || !db) {
        // If user is not logged in or db is not initialized, unsubscribe from the listeners if they were previously set
        if (unsubscribe) {
          unsubscribe();
        }
        if (unsubscribeLabel) {
          unsubscribeLabel();
        }
        return;
      }

      if (user && db) {
        const q = query(
          collection(db, 'users/' + user.uid + '/todos'),
          orderBy('timeStamp', 'desc')
        );
        const queryLabel = query(
          collection(db, 'users/' + user.uid + '/labels'),
          orderBy('timeStamp', 'desc')
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
              // date: timeAgo(doc.data().timeStamp),
            }))
          );

          setloading(false);
        });
      }
      // else if ((window.location.href = '/login')) {
      //   unsubscribe();
      //   unsubscribeLabel();
      // }
    });
    // return () => {
    //   unsubscribe();
    //   unsubscribeLabel();
    //   unsub();
    // };
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (unsubscribeLabel) {
        unsubscribeLabel();
      }
      unsub();
    };
  }, []);
  return { labels, setlabels, todos, settodos, loading };
}
