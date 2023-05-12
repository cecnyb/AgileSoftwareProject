import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    //FIREBASE_CONFIGURATION
    apiKey: "AIzaSyBMg7qvLxlpbnM1ayFnep7Y_xShenT8EkQ",
    authDomain: "vk-vattenskoter.firebaseapp.com",
    projectId: "vk-vattenskoter",
    storageBucket: "vk-vattenskoter.appspot.com",
    messagingSenderId: "967558583555",
    appId: "1:967558583555:web:be81fea2b86c02be494536",
    measurementId: "G-CP25S8F63K"
};

const firestore = firebase.firestore();

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Add a new document in collection "cities"
await setDoc(doc(db, "courses", "ExampleCourse"), {
  name: "ExampleCourse",
  state: "CA",
  country: "USA"
});

export { firestore };