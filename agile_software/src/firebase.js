// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMg7qvLxlpbnM1ayFnep7Y_xShenT8EkQ",
  authDomain: "vk-vattenskoter.firebaseapp.com",
  projectId: "vk-vattenskoter",
  storageBucket: "vk-vattenskoter.appspot.com",
  messagingSenderId: "967558583555",
  appId: "1:967558583555:web:be81fea2b86c02be494536",
  measurementId: "G-CP25S8F63K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { getFirestore, addDoc, collection } from "firebase/firestore";
  const db = getFirestore();
  const auth = getAuth();