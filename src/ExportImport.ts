import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { todosProps } from './types';

export function exportTodo(todos: todosProps[] | null[]) {
  const length = todos.length;
  const isPlural = length > 1 ? 'items' : 'item';
  const dataStr = JSON.stringify(
    todos.map((t) => {
      return {
        ...t,
        // timeStamp: t?.timeStamp?.toJSON(),

        // date: new Date(t?.timeStamp?.toDate()!).toLocaleDateString('en-US', {
        //   day: 'numeric',
        //   month: 'short',
        //   year: 'numeric',
        // }),
      };
    })
  );
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let fileName = 'data.json';
  let linkElement = document.createElement('a') as HTMLAnchorElement;
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
  alert(`Exported ${length} ${isPlural} to this Device ✨`);
}

export function importTodo(
  settodos: Function,
  setisPrevent: Function,
  setopentools: Function,
  fileInput: HTMLInputElement,
  todos: todosProps[] | null[]
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
    const newDatas = JSON.parse(dataStr) as todosProps[];
    console.log(newDatas);
    // console.log(newDatas);
    // newDatas.map((d) => {
    // console.log(d.timeStamp);
    // });

    settodos([
      ...todos,
      // ...newDatas,
      newDatas.map((d) => {
        return {
          ...d,
          // timeStamp: new Timestamp(d.timeStamp?.nanoseconds!, d.timeStamp?.seconds!),
        };
      }),
      // newDatas.map((d) => {
      //   return {
      //     ...d,
      //     newTimeStamp: d.timeStamp?.toDate(),
      //   };
      // }),
      // newDatas.map((d) => {
      //   return { ...d, timeStamp: d.timeStamp?.toJSON() };
      // }),
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
    try {
      newDatas.map(async (d) => {
        await setDoc(doc(collectionRef, d.id.toString()), {
          ...d,
          timeStamp: new Timestamp(d.timeStamp?.seconds!, d.timeStamp?.nanoseconds!),
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
