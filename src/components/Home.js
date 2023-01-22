import React, { useEffect, useRef, useState } from "react";
import Header from "./Header.jsx";
import Todolist from "./Todolist.jsx";
import { CgChevronRightR } from "react-icons/cg";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
import BottomNav from "./BottomNav";
import useFireStoreData from "../hooks/useFireStoreData";
import usePrevent from "../hooks/usePrevent.js";
import { SelectModal } from "./SelectModal.jsx";
import useSelect from "../hooks/useSelect.js";



function Home() {
  // const uid = useContext(useUserData);

  // let id; //  for profile 

  // const [UserId, setUserId] = useState();

  // const [User, setUser] = useState(null);
  // const [user, setuser] = useState(null)
  // console.log(current)
  const nevigate = useNavigate();
  const inputRef = useRef(null)
  const editInput = useRef(null)
  const todoRef = useRef(null)
  // const [openModal, setOpenModal] = useState(false)
  const [todos, settodos, loading] = useFireStoreData()
  const {isPrevent, setisPrevent} = usePrevent()



  const pendingOps = new Set();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info("%cAdding...", "color:grey")
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
        setisPrevent(false)
        console.info("%cAdded ✔️ ", "color: green")
      }
      catch (err) {
        alert(err.message)
      }

      // pendingOps.add = (await addDoc(collectionRef, data, { merge: true }))
      // const cleanup = () => pendingOps.delete(addDoc);
      // console.log({addDoc})
      // await addDoc.then(cleanup).catch(cleanup)
    }
  };
  const deleteHandle = async () => {
    console.info("%cDeleting...", "color:grey")
    setisPrevent(true)
    clearSelect()
    todoRef.current.scrollIntoView({ behavior: "smooth" });
    // await deleteDoc(doc(db, "users",UserId, "todos", SelectedID.toString()));
    const batch = writeBatch(db);
    const chunkSize = 10
    for (let i = 0; i < SelectedID.length; i += chunkSize) {
      const chunk = SelectedID.slice(i, i + chunkSize);
      // console.log(chunk)   
      for (let j = 0; j < chunk.length; j++) {
        const TodoRef = doc(db, "users", auth.currentUser.uid, "todos", chunk[j])
        batch.delete(TodoRef)
      }
    }
    try {
      await batch.commit();
      setisPrevent(false)
      console.info("%cDeleted !", "color: green")
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

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nevigate("/login");
    }
  });

  const {SelectedID, setSelectedID, selectCount, setselectCount, clearSelect, selectAll} = useSelect(todos)
  const selecting = selectCount && SelectedID.length !== 0;

  const mountStyle = {
    animation: "selectMount 250ms ease-in"
  };
  const unmountStyle = {
    animation: "selectUnmount 270ms ease-out",
    animationFillMode: "forwards"
  };
  const [mounted, setmounted] = useState(false);
  useEffect(() => {
    if (selecting) {
      setmounted(true)
    }
  }, [selecting, mounted]);
  const todo = todos.find(t => t.id === SelectedID.toString())
  const [text, settext] = useState(todo && todo.text);
  function closeHandle() {
    document.getElementById("editModal").close();
    if (todo) {
      settext(todo.text);
    }
  }
  return (
    <main>
      {/* <div style={{background:'rgba(100,100,100,.1)',position:'fixed',inset:'0',width:'100vw',height:'45vh',margin:'0 auto'}}>overlay</div> */}
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>

      {mounted &&
        <SelectModal clearSelect={clearSelect} SelectedID={SelectedID}  deleteHandle={deleteHandle} selecting={selecting} mountStyle={mountStyle} unmountStyle={unmountStyle} setmounted={setmounted} />
      }

      <dialog
        onClick={(e) => {
          const dialog = document.querySelector("dialog");
          if (e.target === dialog) {
            if (text !== todo.text) {
              document.getElementById("confirmModal").showModal();
              // setConfirmModal((prev) => !prev);
            } else {
              closeHandle();
            }
          }
        }}
        id="editModal" >
        <EditModal
          clearSelect={clearSelect}
          text={text}
          settext={settext}
          closeHandle={closeHandle}
          todo={todos.find(t => t.id === SelectedID.toString())}
          editInput={editInput}
        />
      </dialog>
      

      <Header selecting={selecting} todoLength={todos.length} />

      <div className="selectionContainer">
        {(SelectedID.length === 1 && selectCount) &&
          <button onClick={selectAll}>Select All</button>}

        {SelectedID.length >= 2 &&
          <button onClick={clearSelect}>Deselect All</button>}
      </div>

      <section className={`todo-parent row`} >
        <ul ref={todoRef} style={{ userSelect: (selectCount) && 'none' }}>
          <SkeletonTheme height="55px">
            {/* {<Skeleton className={`loading ${!loading ? 'fadeOut' : ''}`} count={5} />} */}
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
    </main>
  );
}
export default Home;