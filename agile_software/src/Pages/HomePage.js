import React from "react";
<<<<<<< Updated upstream
import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent";


function HomePage () {
  return (
    <div className="text-center pt-5">
    {chapters.map((chapter) => (
        <ChapterComponent chapter={chapter} key={chapter.id} />
      ))}
  </div>
  );
};

export default HomePage;
=======
import { Link } from "react-router-dom";

const Homepage = () => {
return (
    <div>
      <div className="header">
      <button>Testbutton</button>
          {/* <Link to="./PageWithText" className="link settingsBtn"></Link> */}
          </div>  
    </div>
  );
}

export default Homepage;
>>>>>>> Stashed changes
