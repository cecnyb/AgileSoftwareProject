import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/Links.css'

/**
 * A component with a link to a corresponding chapter
 * @author Wilhelm, Lukas & Cecilia
 * @param {object} props - A chapter object from chapters.js
 * @return {JSX} - A JSX element with a link to the chapter
 */

function ChapterComponent(props) {
    return (
        <section key={props.chapter.id} className="Links">
          <div>
            <div className="title">
              <h2>
                <Link
                  className="no-underline cursor-pointer"
                  to={'/chapter/' + props.chapter.id}
                >
                  {props.chapter.title}
                </Link>
              </h2>
            </div>
          </div>
        </section>
      )
}

export default ChapterComponent;
