import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { todosProps } from './types';

export function exportTodo(todos: todosProps[] | null[]) {
  const length = todos.length;
  const isPlural = length > 1 ? 'items' : 'item';
  const dataStr = JSON.stringify(todos);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let fileName = 'data.json';
  let linkElement = document.createElement('a') as HTMLAnchorElement;
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
  alert(`Exported ${length} ${isPlural} to this Device ✨`);
}

export function importTodo(
  fileInput: any,
  setisPrevent: Function,
  todos: todosProps[] | null[],
  settodos: Function,
  setopentools: Function
) {
  if (!fileInput.files) return;
  const uploadFile = fileInput.files[0];
  if (uploadFile.type !== 'application/json') {
    alert('Invalid File Type. JSON Required ! Try Again');
    throw new Error('Invalid File Type. JSON Required !');
  }
  //limit to 57 KB
  if (uploadFile.size >= 58769) {
    alert('File Size Limited to 50 kb ! Try Again');
    throw new Error('File Size Limited to 50 kb !');
  }
  const fileReader = new FileReader();
  fileReader.onload = async (e) => {
    setisPrevent(true);
    const dataStr = e.target?.result as string;
    const newDatas = JSON.parse(dataStr);
    // const importTodo = { ...newDatas };
    settodos([
      ...todos,
      ...newDatas,
      // newDatas.map((d: any) => {
      //   return { ...d };
      // }),
    ]);
    if (!db) {
      alert('Firestore database is not available');
      throw new Error('Firestore database is not available');
    }
    if (!auth.currentUser) {
      alert('User is not authenticated');
      throw new Error('User is not authenticated');
    }
    const collectionRef = collection(db, 'users', auth.currentUser.uid, 'todos');
    // await setDoc(doc(collectionRef, 'new-city-id'), importTodo);
    try {
      newDatas.map(async (d: any) => {
        await setDoc(doc(collectionRef, d.id), {
          ...d,
        });
      });
      console.log('finish import');
      setisPrevent(false);
      setTimeout(() => {
        setopentools(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
    // alert(`Imported ✨`);
    // await addDoc(collectionRef, importTodo);
    // settodos([
    //   ...todos,
    //   newDatas.map((d: any) => {
    //     return { ...todos, ...d };
    //   }),
    // ]);
    // settodos({...todos})
    // settodos([...todos ,data ])
    // settodos([data]);
    // todos.push(data);
    // settodos([ ...todos, data ]);
  };
  fileReader.readAsText(fileInput.files[0]);
}
