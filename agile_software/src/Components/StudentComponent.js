//Build a component that displays information about a student (name) from the firestore database
import PropTypes from "prop-types";
import "../styles/StudentComponent.css";

function StudentComponent(props) {
    return (
      <div className="square-box">
          <p>{props.name}</p>
      </div>
    );
  }

StudentComponent.propTypes = {
    name: PropTypes.string.isRequired,
};

export default StudentComponent;