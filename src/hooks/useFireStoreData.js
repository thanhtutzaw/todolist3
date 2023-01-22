import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from "../lib/firebase";
export default function useFireStoreData() {
    const [loading, setloading] = useState(true);

    const [todos, settodos] = useState([]);
const nevigate = useNavigate()
    useEffect(() => {
        let unsubscribe;
        // if(!todos){
        //   setloading
        // }
        // if (todos.length > 0) {
        //   setloading(false)
        //   return;
        // }

        // if (!loading) return; 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(
                    collection(db, "users/" + user.uid + "/todos"), orderBy("timeStamp", "desc")
                );
                unsubscribe = onSnapshot(q, (snapshot) => {
                    // console.log(snapshot)
                    // window.BeforeUnloadEvent = function () {
                    //   return "A XHR request is pending, are you sure you want to leave ?";
                    // }
                    settodos(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                    setloading(false)
                });
            }
            else {
                // nevigate("/login");
                unsubscribe();
            }
        })
        return () => unsubscribe();
    }, []);
    return [todos,settodos , loading]
}
