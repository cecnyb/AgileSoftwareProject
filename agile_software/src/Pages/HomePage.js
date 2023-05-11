import React, { useEffect, useState } from "react";
import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/Signup');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (user) {
    return (
      <div className="text-center pt-5">
        <header>
          Welcome to your education {user.email}
        </header>
        {chapters.map((chapter) => (
          <ChapterComponent chapter={chapter} key={chapter.id} />
        ))}
      </div>
    );
  } else {
    return null; // or you can render a loading indicator
  }
}

export default HomePage;
