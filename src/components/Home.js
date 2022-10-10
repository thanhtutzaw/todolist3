import React, { useEffect, useRef, useState } from "react";

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
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db ,auth } from "./Firebase/firebase";
import Tools from "./Tools";


// Home js
function Home() {
  const [text, settext] = useState("");
  const [todos, settodos] = useState([]);

  let id; //  for profile 
  const [User, setUser] = useState([]);
  const [userphoto, setuserphoto] = useState(photo);

  const [UserId, setUserId] = useState();
  // const auth = getAuth();
  // const currentUser = auth.currentUser;

  //   if(currentUser){
  //     setUserId("hdy")
  //   }
  // useEffect(() => {
  // }, []);

  // userId()
  // function userId () {
  //   user.forEach( (u)=> {
  //     console.log(u.uid)
  //   })
  // }
  // window.addEventListener('load', ()=> {
  // })
  useEffect(() => {
    // setLoading(true)
    // get profile from firebase indexDb
    // let isSubscribed = true
    var request = window.indexedDB.open("firebaseLocalStorageDb", 1);
    request.onsuccess = function (e) {
      console.log("db initilalized");
      const indexDB = request.result;
      getData(indexDB);

      // if(isSubscribed){
      //   getData(indexDB)
      // }
      // (isSubscribed ? getData(indexDB) : null)
    };
    // return ()=> ( isSubscribed = false)
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
        cursor.continue();
        // console.log("hey data   "+ data.value.uid)
        // console.log(cursor.value.value.photoURL);
        // (isSubscribed ? setuserphoto(cursor.value.value.photoURL) : null)
        // setUserId()
        id = cursor.value.value.uid;
        if (id) {
          const q = query(
            collection(db, "users/" + id + "/todos"),
            orderBy("timeStamp", "desc")
          );

          // const dataSnap = await getDocs(q);
          //         settodos(

          //           dataSnap.docs.map((doc) => ({
          // setUserId
          //             id: doc.id,
          //               ...doc.data(),
          //   // doc.data() is never undefined for query doc snapshots
          //   // console.log("get once")
          //   // console.log(doc.id, " => ", doc.data());
          // })
          //           )

          // );



          onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {

            snapshot.docChanges().map((change) => {
              if (change.type === "added") {
                console.log(change.doc.data())
                // id: doc.id,
                // ...doc.data(),
              }
            })

            const source = snapshot.metadata.fromCache ? "local cache" : "server";
            console.log("Data came from " + source);
            console.log("data rendered " + id);
          });
          console.log(id);
        }

        const q2 = query(
          collection(db, "users/" + id + "/todos"),
          orderBy("timeStamp", "desc")
        );

        onSnapshot(q2, (snapshot) => {
          settodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          console.log("data rendered " + id);
        });
        // snapshotData(id)
        // console.log(id)
      }
    };
  }
  // console.log(UserId)
  // console.log(User + "from user state")
  // User.map( u => {
  //   console.log(u.uid)
  // })


  // console.log("first ui rendered");

  const snapshotData = (id) => { };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user.uid)
      if (user) {
        console.log("if user" + user.uid)
        // setUser(user);
        setUserId(user.uid);
      }
    })
    // return () => unsub()
    // }
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const todos = [];
    //   querySnapshot.forEach((doc) => {
    //     todos.push({ ...doc.data(), id: doc.id });
    //   });
    //   settodos(todos);
    //   console.log("if user exists data render");
    // });
    // console.log(UserId)
    // getData(user.uid);
    // this function call will console
    // consoleMe()
    // });
    // return () => unsub()
  }, []);

  // const consoleMe = () => {
  //   console.log("lol")
  // }
  // return () => unsub()
  // const docRef = doc(db, "users","todos");
  // const q = query(collection(db,"users/"+user+"/todos") , orderBy('createdAt','desc'));
  // const q = query(collection(db,"users/"+user+"/todos"), orderBy('timeStamp','desc'));

  // const getData = (user) => {
  //   const q = query(
  //     collection(db, "users/" + user + "/todos"),
  //     orderBy("timeStamp", "desc")
  //   );
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const todos = [];
  //     querySnapshot.forEach((doc) => {
  //       todos.push({ ...doc.data(), id: doc.id });
  //     });
  //     settodos(todos);
  //     console.log("if user exists data render");
  //   });
  // };

  // console.log("Current todos ", todos.join(", "));
  // const snapshot = await getDocs(q)
  // settodos(
  //   snapshot.docs.map( (doc) => doc.data().todo)
  // )
  // const todosArray = []
  // const queryData =
  //   settodos(todosArray)
  // console.log(queryData)
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  // useEffect(() => {
  //   const q = collection(db, "todos");
  //   const unsub =  q.onSnapshot( (snap) => {
  //     const todos = []
  //     snap.forEach( (doc) => {
  //       // console.log(doc.id)
  //       todos.push({...doc.data() , id:doc.id})
  //     })
  //   })
  //   settodos(todos)
  //   // const get = async ()=> {

  //   // const querySnapshot = await getDocs(q);
  //   // console.log(querySnapshot)
  //   // querySnapshot.forEach( (doc) => {
  //   //   // console.log(doc.id, " =>  hey", doc.data());
  //   //   console.log("hey")

  //   // });
  //   // }
  //   // get()
  //   // querySnapshot.forEach((doc) => {
  //   //   // doc.data() is never undefined for query doc snapshots
  //   //   console.log(doc.id, " => ", doc.data());
  //   // });
  // }, []);
  //   function data () {
  //     return {
  //         todos: [],
  //         todo: {
  //             text: ""
  //         }
  //     };
  // }

  // console.log(querySnapshot)
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  // const query = useRef(_query).current
  // const docRef = doc(db, "users", UserId,"todos");
  // const docSnap = getDoc(docRef);
  // const getTodos = () => {
  //   const TodosRef = collection(db, "users", UserId, "todos");

  //   TodosRef.onSnapshot(snap => {
  //     const todos = [];
  //     snap.forEach(doc => {
  //         var todo = doc.data();
  //         todo.id = doc.id;
  //         this.todos.push(todo);
  //     });
  // });
  //   // const q = collection(db, "users", "todos")

  // }
  // const q = query(collection(db, "users", "todos"))
  // useEffect(() => {
  // getTodos()
  // const snap = getDocs(q)
  // const unsub =  snap.forEach( (doc)=>{
  //   console.log(doc.id , doc.data())
  // })
  // q.onSnapshot(  (snap) => {
  //   const todosArray = []
  //   snap.forEach( (doc)=>{
  //     const todo = doc.data()
  //     todo.id = doc.id
  //     todosArray.push(todo)
  //     // todosArray.push({...doc.data()})
  //   })
  //   settodos(todosArray)
  // })
  // return () => unsub
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // onAuthStateChanged( auth,(user)=>{
    //   if(user){
    //           setUserId(user.uid);
    //     getData(user.uid)

    //         }
    // })
    //     onAuthStateChanged(auth, (user) => {
    //     if (user)
    //   }
    // console.log("hey");
    // const userRef = addDoc(UserId , collection(db , 'users'))
    // const userRef = doc(db, "users", UserId, "todos", "data")
    const data = {
      text: text,
      // createdAt: new Date(),
      timeStamp: serverTimestamp(),
      completed: false,
    };

    // const userRef = doc(db, "users", UserId, "todos", "this will be ID");
    // const CollectionRef = doc();
    // addDoc(userRef, data, { merge: true });
    // setDoc(userRef, data, { merge: true });

    if (text !== "") {
      const collectionRef = collection(db, "users", UserId, "todos");
      console.log(collectionRef)
      // addDoc(userRef,{
      //   text,
      //   completed:false
      // })
      addDoc(collectionRef, data, { merge: true });
      settodos([...todos, text]);

      settext("")
    }

    // addDoc(userRef,"hey")
    // addDoc(userRef,data)
    // console.log(userRef.id);
    // .then( ()=>{

    // })
    // .catch( (err)=>{
    //   // console.error("You have no access! ".err)
    // })
  };

  const nevigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isUsersignin") === "true") {
      nevigate("/");
    } else {
      nevigate("/login");
    }

    //   const querySnapshot = getDocs(collection(db, "todos"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
  }, []);
  // useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nevigate("/login");
      localStorage.setItem("isUsersignin", "false");
      // setredirect("/login");
    }
  });
  // }, []);
  // if (redirect) {
  //  nevigate(redirect)
  // }

  return (
    <div className="main container ">
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>

      <Tools />
      {/* <Header userphoto={User.photoURL} todoLength={todos.length} /> */}
      <Header userphoto={userphoto} todoLength={todos.length} />

      <div className="todo-parent row">
        {todos.map((todo) => (
            <Todolist todo={todo} key={todo.id} />
        ))}
      </div>
      <Nav text={text} settext={settext} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Home;
