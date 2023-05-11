import React, { useEffect, useState } from "react";
import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import useRequireAuth from '../AuthenticateUser';

function HomePage() {
  const currentUser = useRequireAuth();
    return (
      <div className="text-center pt-5">
        <header>
          Welcome to your education {currentUser.email}
        </header>
        {chapters.map((chapter) => (
          <ChapterComponent chapter={chapter} key={chapter.id} />
        ))}
      </div>
    );
}

export default HomePage;
