import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import '../Subchapter.css';
import SideNavBar from "../Components/SideNavBar";
//import { useAuth } from "../hooks/useAuth";
import { app, db } from "../firebase.js";
import {doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';

function Subchapter()  {
    const { subchapterId } = useParams()
    const { chapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    const subchapter = chapter.subchapters.find(subchapter => subchapter.id === parseInt(subchapterId))
    const [checked, setChecked] = React.useState(false);
    const [disableCheckbox, setDisableCheckbox] = React.useState(false);
    //const { user } = app.useAuth();

    const user = 'BoMIXFvDylRMO0QosUOA' //Den här ska användas
    const userId = 'u4oHbZWfyMac91R2Tl98HHXuN8m2';
    const chapterCompleted = 'chapter1';  
    const subchapterCompleted = 'subchapter2';

    

    const addSubchaptersToCompleted = async (user, chapterCompleted, subchapterCompleted )=> {
      const userDocRef = doc(db, 'users', user);
      try {
        await updateDoc(userDocRef, {
          completedSubchapters: arrayUnion({chapter: chapterId, subchapter: subchapterId}),
        });
        console.log('Completed subchapters updated successfully.');
      } catch (error) {
        console.error('Error updating completed subchapters:', error, userDocRef);
      }
    };

    const handleChange = () => {
      setChecked(!checked); 
      addSubchaptersToCompleted(user, chapterId, subchapterId);
      setDisableCheckbox(true);
    };

/*     useEffect(() => {
      const persistedValue = localStorage.getItem('myComponent.checked');
      if (persistedValue !== null) {
        setChecked(JSON.parse(persistedValue));
      }
    }, []); 

    useEffect(() => {
      localStorage.setItem('myComponent.checked', JSON.stringify(checked));
    }, [checked]); */ // run this effect whenever the `checked` value change
    
    useEffect(() => {
      const userDocRef = doc(db, 'users', user);
      const fetchCompletedSubchapters = async () => {
        try {
          const docSnap = await userDocRef.get();
          if (docSnap.exists()) {
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
          console.log('Error getting document:', error);
        }
      };
      fetchCompletedSubchapters();
    }, [chapterId, subchapterId, user]);

    useEffect(() => {
      const userDocRef = doc(db, 'users', user);
      getDoc(userDocRef)
        .then((userDoc) => {
          const isCompleted = userDoc.data().completedSubchapters.some(
            subchapter => subchapter.chapter === chapterId && subchapter.subchapter === subchapterId
          );
          setChecked(isCompleted);
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    }, [user, chapterId, subchapterId]);

    return (
        <div className="Lesson-Page">
          <header>
           <Link to="/HomePage" className="btn btn-primary">
          Go back to the HomePage
          </Link> 
          { <h1>{subchapter.title}</h1> }
          
         
          <SideNavBar chapter={chapter}/> 
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