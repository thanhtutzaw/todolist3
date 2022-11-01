import {  getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SEDNER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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

