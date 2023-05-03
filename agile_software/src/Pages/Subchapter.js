import React from "react";
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import SideNavBar from "../Components/SideNavBar";


function Subchapter()  {
    const { subchapterId } = useParams()
    const { chapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    const subchapter = chapter.subchapters.find(subchapter => subchapter.id === parseInt(subchapterId))
    
    return (
        <div className="Lesson page">
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
            </div> 
              ) 
            )
          }  
        </div>  } 
      </div>
    );
};

export default Subchapter;