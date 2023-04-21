import { Link } from 'react-router-dom'
import React from 'react'

function SubchapterComponent(props) {
    return (
        <section key={props.subchapter.id} className="summary">
          <div>
            <div className="title">
              <h2>
                <Link
                  className="no-underline cursor-pointer"
                  to={'/chapter/'+ props.chapterId +'/subchapter/' + props.subchapter.id}
                >
                  {props.subchapter.title}
                </Link>
              </h2>
            </div>
          </div>
        </section>
      )
}
export default SubchapterComponent;