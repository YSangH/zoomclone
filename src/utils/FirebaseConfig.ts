// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzMcFlvhQYwr4o0qUQUcjpppp9i72q6ug",
  authDomain: "clonezoom-b0813.firebaseapp.com",
  projectId: "clonezoom-b0813",
  storageBucket: "clonezoom-b0813.appspot.com",
  messagingSenderId: "84484953337",
  appId: "1:84484953337:web:69ffe7e04edc0ac015fe28",
  measurementId: "G-VN5QF0Q0F7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
// Firestore 컬렉션 참조 추가
export const userRef = collection(firebaseDB, "users"); // 'users' 컬렉션 참조
