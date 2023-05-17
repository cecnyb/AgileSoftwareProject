import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/Links.css'

/**
 * A component with a link to a corresponding subchapter
 * @author Wilhelm, Lukas & Cecilia
 * @param {object} props - A subchapter object from chapters.js
 * @return {JSX} - A JSX element with a link to the subchapter
 */

function SubchapterComponent(props) {
    return (
        <section key={props.subchapter.id} className="Links">
          <div>
            <div className="title"> 
              
                <Link
                className="no-underline cursor-pointer"
                  to={'/chapter/'+ props.chapterId +'/subchapter/' + props.subchapter.id}
                >
                  {props.subchapter.title}
                </Link>
              
            </div>
          </div>
        </section>
      )
}
export default SubchapterComponent;