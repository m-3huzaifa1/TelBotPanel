// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
GoogleAuthProvider,
getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
} from "firebase/auth";
/*import {
  ​​  getFirestore,
  ​​  query,
  ​​  getDocs,
  ​​  collection,
  ​​  where,
  ​​  addDoc,
  ​​} from "firebase/firestore";*/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyB-Zw1aA-nZrOcoXnuBwpN9G9aGre4K8T8",
  authDomain: "auth-75cbe.firebaseapp.com",
  projectId: "auth-75cbe",
  storageBucket: "auth-75cbe.appspot.com",
  messagingSenderId: "206356138268",
  appId: "1:206356138268:web:a7cb5ae53e97c2c391d2d9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
