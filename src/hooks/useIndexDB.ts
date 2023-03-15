import { useEffect, useState } from "react";
import photo from "../profile 2.jpg";

export default function useIndexDB() {
  const [userName, setuserName] = useState();
  const [userphoto, setuserphoto] = useState(photo);

  useEffect(() => {
    var request = window.indexedDB.open("firebaseLocalStorageDb", 1);
    request.onsuccess = function (e) {
      console.log("db initilalized");
      const indexDB = request.result;
      getDataFromIndexDB(indexDB);
    };
  }, []);
  function getDataFromIndexDB(indexDB: IDBDatabase) {
    var transaction = indexDB.transaction(
      ["firebaseLocalStorage"],
      "readwrite"
    );
    transaction.oncomplete = () => {
      // console.log("transaction complete");
    };
    transaction.onerror = (error) => {
      console.error(error);
    };
    var objectStore = transaction.objectStore("firebaseLocalStorage");
    objectStore.openCursor().onsuccess = async (e) => {
      const target = e.target as IDBRequest<IDBCursorWithValue>;
      const cursor = target?.result;
      if (cursor) {
        setuserphoto(cursor.value.value.photoURL);
        setuserName(cursor.value.value.displayName);
        cursor.continue();
      }
    };
  }
  return { userName, userphoto };
}
