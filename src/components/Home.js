import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Todolist from "./Todolist";
import photo from "../profile 2.jpg";
import { CgChevronRightR } from "react-icons/cg";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import EditModal from "./EditModal";
import { useUserData } from "../lib/hook";
import BottomNav from "./BottomNav";
import useFireStoreData from "../hooks/useFireStoreData";


function Home() {
  // const uid = useContext(useUserData);

  // let id; //  for profile 
  const [userName, setuserName] = useState();
  const [userphoto, setuserphoto] = useState(photo);
  // const [UserId, setUserId] = useState();

  // const [User, setUser] = useState(null);
  // const [user, setuser] = useState(null)
  // console.log(current)
  const nevigate = useNavigate();
  const inputRef = useRef(null)
  const editInput = useRef(null)
  const todoRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)
  const [isPrevent, setisPrevent] = useState(false);
  const [todos, settodos, loading] = useFireStoreData()
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

  // console.log(q3)

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
        // if (id) {

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

        // }
      }
    };
  }
  useEffect(() => {
    function preventRefresh(event) {
      event.returnValue = 'You have unfinished changes!';
    }
    if (isPrevent) {
      window.addEventListener('beforeunload', preventRefresh);
    }
    return () => {
      window.removeEventListener('beforeunload', preventRefresh)
    }
  }, [isPrevent, setisPrevent]);

  const pendingOps = new Set();

  const handleSubmit = async (e) => {
    e.preventDefault();
    todoRef.current.scrollIntoView({ behavior: "smooth" });
    const inputText = inputRef.current.value;
    const data = {
      text: inputText,
      timeStamp: serverTimestamp(),
      completed: false,
    };
    if (inputText !== "") {
      const collectionRef = collection(db, "users", auth.currentUser.uid, "todos");
      inputRef.current.value = ""

      settodos([...todos, inputText]);

      setisPrevent(true)
      try {
        await addDoc(collectionRef, data, { merge: true });
        console.log("try")
        setisPrevent(false)
      }
      catch (err) {
        alert(err.message)
      }

      // pendingOps.add = (await addDoc(collectionRef, data, { merge: true }))
      // const cleanup = () => pendingOps.delete(addDoc);
      // console.log({addDoc})
      // await addDoc.then(cleanup).catch(cleanup)
    }
    // setisPrevent(false)
    // else if(inputText === ""){
    // setisPrevent(false)
    // }

  };

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nevigate("/login");
      // localStorage.setItem("isUsersignin", "false");
    }
  });

  const [SelectedID, setSelectedID] = useState([]);
  const [selectCount, setselectCount] = useState(false);

  function editHandle() {
    // setOpenModal(prev => !prev)
    // editInput.current.focus()

    document.getElementById("editModal").showModal()
    // if(openModal){
    // }

    // toEdit = todos.find(todo => todo.id === SelectedID.toString())
  }

  function clearSelect() {
    setSelectedID([])
    setselectCount(false)
    setisPrevent(false)
  }
  function selectAll() {
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
    }
    setSelectedID(items)
    // })
    setselectCount(true)
  }
  async function deleteHandle() {
    todoRef.current.scrollIntoView({ behavior: "smooth" });
    // deleteHandle(filteredTodo);
    // const collectionRef = collection(db, "users", UserId, "todos", "uPChMcaETFqlTbBXgbNn");
    // const collectionRef = collection(db, `${UserId}/todos/${SelectedID}`);
    // const collectionRef = collection(db, UserId, "todos",SelectedID.toString());
    // console.log(collectionRef)
    clearSelect()
    // await deleteDoc(doc(db, "users",UserId, "todos", SelectedID.toString()));

    // setisPrevent(true)
    const batch = writeBatch(db);
    // console.log(batch)
    const chunkSize = 10
    for (let i = 0; i < SelectedID.length; i += chunkSize) {
      const chunk = SelectedID.slice(i, i + chunkSize);
      // console.log(chunk)   
      for (let j = 0; j < chunk.length; j++) {
        const TodoRef = doc(db, "users", auth.currentUser.uid, "todos", chunk[j])
        batch.delete(TodoRef)

      }
    }
    setisPrevent(true)
    try {
      await batch.commit();
      setisPrevent(false)
    } catch (error) {
      alert("Delete Error !" + error.message)
    }


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
  }
  return (
    <div className="main container " style={{ margin: '0 auto', zIndex: '99' }}>
      {/* <div style={{background:'rgba(100,100,100,.1)',position:'fixed',inset:'0',width:'100vw',height:'45vh',margin:'0 auto'}}>overlay</div> */}
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>
      {
        <div className={`selectModal ${(selectCount && SelectedID.length !== 0) ? "selecting" : ''}`}>
          {/* <div className={` ${SelectedID.length == 0 ? "fadeOut" : 'selectModal'}`}> */}
          <div>
            <GrClose className="closeSelectBtn" onClick={() => {
              clearSelect();

            }} />
            <p className="selectCount">{SelectedID.length}</p>
          </div>
          <div>
            <button onClick={editHandle} className={`edit ${SelectedID.length > 1 && 'disabled'}`}>Edit</button>
            {/* <button onClick={editHandle} className={`edit ${SelectedID.length > 1 && 'disabled'}`}>Edit</button> */}
            {/* <EditModal SelectedID={SelectedID} /> */}
            <button onClick={(e) => {
              e.stopPropagation(); if (window.confirm(`Are you sure you wish to delete this ${SelectedID.length} item?`)) {
                deleteHandle()
              }
            }} className="delete">Delete</button>
          </div>
        </div>
      }
      <dialog onClick={(e) => { const dialog = document.querySelector("dialog"); if (e.target === dialog) { e.target.close() } }} id="editModal" >
      
          <EditModal todo={todos.find(t => t.id === SelectedID.toString())} editInput={editInput} />
        {/* {todos.map((todo) => (
          <EditModal key={todo.id} todo={todo} SelectedID={SelectedID} editInput={editInput} />
        )
        )} */}
      </dialog>

      <Header selectCount={selectCount} userphoto={userphoto} userName={userName} todoLength={todos.length} />

      <div className="allSelectContainer">{(SelectedID.length === 1 && selectCount) && <button onClick={selectAll}>Select All</button>} {SelectedID.length >= 2 &&
        <button onClick={clearSelect}>Deselect All</button>}
      </div>

      <section className={`todo-parent row`} >

        <ul ref={todoRef} style={{ userSelect: (selectCount) && 'none' }}>
          <SkeletonTheme height="55px">
            {/* {<Skeleton className={`loading ${!loading ? 'fadeOut' : ''}`} count={5} />} */}
            {/* <Skeleton className={"loading"} count={5} /> */}
            {loading && <Skeleton className={"loading"} count={5} />}
          </SkeletonTheme>
          {!loading &&
            todos.map((todo, index) => (
              <Todolist isPrevent={isPrevent} setisPrevent={setisPrevent} todos={todos} setselectCount={setselectCount} SelectedID={SelectedID} setSelectedID={setSelectedID} todo={todo} key={index} />
            ))
          }
        </ul>
      </section>

      <BottomNav selectCount={selectCount} inputRef={inputRef} handleSubmit={handleSubmit} />
    </div>
  );
}
export default Home;
