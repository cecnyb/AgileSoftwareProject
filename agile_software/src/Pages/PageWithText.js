import React from "react";
import chapters from '../chapters'

const PageWithText = () => {
    return (
        <div>
          <a href="/">Go back to the HomePage</a>
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