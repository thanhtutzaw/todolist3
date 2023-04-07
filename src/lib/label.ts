import { labelProps } from '@/types';
import { auth, db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export function addLabel(
  labelTextBox: string | null,
  setlabels: Function,
  labels: labelProps[] | null[],
  setisPrevent: Function
): Promise<void> {
  return new Promise<void>(async () => {
    // return async (e: FormEventHandler<HTMLFormElement>) => {
    // e.preventDefault()
    console.info('%cAdding...', 'color:grey');
    // todoRef.current?.scrollIntoView({ behavior: 'smooth' });
    // const inputText = inputRef.current?.value;
    // const inputText = 'foo';
    const data = {
      text: labelTextBox,
      timeStamp: serverTimestamp(),
      // date: new Date(.toDate()).toLocaleDateString('en-US', {
      //   day: 'numeric',
      //   month: 'short',
      //   year: 'numeric',
      // }),
    };
    if (!db) {
      alert('Firestore database is not available');
      throw new Error('Firestore database is not available');
    }
    if (!auth.currentUser) {
      alert('User is not authenticated');
      throw new Error('User is not authenticated');
    }
    if (labelTextBox) {
      const collectionRef = collection(db, 'users', auth.currentUser.uid, 'labels');
      //   inputRef.current.value = '';

      setlabels([...labels, labelTextBox]);

      setisPrevent(true);
      try {
        await addDoc(collectionRef, data);
        setisPrevent(false);
        console.info('%cAdded ✔️ ', 'color: green');
      } catch (error: any) {
        setisPrevent(false);
        alert('Error in Creating new data !' + error.message);
        console.error('Error in Creating new data !' + error);
      }
    }
  });
}
