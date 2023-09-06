import "./NotFoundPage.css";
import { Link } from "react-router-dom";
import sadImg from "./../../images/sadface.jpg"

function NotFoundPage() {
  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <p>This page doesn't seem to exist</p>
      <Link to="/">Go to Homepage</Link>
      <div className="img">
      <img src={sadImg} alt="sad face" />
      </div>
    </div>
  );
}

export default NotFoundPage;
