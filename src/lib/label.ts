import { labelProps } from '@/types';
import { auth, db } from './firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export function addLabel(
  labelTextBox: string | null,
  setlabels: Function,
  labels: labelProps[] | null[],
  setisPrevent: Function
): Promise<void> {
  return new Promise<void>(async () => {
    // return async (e: FormEventHandler<HTMLFormElement>) => {
    console.info('%cAdding...', 'color:grey');
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
export function updateLabel(
  id: string,
  labelTextBox: string | null,
  // setlabels: Function,
  // labels: labelProps[] | null[],
  l: labelProps,
  setisPrevent: Function,
  settab: Function,
  setMounted: Function
): Promise<void> {
  return new Promise<void>(async () => {
    if (l.text === labelTextBox) return;
    // return async (e: FormEventHandler<HTMLFormElement>) => {
    console.info('%cUpdating...', 'color:grey');
    const data = {
      // timeStamp: serverTimestamp(),
      // date: new Date(.toDate()).toLocaleDateString('en-US', {
      //   day: 'numeric',
      //   month: 'short',
      //   year: 'numeric',
      // }),
    };
    const newData = {
      ...l,
      text: labelTextBox,
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
      const collectionRef = doc(db, 'users', auth.currentUser.uid, 'labels', id);
      //   inputRef.current.value = '';

      // setlabels([...labels, labelTextBox]);

      setisPrevent(true);
      try {
        await updateDoc(collectionRef, newData);
        settab(labelTextBox);
        setisPrevent(false);
        setMounted(false);
        console.info('%Updated Label ✔️ ', 'color: green');
      } catch (error: any) {
        setisPrevent(false);
        alert('Error in Updating Label !' + error.message);
        console.error('Error in Updating Label !' + error);
      }
    }
  });
}
