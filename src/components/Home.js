import React, { useEffect, useState } from "react";
import Header from "./Header";
import Todolist from "./Todolist";
import Nav from "./Nav";
import photo from "../profile 2.jpg";
import { CgChevronRightR } from "react-icons/cg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
// import Tools from "./Tools";
// Home js
function Home() {
  // window.addEventListener('pageshow', (event) => {
  //   if (event.persisted) {
  //     console.log('This page was restored from the bfcache.');
  //   } else {
  //     console.log('This page was loaded normally.');
  //   }
  // });
  const [text, settext] = useState("");
  const [todos, settodos] = useState([]);
  let id; //  for profile 
  const [userName, setuserName] = useState();
  const [userphoto, setuserphoto] = useState(photo);
  const [UserId, setUserId] = useState();
  // const [user, setuser] = useState(null)
  // console.log(current)
  const nevigate = useNavigate();
  // console.log(todos)
  const auth = getAuth();
  // const user = auth.currentUser;
  useEffect(() => {
    // const current = auth.currentUser
    // console.log(current)
    if (localStorage.getItem("isUsersignin") === "true") {
      nevigate("/");
    } else {
      nevigate("/login");
    }
    // get profile from firebase indexDb
    var request = window.indexedDB.open("firebaseLocalStorageDb", 1);
    request.onsuccess = function (e) {
      console.log("db initilalized");
      const indexDB = request.result;
      getData(indexDB);
    };
  }, []);
  function getData(indexDB) {
    // console.log("this is get data");
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
        cursor.continue();
        id = cursor.value.value.uid;
        if (id) {
          // const q = query(
          //   collection(db, "users/" + id + "/todos"),
          //   orderBy("timeStamp", "desc")
          // );
          // onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
          //   // snapshot.docChanges().map((change) => {
          //   //   // if (change.type === "added") {
          //   //   //   // console.log(change.doc.data())
          //   //   //   // id: doc.id,
          //   //   //   // ...doc.data(),
          //   //   // }
          //   // })
          //   const source = snapshot.metadata.fromCache ? "local cache" : "server";
          //   console.log("Data came from =" + source);
          //   console.log("data rendered = " + id); 
          // });
          // console.log(id);
          // console.log(id)
        }
      }
    };
  }

  useEffect(() => {
    let unsubscribe
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setuser(user)
        setUserId(user.uid);
        // console.log(user.uid)
        const q2 = query(
          collection(db, "users/" + user.uid + "/todos"), orderBy("timeStamp", "desc")
          // collection(db, "users/" + user.uid + "/todos").where('uid', "==" , user.uid),  
          // .where('uid', isEqualTo: user.uid)
          // collection(db, `users/${id}/todos`),            
        );
        unsubscribe = onSnapshot(q2, (snapshot) => {
          settodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          // console.log("data rendered by " + id);
        });
      }
      else {
        unsubscribe()
        // settodos([])
      }
    })
    return () => unsubscribe;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      text,
      timeStamp: serverTimestamp(),
      completed: false,
    };
    if (text !== "") {
      const collectionRef = collection(db, "users", UserId, "todos");
      // console.log(collectionRef)
      // addDoc(userRef,{
      //   text,
      //   completed:false
      // })
      settodos([...todos, text]);
      // console.log(todos )  
      addDoc(collectionRef, data, { merge: true });
      settext("")
      // console.log(todos.id , typeof(todos.id))
    }
  };
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nevigate("/login");
      localStorage.setItem("isUsersignin", "false");
    }
  });
  return (
    <div className="main container ">
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>
      {/* <Tools /> */}
      <Header userphoto={userphoto} userName={userName} todoLength={todos.length} />
      <div className="todo-parent row">
        {todos.map((todo, index) => (
          <>
            <p style={{ backgroundColor: 'gray' }}>{todo.id}</p>
            <Todolist todo={todo} key={index} />
          </>
        ))}
      </div>
      <Nav text={text} settext={settext} handleSubmit={handleSubmit} />
    </div>
  );
}
export default Home;
