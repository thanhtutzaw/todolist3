import {  getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

// require('dotenv').config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //here
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const apps = getApps()
let app
if (!apps.length) {
  app = initializeApp(firebaseConfig);
}
export const db = getFirestore(app)
export const auth = getAuth(app);

// export const db = disableNetwork(onlinedb)
// async function addNewDocument() {

//   try {
//     const docRef = await addDoc( collection(db , 'users'), {
//       name: 'John',
//       age:20
//     })
//     console.log("Document Created : id",docRef.id)

//   } catch (error) {
//     console.error("Error adding document ", error)
//   }
// }

// const analytics = getAnalytics(app);

