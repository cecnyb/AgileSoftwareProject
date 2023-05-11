import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';
import {getUserRole} from '../GetUserRole';
import {getStudents} from '../GetStudents';
import React, { useEffect, useState } from 'react';

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};


function HomePage() {
  const [userRole, setUserRole] = useState(null);
  const [students, setStudents] = useState(null);
  const currentUser = useRequireAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getUserRole(currentUser);
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    const fetchStudents = async() =>{
      try {
      const userStudents = await getStudents(currentUser);
      setStudents(userStudents);
      }
    catch (error) {
      console.error('Error fetching students', error);
    }
    };

    if (currentUser) {
      fetchUserRole();
      fetchStudents();
    }
  }, [currentUser]);
  
  if(userRole == "student")
  return (
    <div className="text-center pt-5">
      <h1>
        Välkommen till din utbildning {currentUser.email}
      </h1>
      <h2>Du är en: {userRole}</h2>
      {chapters.map((chapter) => (
        <ChapterComponent chapter={chapter} key={chapter.id} />
      ))}
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Logga ut" />
      </form>
    </div>
  );
  else{
    return(
      <div>
        <h1>
          Dina studenter
        </h1>
        <li>
          {students}
        </li>
        <form onSubmit={handleSubmit}>
        <input type="submit" value="Logga ut" />
      </form>
      </div>
    )
  }
}

export default HomePage;
