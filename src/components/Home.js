import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Todolist from "./Todolist";
import Nav from "./Nav";
import photo from "../profile 2.jpg";
import { CgChevronRightR } from "react-icons/cg";
import { onAuthStateChanged } from "firebase/auth";
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
import { db, auth } from "../lib/firebase";
import Skeleton from 'react-loading-skeleton'
import EditModal from "./EditModal";
import { useUserData } from "../lib/hook";

function Home() {
// const uid = useContext(useUserData);
  const [Loading, setLoading] = useState(true);

  const [todos, settodos] = useState([]);
  // let id; //  for profile 
  const [userName, setuserName] = useState();
  const [userphoto, setuserphoto] = useState(photo);
  // const [UserId, setUserId] = useState();

  // const [User, setUser] = useState(null);
  // const [user, setuser] = useState(null)
  // console.log(current)
  const nevigate = useNavigate();
  // console.log(todos)
  // const auth = getAuth();
  // const user = auth.currentUser;
  const inputRef = useRef(null)
  const editInput = useRef(null)
  const todoRef = useRef(null)

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

          // console.log(id)
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
        // }
      }
    };
  }
  // console.log(id)
  // console.log(qid)
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
          setLoading(false)
        });

        // async function getDocument() {
        //   const docSnap = await getDocs(q3)
        //   settodos(
        //     docSnap.docs.map(doc => ({
                  
        //             id: doc.id,
        //             ...doc.data(),
        //           }))
        //         );
        //         setLoading(false)
        // }  
        // getDocument()           
      }
      else {
        unsubscribe();
      }
    })
    return () => unsubscribe();
  }, []);

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
      await addDoc(collectionRef, data, { merge: true });
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
  function closeSelect() {
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
    todoRef.current.scrollIntoView({ behavior: "smooth" });
    // deleteHandle(filteredTodo);
    // const collectionRef = collection(db, "users", UserId, "todos", "uPChMcaETFqlTbBXgbNn");
    // const collectionRef = collection(db, `${UserId}/todos/${SelectedID}`);
    // const collectionRef = collection(db, UserId, "todos",SelectedID.toString());
    // console.log(collectionRef)
    clearSelect()
    // await deleteDoc(doc(db, "users",UserId, "todos", SelectedID.toString()));

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
            <GrClose className="closeSelectBtn" onClick={closeSelect} />
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
      <dialog onClick={(e) => { const dialog = document.querySelector("dialog"); if (e.target === dialog) { e.target.close() } }} id="editModal" >
        {todos.map((todo) => (
          <EditModal todo={todo} SelectedID={SelectedID} editInput={editInput} />
        )
        )}
      </dialog>

      <Header selectCount={selectCount} userphoto={userphoto} userName={userName} todoLength={todos.length} />

      <div className="allSelectContainer">{(SelectedID.length === 1 && selectCount) && <button onClick={selectALl}>Select All</button>} {SelectedID.length >= 2 &&
        <button onClick={clearSelect}>Deselect All</button>}
      </div>

      <div className={`todo-parent row`} >
        {(Loading) &&(<Skeleton className="skeleton" count={10} style={{ display: 'flex', gap: '0.8rem', maxWidth: "365px", marginBottom: '1rem', padding: '.5rem 0', height: "0px !important" }} />)}
        <section>
          <ul ref={todoRef} style={{ userSelect: (selectCount) && 'none' }}>
            {!Loading &&
              todos.map((todo, index) => (
                <Todolist todos={todos} setselectCount={setselectCount} SelectedID={SelectedID} setSelectedID={setSelectedID} todo={todo} key={index} />
              ))
            }
          </ul>
        </section>
      </div>

      <Nav selectCount={selectCount} inputRef={inputRef} handleSubmit={handleSubmit} />
    </div>
  );
}
export default Home;
