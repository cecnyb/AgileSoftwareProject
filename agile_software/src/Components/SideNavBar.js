import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/SideNavBar.css";
import chapters from "../chapters.js";

function SideNavBar() {
  return (
    <nav className="navigation">
      <ul>
        <li>
        </li>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <h3 className="chapter-title">{chapter.id}{' '}{chapter.title}</h3>
            {chapter.subchapters.map((subchapter) => (
              <Link
                className="subchapter-link"
                to={`/chapter/${chapter.id}/subchapter/${subchapter.id}`}
              >
                {chapter.id}{'.'}{subchapter.id}{' '}{subchapter.title}
              </Link>
          ))}
          </li>
        ))}
      </ul>
    </nav>
  );
}

SideNavBar.propTypes = {
    chapter: PropTypes.object.isRequired,
  };

export default SideNavBar;
