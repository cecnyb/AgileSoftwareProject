
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button } from 'bootstrap';
import HomePage from './HomePage';
import '../Subchapter.css';

function Subchapter(props)  {
    const { subchapterId } = useParams()
    const { chapterId } = useParams()

    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    const subchapter = chapter.subchapters.find(subchapter => subchapter.id === parseInt(subchapterId)) 
        
    const [checked, setChecked] = React.useState(false);
    const [completedChapters, setCompletedChapters] = useState([]);


   const handleChange = () => {
      setChecked(!checked); 
      handleCompletion();
     /*  if (checked) {
        addToArray();
      }
      else {
        DelteFromArray();
      } */
    };  

    function addToArray() {
      completedChapters.push(subchapterId);

    }

    function DelteFromArray() {
      setCompletedChapters(completedChapters, completedChapters.filter(subchapterId));
    }

    function handleCompletion1() {
      if (!completedChapters.includes(props.subchapterId)) {
        completedChapters.push(props.subchapterId);
      }
    }

   

    function handleCompletion() {
       if (completedChapters.includes(subchapter.id)) {
        setCompletedChapters(completedChapters.filter((item) => item.id !== subchapterId));
        return;
      }
      else {
        setCompletedChapters([...completedChapters, subchapter.id]);
      }
      return; 
   
    }
       useEffect(() => {
      const storedChapters = localStorage.getItem('completedChapters');
      if (storedChapters) {
        setCompletedChapters(JSON.parse(storedChapters));
      }
    }, []); 
  
    useEffect(() => {
      localStorage.setItem('completedChapters', JSON.stringify(completedChapters));
    }, [completedChapters]);  

    useEffect(() => {
      const persistedValue = localStorage.getItem('myComponent.checked');
      if (persistedValue !== null) {
        setChecked(JSON.parse(persistedValue));
      }
    }, []); 

    useEffect(() => {
      localStorage.setItem('myComponent.checked', JSON.stringify(checked));
    }, [checked]); // run this effect whenever the `checked` value change
  
   /*  function handleChange(event) {
      setChecked(event.target.checked);
      handleCompletion1(); 
    }   */

    return (
       <div className="Lesson-Page">
          <header>
           <Link to="/HomePage" className="btn btn-primary">
           Go back to the HomePage
           </Link> 
           { <h1>{subchapter.title}</h1> }

           </header>

            {  <div>
           {subchapter.content.map((item, index) => (
             <div key={index}>
               <h3>{item.header}</h3>
              <p>{item.text}</p>
            </div> 
               ) 
            )
           }  
           { <h3>Completed Chapters</h3> }
           {completedChapters.map((item, index) => (
             <div key={index}>
               <h3>{item.title}</h3> 
            </div>
           ))}
        </div>  } 
         <Checkbox
        label="My Value"
         value={checked}
         onChange={handleChange}
       subchapterId = {subchapterId}
       completedChapters = {completedChapters}
      />

    
      </div>
    );
};

const Checkbox = ({ label, value, onChange, subchapterId, completedChapters }) => {
  const handleCheckboxChange = (event) => {
    onChange(event);
    if (event.target.checked) {
      completedChapters.push(subchapterId);
    } else {
      (completedChapters.filter((item) => item !== subchapterId));
    }
  };
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange}  />      
        {(value === true) ? (label = "Completed") : (label = "Mark as completed")}
    </label>
  );
};

export default Subchapter; 

 
/*
import completedChapters from './CompletedChapters';
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button } from 'bootstrap';
import HomePage from './HomePage';
import '../Subchapter.css';


function Subchapter(props) {
  const { subchapterId } = useParams()
  const { chapterId } = useParams()
  const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
  const subchapter = chapter.subchapters.find(subchapter => subchapter.id === parseInt(subchapterId)) 


  function handleCompletion() {
    if (!completedChapters.includes(props.chapterId)) {
      completedChapters.push(props.chapterId);
    }
  }

  return (
    <div className="Lesson page">
      <header>
        <Link to="/HomePage" className="btn btn-primary">
          Go back to the HomePage
        </Link>
        <h1>{subchapter.title}</h1>
      </header>

      <div>
        {subchapter.content.map((item, index) => (
          <div key={index}>
            <h3>{item.header}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <Button onClick={handleCompletion}>Mark as completed</Button>
    </div>
  );
}

export default Subchapter;
*/