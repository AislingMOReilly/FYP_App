import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCQwyNvmG1ONwSW8Lt7GF_7ZcUeUKCdUPI",
  authDomain: "fyp-project-2e133.firebaseapp.com",
  projectId: "fyp-project-2e133",
  storageBucket: "fyp-project-2e133.appspot.com",
  messagingSenderId: "133406334225",
  appId: "1:133406334225:web:ebe1dffc348451016980b0",
  measurementId: "G-SPPX4D0SC3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection("users");

export { db, auth, usersCollection };