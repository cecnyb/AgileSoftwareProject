import React from "react";
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";


function ChapterContent(props)  {
    const { chapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    return (
        <div className="Lesson page">
          <header>
          <Link to="/HomePage" className="btn btn-primary">
          Go back to the HomePage
          </Link>
          <h1>{chapter.title}</h1>
          </header>

           <div>
          {chapter.content.map((item, index) => (
            <div key={index}>
              <h3>{item.header}</h3>
              <p>{item.text}</p>
            </div>
              )
            )
          } 
        </div>  
      </div>
    );
};

export default ChapterContent;