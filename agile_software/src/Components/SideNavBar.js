import { Link } from "react-router-dom";
import '/Users/wille/Code/DAT257/AgileSoftwareProject/agile_software/src/styles/SideNavBar.css';

function SideNavBar(props) {
    return (
    <nav className="navigation">
        <ul>
            <h1 className="chapter-title">
                {props.chapter.title}
            </h1>
            {props.chapter.subchapters.map((subchapter) => (
                        <li>
                            <Link
                                className="no-underline cursor-pointer"
                                to={'/chapter/' + props.chapter.id + '/subchapter/' + subchapter.id}
                                >
                                    {subchapter.title}
                            </Link>
                        </li>
                    )
                )
            } 
        </ul>
    </nav>
     );
    };

    export default SideNavBar;





