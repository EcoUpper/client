import "./NotFoundPage.css";
import { Link } from "react-router-dom";
import sadImg from "./../../images/sadface.jpg"

function NotFoundPage() {
  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <p>Ups! This page doesn't seem to exist</p>
      <button>
        <Link to="/">Take me to Homepage</Link>
      </button>
      <div className="img">
        <img className="image" src={sadImg} alt="sad face" />
      </div>
    </div>
  );
}

export default NotFoundPage;
