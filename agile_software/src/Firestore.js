import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    FIREBASE_CONFIGURATION
};

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
