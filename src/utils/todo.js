import { addDoc, collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";

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

            // pendingOps.add = (await addDoc(collectionRef, data, { merge: true }))
            // const cleanup = () => pendingOps.delete(addDoc);
            // console.log({addDoc})
            // await addDoc.then(cleanup).catch(cleanup)
        }
    };
}
export function deleteTodo(setcanDelete, canDelete, counter, setcounter, setopenDeleteToast, setloading, setisPrevent, clearSelect, todoRef, SelectedID) {
    return async () => {
        // console.log(canDelete)
        console.info("%cDeleting...", "color:grey");
        setloading(true)
        setcanDelete(true)
        // setopenDeleteToast(true)
        setisPrevent(true);
        clearSelect();

        todoRef.current.scrollIntoView({ behavior: "smooth" });
        // await deleteDoc(doc(db, "users",UserId, "todos", SelectedID.toString()));
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
        // console.log("undo ?")
        try {

            // if(canDelete === false){
            //     clearTimeout(deleteTimer)
            //     setopenDeleteToast(false)
            // }
            setisPrevent(false);
            // const deleteTimer = setTimeout(async () => {
                // console.log({ canDelete })
                setloading(false)
                await batch.commit();
                console.info("%cDeleted !", "color: green");
                setTimeout(async () => {
                    setopenDeleteToast(false)
                    console.log("close Toast")
                    setcanDelete(true)  
                }, 1500);
            // }, 5000);

        } catch (error) {
            alert("Delete Error !" + error.message);
        }
    };
}