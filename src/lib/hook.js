import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

export  function useUserData() {
    const [user, setuser] = useState(null);
    const [uid, setuid] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;
        unsubscribe = onAuthStateChanged(auth , (user) => {
            if (user) {
                setuser(user)
                setuid(user.uid)
                // console.log(user, uid)
                // const ref = firestore.collection('users').doc(user.uid);
                // unsubscribe = ref.onSnapshot((doc) => {
                //     setUsername(doc.data()?.username);
                // });
            } else {
                setuser(null)
                setuid(null)
            }
        })

        return unsubscribe;
    }, [user, uid]);

  return { user ,uid }
}
