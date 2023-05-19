import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';
import {getUserRole} from '../GetUserRole';
import {getStudents} from '../GetStudents';
import {getUserName} from '../GetUserEmail';
import React, { useEffect, useState } from 'react';
import "../Homepage.css"; 
import waterimg from "../Vattenskoter.png";

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};


function HomePage() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
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
    const fetchUserName = async () => {
      try {
        const userName = await getUserName(currentUser.uid)
        setUserName(userName);
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
      <header className="title-box">
      <div >
      <h1 className = "title">
        Välkommen till din utbildning {userName}
      </h1>
      </div>
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
