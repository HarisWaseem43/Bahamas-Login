import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p>
        Hey, this page doesnt exist. <Link to="/userdata">Go Back</Link>?
      </p>
    </div>
  );
}

export default NotFound;
