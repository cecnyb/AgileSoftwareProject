import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';
import {getUserRole} from '../GetUserRole';
import {getStudents} from '../GetStudents';
import {getUserName} from '../GetUserEmail';
import React, { useEffect, useState } from 'react';
import "../Homepage.css"; 

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};


function HomePage() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [students, setStudents] = useState(null);
  const currentUser = useRequireAuth();

  useEffect(() => {
    console.log('currentUser:', currentUser);
    const fetchUserRole = async () => {
      try {
        const role = await getUserRole(currentUser);
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    const fetchUserName = async () => {
      try {
        //const userRef = doc(db, 'users', currentUser.uid);
        const name = await getUserName(currentUser);
        setUserName(name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    const fetchStudents = async() =>{
      try {
        const userStudents = await getStudents(currentUser);
        //const studentEmails = userStudents.forEach(getUserEmail)
        //const studentEmails = await userStudents.map((user) => getUserEmail(user));
        var studentUsernames = [];
        for(let i = 0; i<userStudents.length; i++){
          studentUsernames[i] = await getUserName(userStudents[i]);
        }
        //const studentEmails = await getUserEmail(userStudents[0]);
        setStudents(studentUsernames);
      }
    catch (error) {
      console.error('Error fetching students', error);
    }
    };

    if (currentUser) {
      fetchUserRole();
      fetchStudents();
      fetchUserName();
    }
  }, [currentUser]);
  
  if(userRole == "student")
  return (
    <div className="chapter-container">
      <h1>
        Välkommen till din utbildning {userName}
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
  else if(userRole == "teacher"){
    return(
      <div className="students-container">
        <div className = "students-child">
          <h1>
            Dina studenter
          </h1>
          <ul>
            {students && students.map((student) => <li>{student}</li>)}
            {/* {students.map((student) => <li>{student}</li>)} */}
          </ul>
          <form onSubmit={handleSubmit}>
          <input type="submit" value="Logga ut" />
        </form>
        </div>
      </div>
    )
  }
}

export default HomePage;
