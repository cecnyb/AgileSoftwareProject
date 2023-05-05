import React from "react";
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import SubchapterComponent from '../Components/SubchapterComponent';


function Chapter() {
        const { chapterId } = useParams()
        const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
        return (
            <div className="Lesson-Page">
              <header>
              <Link to="/HomePage" className="btn btn-primary">
              Go back to the HomePage
              </Link>
              </header>
               <div>
              {chapter.subchapters.map((subchapter) => (
                <SubchapterComponent
                chapterId={chapter.id}
                subchapter={subchapter}
              />
                  )
                )
              } 
            </div>  
          </div>
        );

} 

export default Chapter;