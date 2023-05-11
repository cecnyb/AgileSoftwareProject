import React from "react";
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

