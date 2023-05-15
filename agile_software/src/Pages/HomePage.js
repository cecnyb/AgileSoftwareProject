import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';
import {getUserRole} from '../GetUserRole';
import {getStudents} from '../GetStudents';
import {getUserEmail} from '../GetUserEmail';
import React, { useEffect, useState } from 'react';
import "../Homepage.css"; 

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};


function HomePage() {
  const [userRole, setUserRole] = useState(null);
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
    const fetchStudents = async() =>{
      try {
        const userStudents = await getStudents(currentUser);
        //const studentEmails = userStudents.forEach(getUserEmail)
        //const studentEmails = await userStudents.map((user) => getUserEmail(user));
        var studentEmails = [];
        for(let i = 0; i<userStudents.length; i++){
            studentEmails[i] = await getUserEmail(userStudents[i]);
        }
        //const studentEmails = await getUserEmail(userStudents[0]);
        setStudents(studentEmails);
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
    <div className="chapter-container">
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
  else if(userRole == "teacher"){
    return(
      <div className="students-container">
        <div className = "students-child">
          <h1>
            Dina studenter
          </h1>
          <div className="student-boxes">
            {students && students.map((student) => (
              <div className="student-box" key={student}>
                {student}
              </div>
              ))
            }
            {/* {students.map((student) => <li>{student}</li>)} */}
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <input type="submit" value="Logga ut" className="login-button" />
          </form>
        </div>
      </div>
    )
  }
}

export default HomePage;
