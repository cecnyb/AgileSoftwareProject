import React from "react";
import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const db = firebase.firestore();
const auth = getAuth();
const user = auth.currentUser;

function HomePage () {
  const navigate = useNavigate();
  if (user) {
    return (
      <div className="text-center pt-5">
        <header>
         {db.collection("/users/I3IjH1qzyrY2JUAoW9dM/role").doc.item}
          Welcome to your education {user.email}
        </header>
      {chapters.map((chapter) => (
          <ChapterComponent chapter={chapter} key={chapter.id} />
        ))}
    </div>
    );
  } else {
    navigate('/');
  }
};

export default HomePage;