
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import '../Subchapter.css';
import SideNavBar from "../Components/SideNavBar";




function Subchapter()  {
    const { subchapterId } = useParams()
    const { chapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    const subchapter = chapter.subchapters.find(subchapter => subchapter.id === parseInt(subchapterId))
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked(!checked); 
    };

    useEffect(() => {
      const persistedValue = localStorage.getItem('myComponent.checked');
      if (persistedValue !== null) {
        setChecked(JSON.parse(persistedValue));
      }
    }, []); 

    useEffect(() => {
      localStorage.setItem('myComponent.checked', JSON.stringify(checked));
    }, [checked]); // run this effect whenever the `checked` value change
    
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
        <Checkbox
        label="My Value"
         value={checked}
         onChange={handleChange}
      />


      </div>
    );
};

const Checkbox = ({ label, value, onChange }) => {
  const handleCheckboxChange = (event) => {
    onChange(event);
    
  };
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange}  />      
        {(value === true) ? (label = "Completed") : (label = "Mark as completed")}
    </label>
  );
};

export default Subchapter;