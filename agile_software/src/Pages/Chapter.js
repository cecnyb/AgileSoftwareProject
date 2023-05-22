import React from "react";
import chapters from '../chapters'
import { Link, useParams } from "react-router-dom";
import SubchapterComponent from '../Components/SubchapterComponent';
import useRequireAuth from '../AuthenticateUser';
import { signout } from '../firebase';
import '../styles/chapter.css';

const handleSubmit = async (e) => {
  e.preventDefault();
  signout();
};


function Chapter() {
    const currentUser = useRequireAuth();
    const { chapterId } = useParams()
    const chapter = chapters.find(chapter => chapter.id === parseInt(chapterId))
    return (
        <div className="Lesson page">
            <form onSubmit={handleSubmit}>
             <input type="submit" value="Logga ut" className="logout-btn"  style={{ position: "relative", width: "200px", marginLeft: "1400px", marginTop: "5px"}}/>
            </form>
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
