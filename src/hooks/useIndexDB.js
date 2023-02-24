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
    function getDataFromIndexDB(indexDB) {
        var transaction = indexDB.transaction(
            ["firebaseLocalStorage"],
            "readwrite"
        );
        transaction.oncomplete = function (e) {
            // console.log("transaction complete");
        };
        transaction.onerror = function (e) {
            console.error(e);
        };
        var objectStore = transaction.objectStore("firebaseLocalStorage");
        objectStore.openCursor().onsuccess = async (e) => {
            let cursor = e.target.result;
            if (cursor) {
                setuserphoto(cursor.value.value.photoURL);
                setuserName(cursor.value.value.displayName)
                cursor.continue()
            }
        };
    }
    return {userName , userphoto}
}
