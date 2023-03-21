import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { RefObject, SetStateAction, useContext } from 'react';
import { auth, db } from './firebase';
import { AppContextType, todosProps } from '@/types';
import { AppContext } from '@/Context/AppContext';
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
      timeStamp: serverTimestamp(),
      completed: false,
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
        console.info('%cAdded ✔️ ', 'color: green');
      } catch (err: any) {
        alert(err.message);
      }
    }
  });
}

export function deleteMultipleTodo(
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
    const batch = writeBatch(db!);
    const chunkSize = 10;
    for (let i = 0; i < SelectedID.length; i += chunkSize) {
      const chunk = SelectedID.slice(i, i + chunkSize);
      // console.log(chunk)
      for (let j = 0; j < chunk.length; j++) {
        const TodoRef = doc(db, 'users', auth.currentUser.uid, 'todos', chunk[j]);
        batch.delete(TodoRef);
      }
    }
    try {
      setloading(false);
      await batch.commit();
      console.info('%cDeleted !', 'color: green');
      setTimeout(async () => {
        setopenDeleteToast(false);
        console.log('close Delete Toast');
        setcancelDelete(true);
        setisPrevent(false);
      }, 1500);
    } catch (error: any) {
      alert('Delete Error !' + error.message);
    }
  };
}
export function updateTodo(
  id: string,
  editModalRef: RefObject<HTMLDialogElement>,
  text: any,
  todo: { text: any },
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
    const collectionRef = doc(db, 'users', auth.currentUser.uid, 'todos', id);
    const newData = {
      ...todo,
      text,
    };
    if (text !== todo.text) {
      console.info('%cUpdating...', 'color:grey');
      setloading(true);

      setisPrevent(true);
      try {
        await updateDoc(collectionRef, newData);
        editModalRef.current?.close();
        console.info('%cUpdated ✔️', 'color:green');
        setloading(false);
        setisPrevent(false);
        clearSelect();
      } catch (error: any) {
        alert('Update Error ! ' + error.message);
      }
    } else {
      closeEditModal();
    }
  };
}
