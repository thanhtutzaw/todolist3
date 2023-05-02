import { todosProps } from '@/types';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { RefObject, SetStateAction } from 'react';
import { auth, db } from './firebase';
export function addTodo(
  todoRef: RefObject<HTMLUListElement>,
  inputRef: RefObject<HTMLInputElement>,
  settodos: {
    (value: SetStateAction<todosProps[]>): void;
    (arg0: any[]): void;
  },
  todos: todosProps[] | null[],
  setisPrevent: Function
): Promise<void> {
  return new Promise<void>(async () => {
    // return async (e: FormEventHandler<HTMLFormElement>) => {
    // e.preventDefault()
    console.info('%cAdding...', 'color:grey');
    todoRef.current?.scrollIntoView({ behavior: 'smooth' });
    const inputText = inputRef.current?.value;

    const data = {
      text: inputText,
      completed: false,
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
    if (inputText !== '' && inputRef.current) {
      const collectionRef = collection(db, 'users', auth.currentUser.uid, 'todos');
      inputRef.current.value = '';

      settodos([...todos, inputText]);

      setisPrevent(true);
      try {
        // await addDoc(collectionRef, data, { merge: true });
        await addDoc(collectionRef, data);
        setisPrevent(false);
        // setAddLoading(false);
        console.info('%cAdded ✔️ ', 'color: green');
      } catch (error: any) {
        alert('Error in Creating new data !' + error.message);
        console.error('Error in Creating new data !' + error);
      }
    }
  });
}
export function deleteMultipleTodo(
  setdeleting: Function,
  setcancelDelete: Function,
  setopenDeleteToast: Function,
  setloading: Function,
  setisPrevent: Function,
  clearSelect: Function,
  todoRef: RefObject<HTMLUListElement>,
  SelectedID: string | any[]
) {
  return async () => {
    console.info('%cDeleting...', 'color:grey');
    setloading(true);
    setcancelDelete(true);
    setisPrevent(true);
    clearSelect();
    if (!db) {
      alert('Firestore database is not available');
      throw new Error('Firestore database is not available');
    }
    if (!auth.currentUser) {
      alert('User is not authenticated');
      throw new Error('User is not authenticated');
    }
    todoRef.current?.scrollIntoView({ behavior: 'smooth' });
    const batch = writeBatch(db);
    const chunkSize = 10;
    for (let i = 0; i < SelectedID.length; i += chunkSize) {
      const chunk = SelectedID.slice(i, i + chunkSize);
      // console.log(chunk)
      for (let j = 0; j < chunk.length; j++) {
        const TodoRef = doc(db, 'users', auth.currentUser.uid, 'todos', chunk[j]);
        batch.delete(TodoRef);
      }
    }
    setdeleting(true);
    try {
      setloading(false);
      await batch.commit();
      setdeleting(false);
      console.info('%cDeleted !', 'color: green');
      setTimeout(async () => {
        setisPrevent(false);
        setcancelDelete(true);
        setopenDeleteToast(false);
        console.log('close Delete Toast');
      }, 1500);
    } catch (error: any) {
      alert('Delete Error ! \n' + error.code.toUpperCase());
    }
  };
}
export function updateTodo(
  id: string | number,
  editModalRef: RefObject<HTMLDialogElement>,
  label: string,
  text: string,
  todo: todosProps,
  closeEditModal: Function,
  setloading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  setisPrevent: Function,
  clearSelect: Function
) {
  return async () => {
    if (!db) {
      alert('Firestore database is not available');
      throw new Error('Firestore database is not available');
    }
    if (!auth.currentUser) {
      alert('User is not authenticated');
      throw new Error('User is not authenticated');
    }
    const collectionRef = doc(db, 'users', auth.currentUser.uid, 'todos', id.toString());
    const newData = {
      ...todo,
      label,
      text,
    };
    if (text !== todo.text || label !== todo.label) {
      console.info('%cUpdating...', 'color:grey');
      setloading(true);
      try {
        await updateDoc(collectionRef, newData);
        editModalRef.current?.close();
        console.info('%cUpdated ✔️', 'color:green');
        setloading(false);
        setisPrevent(false);
        clearSelect();
      } catch (error: any) {
        alert('Update Error ! \n' + error.code.toUpperCase());
        console.error('Update Error ! ' + error);
      }
    } else {
      closeEditModal();
    }
  };
}
export function checkStatus(
  todo: todosProps | null,
  checked: boolean,
  setchecked: Function,
  setisPrevent: Function
) {
  return async () => {
    if (!db) {
      alert('Firestore database is not available');
      throw new Error('Firestore database is not available');
    }
    if (!auth.currentUser) {
      alert('User is not authenticated');
      throw new Error('User is not authenticated');
    }
    const id = todo?.id;
    if (id === undefined) return;
    const collectionRef = doc(db, 'users', auth.currentUser.uid, 'todos', id?.toString());
    setchecked(!checked);
    const newData = {
      ...todo,
      // completed: checked,
      completed: !todo?.completed,
    };
    setisPrevent(true);
    try {
      await updateDoc(collectionRef, newData);
      setisPrevent(false);
    } catch (error: any) {
      setisPrevent(false);
      alert('Update Error ! \n' + error.code.toUpperCase());
      console.error('Update Error ! ' + error);
    }
  };
}
