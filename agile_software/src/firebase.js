import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
import { getFirestore, setDoc, updateDoc, arrayUnion, doc, where } from "firebase/firestore";
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

// Sign up
const signUp = async (email, password, username, moderatorID, isUtbildare) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const addStudentToTeacher = async(moderatorID, studentUID) =>{
        const db = getFirestore();
        const teacherRef = doc(db, 'users', moderatorID);
        
        await updateDoc(teacherRef, {
          students: arrayUnion(studentUID)
        });
      };
      const addTeacherToSuperMod = async(superModeratorID, teacherUID) =>{
        const db = getFirestore();
        const teacherRef = doc(db, 'users', superModeratorID);
        
        await updateDoc(teacherRef, {
          customers: arrayUnion(teacherUID)
        });
      };
      if (moderatorID == "UyxsyIap7AN05fG9JJ1mg3tWXRk1") { // TEACHER SIGN UP
        await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                username: username,
                role: "teacher",
                students: [],
                // ADD TEACHER TO SUPERMODERATOR SOMEHOW
                //addTeacherToSupermoderator()
              });
        addTeacherToSuperMod("UyxsyIap7AN05fG9JJ1mg3tWXRk1", user.uid);
         } else if (moderatorID == "AA307vk5uper3989") { // SUPERMODERATOR SIGN UP
            await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    username: username,
                    role: "supermoderator",
                    customers: []
            });
      } else { // STUDENT SIGN UP
        await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                username: username,
                role: "student",
                completedSubchapters: [{chapter:"0", subchapter:"0"}]
              });
        addStudentToTeacher(moderatorID, user.uid);
      }
      return true
    } catch (error) {
      return {error: error.message}
    }
  };

  // Sign in
  const signIn = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        return true
      } catch (error) {
        return {error: error.message}
      }
    };

// Sign out
const signout = async() => {
    try {
      await signOut(auth)
      return true
    } catch (error) {
      return false
    }
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {signout, signUp, signIn, auth, db, app};

