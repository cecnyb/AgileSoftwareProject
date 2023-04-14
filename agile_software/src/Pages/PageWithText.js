import React from "react";
import chapters from '../chapters'
import { Link } from "react-router-dom";

const PageWithText = () => {
    return (
        <div>
          <Link to="/HomePage" className="btn btn-primary">
          Go back to the HomePage
          </Link>
          {chapters[0].content.map((item, index) => (
            <div key={index}>
              <h3>{item.header}</h3>
              <p>{item.text}</p>
            </div>
              )
            )
          } 
        </div> 
    );
};

export default PageWithText;