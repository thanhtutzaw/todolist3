import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, serverTimestamp, writeBatch } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SEDNER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
const apps = getApps()
let app
if (!apps.length) {
  app = initializeApp(firebaseConfig);
}
export const db = getFirestore(app)
export const auth = getAuth(app);

export function addTodo(todoRef, inputRef, settodos, todos, setisPrevent) {
  return async (e) => {
    e.preventDefault();
    console.info("%cAdding...", "color:grey");
    todoRef.current.scrollIntoView({ behavior: "smooth" });
    const inputText = inputRef.current.value;
    const data = {
      text: inputText,
      timeStamp: serverTimestamp(),
      completed: false,
    };
    if (inputText !== "") {
      const collectionRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "todos"
      );
      inputRef.current.value = "";

      settodos([...todos, inputText]);

      setisPrevent(true);
      try {
        await addDoc(collectionRef, data, { merge: true });
        setisPrevent(false);
        console.info("%cAdded ✔️ ", "color: green");
      } catch (err) {
        alert(err.message);
      }
    }
  };
}
export function deleteMultipleTodo(setcanDelete, setopenDeleteToast, setloading, setisPrevent, clearSelect, todoRef, SelectedID) {
  return async () => {
    console.info("%cDeleting...", "color:grey");
    setloading(true)
    setcanDelete(true)
    setisPrevent(true);
    clearSelect();

    todoRef.current.scrollIntoView({ behavior: "smooth" });
    const batch = writeBatch(db);
    const chunkSize = 10;
    for (let i = 0; i < SelectedID.length; i += chunkSize) {
      const chunk = SelectedID.slice(i, i + chunkSize);
      // console.log(chunk)
      for (let j = 0; j < chunk.length; j++) {
        const TodoRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          "todos",
          chunk[j]
        );
        batch.delete(TodoRef);
      }
    }
    try {
      setloading(false)
      await batch.commit();
      console.info("%cDeleted !", "color: green");
      setTimeout(async () => {
        setopenDeleteToast(false)
        console.log("close Toast")
        setcanDelete(true)
        setisPrevent(false)
      }, 1500);
    } catch (error) {
      alert("Delete Error !" + error.message);
    }
  };
}