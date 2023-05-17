import React from "react";
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import SubchapterComponent from '../Components/SubchapterComponent';
import useRequireAuth from '../AuthenticateUser';
import '../styles/chapter.css';

function Chapter() {
    const currentUser = useRequireAuth();
    const { chapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    return (
        <div className="Lesson page">
          <header className="title-box">
            <div>
              <Link to="/HomePage" className="btn btn-primary">
                Go back to the HomePage
              </Link>
            </div>
          </header>
            <div className="chapter-list">
              {chapter.subchapters.map((subchapter) => (
            <li className="chapter-item" key={chapter.id}>
              <SubchapterComponent
                chapterId={chapter.id}
                subchapter={subchapter}
                key={subchapter.id}
              />
            </li>
              )
            )
          } 
        </div> 
          <div className="waterimg">
              <img src={process.env.PUBLIC_URL + "/Images/Water.png"} alt="" />
          </div> 
      </div>
  );
} 

export default Chapter;