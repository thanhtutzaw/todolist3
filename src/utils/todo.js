import { addDoc, collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
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
        }
    };
}
export function deleteTodo(setToastMounted, setcanDelete, canDelete, counter, setcounter, setopenDeleteToast, setloading, setisPrevent, clearSelect, todoRef, SelectedID) {
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