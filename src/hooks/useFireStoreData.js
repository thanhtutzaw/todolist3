import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, auth } from "../lib/firebase";
export default function useFireStoreData() {
    const [loading, setloading] = useState(true);
    const [todos, settodos] = useState([]);
    useEffect(() => {
        let unsubscribe;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(
                    collection(db, "users/" + user.uid + "/todos"), orderBy("timeStamp", "desc")
                );
                unsubscribe = onSnapshot(q, (snapshot) => {
                    settodos(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                    setloading(false)
                });
            }
            else if (window.location.href = "/login") {
                unsubscribe()
            }
        })
        return unsubscribe;
    }, []);
    return [todos, settodos, loading]
}
