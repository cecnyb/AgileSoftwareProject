import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';
import {getUserRole} from '../GetUserRole';
import {getStudents} from '../GetStudents';
import {getUserEmail} from '../GetUserEmail';
import React, { useEffect, useState } from 'react';
import "../Homepage.css"; 
import waterimg from "../Vattenskoter.png";

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};


function HomePage() {
  const [userRole, setUserRole] = useState(null);
  const [students, setStudents] = useState(null);
  const currentUser = useRequireAuth();
  console.log("Debug 4 - after useRequireAuth user is: " + currentUser)

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
      if(userRole == "teacher"){
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
  }

    if (currentUser) {
      fetchUserRole();
      fetchStudents();
    }
  }, [currentUser]);
  
  if(userRole == "student")
  return (
    <div className="chapter-container">
      <header className="title-box">
      <div >
      <h1 className = "title">
        Välkommen till din utbildning {currentUser.email}
      </h1>
      </div>
      <h2 className="user-role">{userRole}view</h2>
      </header>
      <div className="chapter-list">
      {chapters.map((chapter) => (
        // <ChapterComponent chapter={chapter} key={chapter.id} />
        <li className="chapter-item" key={chapter.id}>
        <ChapterComponent chapter={chapter} />
      </li>
      ))}
      </div>
      <div className="waterimg">
        <img src={process.env.PUBLIC_URL + "/Images/Water.png"} alt="" />
      </div>
      <footer>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Logga ut" className="logout-btn" />
      </form>
      </footer>
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
  else if(userRole == "supermoderator"){
    return(
      <div className="students-container">
        <div className = "students-child">
          <h1>
            Moderatorer
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
  else{
    console.log("userRole error"&{userRole})
  }
}

export default HomePage;
