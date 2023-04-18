import React from "react";
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";


function Subchapter(props)  {
    const { subchapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    const subchapter = course.lessons.find(lesson => lesson.id === parseInt(lessonId))
    return (
        <div className="Lesson page">
          <header>
          <Link to="/HomePage" className="btn btn-primary">
          Go back to the HomePage
          </Link>
          <h1>{chapter.title}</h1>
          </header>

           <div>
          {chapter.subchapters.map((item, index) => (
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

export default Subchapter;