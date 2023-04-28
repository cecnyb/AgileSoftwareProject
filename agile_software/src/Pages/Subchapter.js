import React from "react";
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";






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
          <img src={require("../VKLogo.png")} alt="logo" className="brand-logo"/>
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


      </div>
    );
};

export default Subchapter;