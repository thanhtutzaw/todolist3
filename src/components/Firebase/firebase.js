// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApemEaBzb-V_YAS09BhE5a519xLHYWpSc",
  authDomain: "todolist-zeee.firebaseapp.com",
  projectId: "todolist-zeee",
  storageBucket: "todolist-zeee.appspot.com",
  messagingSenderId: "429007270792",
  appId: "1:429007270792:web:7afce2fabb045b66ae403d",
  measurementId: "G-YS87ZG2Y76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app) ;