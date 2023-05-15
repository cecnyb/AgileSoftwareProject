import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';
import {getUserRole} from '../GetUserRole';
import {getStudents} from '../GetStudents';
import {getUserEmail} from '../GetUserEmail';
import {getUserProgress} from '../GetUserProgress';
import React, { useEffect, useState } from 'react';
import "../Homepage.css"; 

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};

function calculateProgress(progressCount, chapter) {
  console.log("Progress Array: " + progressCount)
  const totalCount = progressCount;
  
  
  const totalChapters = (parseInt(chapter)+1) * 2;
  console.log("chapter: " + chapter + ", count:" + progressCount + " calc: " + totalChapters)
  const progressPercentage = (totalCount / totalChapters) * 100;
  return progressPercentage;
}


function HomePage() {
  const [userRole, setUserRole] = useState(null);
  const [students, setStudents] = useState(null);
  const [prog, setProgress] = useState(null);
  const currentUser = useRequireAuth();

  useEffect(() => {
    console.log('UseEffect,currentUser:', currentUser);
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

    const fetchUserProgress = async () => {
      try {
        const userStudents = await getStudents(currentUser);

        var studentProgress = [];
        for(let i = 0; i<userStudents.length; i++){
          console.log("Checking progress for: " + userStudents[i])
          var userProgress = await getUserProgress(userStudents[i]);
          var userProgCount = new Map();
          try{ 
            console.log(userProgress)

            for(let i = 0; i<userProgress.length;i++){
              if(userProgCount[userProgress[i].chapter])
                userProgCount[userProgress[i].chapter]++;
              else
                userProgCount.set(userProgress[i].chapter,1);
            }

            studentProgress[i] = userProgCount;

          }
          catch (error){
            console.error("Error fetching user progress", error)
          }
          
        }
        setProgress(studentProgress)
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    if (currentUser) {
      fetchUserRole();
      fetchStudents();
      fetchUserProgress();
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
          <ul>
          {students &&
            students.map((student, index) => (
              <li key={index}>
                {student}
                {prog && prog[index] && (
                  <ul>
                    {Array.from(prog[index].entries()).map(([chapter, count]) => (
                      <li key={chapter}>
                        {"Chapter " + chapter + ":  "} 
                        <progress value={calculateProgress(prog[index].get(chapter), chapter)} max={100} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
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
