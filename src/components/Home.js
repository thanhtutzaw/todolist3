import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Todolist from "./Todolist";
import Nav from "./Nav";
import photo from "../profile 2.jpg";
import { CgChevronRightR } from "react-icons/cg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import Skeleton from 'react-loading-skeleton'
// import EditModal from "./EditModal";

// Home js
function Home() {
  // window.addEventListener('pageshow', (event) => {
  //   if (event.persisted) {
  //     console.log('This page was restored from the bfcache.');
  //   } else {
  //     console.log('This page was loaded normally.');
  //   }
  // });
  const [Loading, setLoading] = useState(true);
  const [text, settext] = useState("");
  const [todos, settodos] = useState([]);
  let id; //  for profile 
  const [userName, setuserName] = useState();
  const [userphoto, setuserphoto] = useState(photo);
  const [UserId, setUserId] = useState();

  const [User, setUser] = useState(null);
  // const [user, setuser] = useState(null)
  // console.log(current)
  const nevigate = useNavigate();
  // console.log(todos)
  const auth = getAuth();
  // const user = auth.currentUser;
  const inputRef = useRef(null)
  const editInput = useRef(null)
  const eleRef = useRef(null)


  useEffect(() => {
    // if (localStorage.getItem("isUsersignin") === "true") {
    //   nevigate("/");
    // } else {
    //   nevigate("/login");
    // }

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
        setUser(user)
        setUserId(user.uid);
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
          setLoading(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    eleRef.current.scrollIntoView({ behavior: "smooth"});
    const inputText = inputRef.current.value;
    const data = {
      text:inputText,
      timeStamp: serverTimestamp(),
      completed: false,
    };
    if (inputText !== "") {
      const collectionRef = collection(db, "users", UserId, "todos");
      // console.log(collectionRef)
      // addDoc(userRef,{
      //   text,
      //   completed:false
      // })
      // console.log(todos )  
      // settext("")
      inputRef.current.value = ""
      settodos([...todos, inputText]);
      await addDoc(collectionRef, data, { merge: true });
      // console.log(todos.id , typeof(todos.id))
    }
  };
  
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nevigate("/login");
      // localStorage.setItem("isUsersignin", "false");
    }
  });

  const [SelectedID, setSelectedID] = useState([]);
  const [selectCount, setselectCount] = useState(false);
  // const [Edit, setEdit] = useState()

  // const editModalRef = null
  // console.log(SelectedID)
  // function handleClose(f) {
  //   setSelectedID([])
  //   // setisSelect(false)
  //   f()
  // }
  function handleFun() {
    clearSelect()
    // console.log(setisSelect, typeof (setisSelect))    
  }
  // let toEdit
  function editHandle() {
    // const collectionRef = collection(db, "users", UserId, "todo #1s",SelectedID);
    // console.log(collectionRef)
    editInput.current.focus()

    document.getElementById("editModal").showModal()

    // toEdit = todos.find(todo => todo.id === SelectedID.toString())

    console.log(editInput.current)

  }
  function clearSelect() {
    setSelectedID([])
    setselectCount(false)
  }
  function selectALl() {
    // todos.map(todo => setSelectedID(todo.id))
    // for (let i = 0; i < todos.length; i++) {
    //   const items = []
    //   const todoObj = todos[i]
    //   items.push(todoObj)
    //   const todoid = items[0].id
    //   const newArr = []
    //   newArr = newArr.concat(todoid)
    //   console.log(newArr)
    // }

    // todos.map(todo => {
      const items = []
      for (let i = 0; i < todos.length; i++) {
        // console.log(Array.isArray(todo))
        const id = todos[i].id
        items.push(id)
        // console.log(items)

      }
      setSelectedID(items)
    // })
    setselectCount(true)
  }
  async function deleteHandle() {
    eleRef.current.scrollIntoView({ behavior: "smooth"});
    // deleteHandle(filteredTodo);
    // const collectionRef = collection(db, "users", UserId, "todos", "uPChMcaETFqlTbBXgbNn");
    // const collectionRef = collection(db, `${UserId}/todos/${SelectedID}`);
    // const collectionRef = collection(db, UserId, "todos",SelectedID.toString());
    // console.log(collectionRef)
    clearSelect()
    // await deleteDoc(doc(db, "users",UserId, "todos", SelectedID.toString()));

    const batch = writeBatch(db);
    console.log(batch)
    const chunkSize = 10
    for (let i = 0; i < SelectedID.length; i += chunkSize) {
      const chunk = SelectedID.slice(i, i + chunkSize);
      // console.log(chunk)   
      for (let j = 0; j < chunk.length; j++) {
        const TodoRef = doc(db, "users", UserId, "todos", chunk[j])
        batch.delete(TodoRef)

      }
    }
    await batch.commit()

    // console.log(SelectedID)


    // const q = query(collectionRef, where("Document ID","==",SelectedID))
    // console.log(q)
    // const snapshot = await getDocs(q)
    // const results = snapshot.docs.map((doc) => ({...doc.data() , id:doc.id}))
    // console.log(results)


    // db.collection('job_skills').where('job_id', '==', post.job_id).get()
    //   .then(function (querySnapshot) {
    //     // Once we get the results, begin a batch
    //     var batch = db.batch();

    //     querySnapshot.forEach(function (doc) {
    //       // For each doc, add a delete operation to the batch
    //       batch.delete(doc.ref);
    //     });

    //     // Commit the batch
    //     return batch.commit();
    //   })


    // this.onCancel(e);
    // console.log(deleteHandle)
  }
  // console.log(deleteHandle)

  return (
    <div className="main container " style={{ margin: '0 auto', zIndex: '99' }}>
      {/* <div style={{background:'rgba(100,100,100,.1)',position:'fixed',inset:'0',width:'100vw',height:'45vh',margin:'0 auto'}}>overlay</div> */}
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>
      {/* {Loading && <Skeleton count={10}  style={{ width: "350px",margin:'20px' , padding: '.2rem 0', height: "0px !important" }} />} */}
      {
        <div className={`selectModal ${(selectCount && SelectedID.length !== 0) && "fadeIn"}`}>
          {/* <div className={` ${SelectedID.length == 0 ? "fadeOut" : 'selectModal'}`}> */}
          <div>
            <GrClose className="closeSelectBtn" onClick={handleFun} />
            <p className="selectCount">{SelectedID.length}</p>
          </div>
          <div>
            <button onClick={editHandle} className={`edit ${SelectedID.length > 1 && 'disabled'}`}>Edit</button>
            {/* <EditModal SelectedID={SelectedID} /> */}
            <button onClick={(e) => {
              e.stopPropagation(); if (window.confirm(`Are you sure you wish to delete this ${SelectedID.length} item?`)) {
                deleteHandle()
              }
            }} className="delete">Delete</button>
          </div>
        </div>
      }
      <dialog id="editModal" className="editModal">
        {todos.map((todo) => {
            return (
              <>
                {todo.id === SelectedID.toString() && <input ref={editInput} contentEditable value={todo.text} key={todo.id} />}
              </>
            )
        }
        )}
      </dialog>

      <Header selectCount={selectCount} user={User} userphoto={userphoto} userName={userName} todoLength={todos.length} />

      <div className="allSelectContainer">{(SelectedID.length === 1 && selectCount) && <button onClick={selectALl}>Select All</button>} {SelectedID.length >= 2 &&
        <button onClick={clearSelect}>Deselect All</button>}
      </div>

      <div className={`todo-parent row`} >
        {Loading && (<Skeleton count={10} style={{ display: 'flex', gap: '0.8rem', width: "375px", marginBottom: '1rem', marginRight: '1rem', padding: '.5rem 0', height: "0px !important" }} />)}
        <section>
          <ul ref={eleRef}>
            {!Loading &&
              todos.map((todo, index) => (
                <Todolist todos={todos} setselectCount={setselectCount} handleFun={handleFun} SelectedID={SelectedID} setSelectedID={setSelectedID} todo={todo} key={index} />
              ))
            }
          </ul>
        </section>
      </div>

      <Nav inputRef={inputRef} text={text} settext={settext} handleSubmit={handleSubmit} />
    </div>
  );
}
export default Home;
