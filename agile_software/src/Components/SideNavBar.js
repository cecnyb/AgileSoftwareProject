import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/SideNavBar.css";
import HomePageLink from "./HomePageLink.js";

function SideNavBar(props) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <HomePageLink />
        </li>
        <li>
          <h3 className="chapter-title">{props.chapter.id}{' '}{props.chapter.title}</h3>
        </li>
        {props.chapter.subchapters.map((subchapter) => (
          <li key={subchapter.id}>
            <Link
              className="subchapter-link"
              to={`/chapter/${props.chapter.id}/subchapter/${subchapter.id}`}
            >
              {props.chapter.id}{'.'}{subchapter.id}{' '}{subchapter.title}
            </Link>
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
