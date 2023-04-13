import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="text-center pt-5">
    <Link to="/PageWithText" className="btn btn-primary">
      Go to page with text
    </Link>
  </div>
  );
};

export default HomePage;