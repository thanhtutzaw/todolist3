import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {VscAdd} from 'react-icons/vsc'
import {db} from './Firebase/firebase'


function Nav() {
  const [UserId, setUserId] = useState(null);
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged( auth , (user)=> {
      if(user){
        setUserId(user.uid)

      }
      
    })
  }, []);
  const addHandle = () => {
    console.log(UserId)
    // const userRef = addDoc(UserId , collection(db , 'users'))
    console.log()
    const userRef = doc(db, 'students', UserId);
    setDoc(userRef, { name:"Chou" }, { merge: true })
    console.log(userRef.id)
// .then( ()=>{

// })
// .catch( (err)=>{
//   // console.error("You have no access! ".err)
// })


  }
  return (
    <nav className="nav">
      <ul>
        <li className="add-btn-parent"  onClick={addHandle}>
          <VscAdd className="add-btn"/>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
