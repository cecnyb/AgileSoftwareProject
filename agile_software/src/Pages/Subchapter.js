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
          <img src={"../VKLogo.png"} height={"50%"} width={"30%"}></img>
          </header>


           {  <div>
           {subchapter.content.map((item, index) => (
            <div key={index}>
              <h3>{item.header}</h3>
              <p>{item.text}</p>
              <img src={`${process.env.PUBLIC_URL}/Images/` + item.image} alt={item.header} style={{ height: "auto", width: "100%" }}/>
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