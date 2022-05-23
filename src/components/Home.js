import React, { useEffect, useRef, useState } from "react";

import Header from "./Header";
import Todolist from "./Todolist";
import Nav from "./Nav";
// import photo from "..//profile.jpg"

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
import { db } from "./Firebase/firebase";
import Tools from "./Tools";

// import { auth } from './Firebase/firebase';

// Home js
function Home({ Auth }) {
  const [text, settext] = useState("");
  const [todos, settodos] = useState([]);

  const [User, setUser] = useState([]);
  const [userphoto, setuserphoto] = useState("photo");

  const [UserId, setUserId] = useState();
  const auth = getAuth();
  const currentUser = auth.currentUser;

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("setuser")
        setUserId(user.uid);
        // console.log(User + "from user state")
        // User.map( u => {
        //   console.log(u.uid)
        // })
        console.log("first ui rendered");
        // console.log(User)
        // const photoURL = user.photoURL;
        // setuserphoto(photoURL)
        // console.log("photo rendered")

        // User.map( (u) => {
        //   console.log(u)
        // })
        // console.log(User.length)

        const q = query(
          collection(db, "users/" + user.uid + "/todos"),
          orderBy("timeStamp", "desc")
        );

        onSnapshot(q, (snapshot) => {
          settodos(
            snapshot.docs.map( (doc) => 
            (
              {
              id: doc.id,
              ...doc.data(),
              }
            )
            )
          );
          console.log("data rendered");
        });
        // return () => unsub()
      }

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
    });
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
  useEffect(() => {
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
  }, []);

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

      addDoc(collectionRef, data, { merge: true });
      // alert('Created')
      // addDoc(userRef,{
      //   text,
      //   completed:false
      // })
      settodos([...todos, text]);

      settext("");
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
      <Header userphoto={User.photoURL} todoLength={todos.length} />

      <div className="todo-parent row">
        {todos.map((todo) => (
          // console.log(todo.text)
          <Todolist key={todo.id} todo={todo} />
        ))}
      </div>
      <Nav text={text} settext={settext} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Home;
