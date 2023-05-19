import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import '../Subchapter.css';
import SideNavBar from "../Components/SideNavBar";
import { app, db } from "../firebase.js";
import {doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import useRequireAuth from '../AuthenticateUser';
import { getAdditionalUserInfo } from 'firebase/auth';
import getSubchapterChecks from '../GetSubchapterChecks';

function Subchapter()  {
    const currentUser = useRequireAuth();
    //const [userDocRef, setUserdocRef] = useState(null);
    var userDocRef = null;

    //const currentUser = "d2Hv2QHF0XwttcI8Kj9h";
    console.log("Debug 3 - after useRequireAuth user is: " + currentUser) 
    const { subchapterId } = useParams()
    const { chapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    const subchapter = chapter.subchapters.find(subchapter => subchapter.id === parseInt(subchapterId))
    const [checked, setChecked] = React.useState(false);
    const [disableCheckbox, setDisableCheckbox] = React.useState(false); 

    const chapterCompleted = 'chapter1';  
    const subchapterCompleted = 'subchapter2'; 

     const addSubchaptersToCompleted = async (currentUser, chapterCompleted, subchapterCompleted )=> {
      console.log("Adding chapters")
      
      //const userDocRef = doc(db, 'users', currentUser);
      /*if(currentUser){
        fetchUserDocRef();
        console.log("Adding subchapters to completed", currentUser)
      }*/
      try {
        console.log("chapter: ",chapterId);
        console.log("subchapter:", subchapterId);
        const userDocRef = await getSubchapterChecks(currentUser);
        console.log("userdocref", userDocRef)
        await updateDoc(userDocRef.ref, {
          completedSubchapters: arrayUnion({chapter: chapterId, subchapter: subchapterId}),
        });
        console.log('Completed subchapters updated successfully.');
      } catch (error) {
        console.error('Error updating completed subchapters:', error, userDocRef);
      }
    }; 

     const handleChange = () => {
      console.log("Handle change")
      setChecked(!checked); 
      addSubchaptersToCompleted(currentUser, chapterId, subchapterId); 
      setDisableCheckbox(true);
    }; 
     
    useEffect( () => {
      async function awaitFunction() {

      console.log("Useeffect 1 ")
      
      //const userDocRef = getDoc(doc(db, 'users', currentUser));
      //if(currentUser){
        //fetchUserDocRef();
        //console.log("Inside if, userdocref is: " + userDocRef)
      //}

      
     // const fetchUserDocRef = async () => {
  
        try {
          const userDocRef = getSubchapterChecks(currentUser);
        } catch (error) {
          console.error('Error fetching userDocRef:', error);
        }
     // }; 
      /*
      if(currentUser){
        console.log("Fetching that user doc")
        fetchUserDocRef();
      };
      
*/ 


      //const fetchCompletedSubchapters = async () => {
        console.log("fetchCompletedSubchapters")

        try {
          //const userDocRef = await fetchUserDocRef();
          //console.log("User ref pre docsnap" , userDocRef)
          const docSnap = userDocRef;
          console.log("DOC SNAP" , docSnap)
          if (docSnap) {
            const data = docSnap.data();
            const completedSubchapters = data.completedSubchapters || [];
            const isSubchapterCompleted = completedSubchapters.some((subchapter) => {
              return subchapter.chapter === chapterId && subchapter.subchapter === subchapterId;
            });
            setChecked(isSubchapterCompleted);
          } else {
            console.log('No such document!');
            setChecked(false);
          }
        } catch (error) {
          console.error('Error getting document:', error);
        }
     // };
     // fetchCompletedSubchapters();

      
    //  console.log("Useeffect 2. UsedDocRef", userDocRef)
      //const userDocRef = (doc(db, 'users', currentUser));
/*       if(currentUser){
        console.log("")
        fetchUserDocRef();
      } */
      try {
        const userDocRef = await getSubchapterChecks(currentUser);
        getDoc(userDocRef.ref)
          .then((userDocRef) => {
            const isCompleted = userDocRef.data().completedSubchapters.some(
              subchapter => subchapter.chapter === chapterId && subchapter.subchapter === subchapterId
            );
            setChecked(isCompleted);
          })
          .catch((error) => {
            console.error('Error getting document:', error);
          });
        } catch(error){
          console.error('ERRRORRRRRR', error)
        }
    }
      awaitFunction();

    }, [chapterId, subchapterId, currentUser]);

    return (
        <div className="Lesson-Page">
          <header>
           <Link to="/HomePage" className="btn btn-primary">
          Go back to the HomePage
          </Link> 
          { <h1>{subchapter.title}</h1> }
          
         
          <SideNavBar/> 
          </header>
       
          
           {  <div>
           {subchapter.content.map((item, index) => (
            <div key={index}>
              <h3>{item.header}</h3>
              <p>{item.text}</p>
              {/* check if there is an image*/}
              {item.image &&  <img src={process.env.PUBLIC_URL + item.image} alt="" /> }
            </div> 
              ) 
            )
          }  
        </div>  } 

        <div className="navigateToNextBtn">
         {subchapterId < chapter.subchapters.length && (
          <Link to={'/chapter/'+ chapterId +'/subchapter/' +(subchapter.id + 1)}>
            Next Subchapter
          </Link>
         )}
        </div>
         
         <div className="navigateToPrevBtn">
         {subchapterId > 1 && (
          <Link classname = "text-center pt-5" to={'/chapter/'+ chapterId +'/subchapter/' +(subchapter.id - 1)}>
            Previous Subchapter
          </Link>
         )}
          </div>

          <div className="navigateToHomePageBtn">
         {subchapterId == chapter.subchapters.length && (
          <Link to={'/HomePage'}>
            Back to home page (quiz when that is implemented)
          </Link>
         )}
        </div>
         {!checked && (
        <Checkbox
        label="My Value"
         value={checked}
         onChange={handleChange}
         disabled={disableCheckbox}
          />
        )}

        {checked && (
          <h3>Completed</h3>
        )} 

      </div>
    );
};

 const Checkbox = ({ label, value, onChange }) => {
  const handleCheckboxChange = (event) => {
    onChange(event);
  };
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange}/>      
        {(value === true) ? (label = "Completed") : (label = "Mark as completed")}
    </label>
  );
}; 

export default Subchapter;