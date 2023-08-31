import "./NotFoundPage.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>This page doesn't seem to exist</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}

export default NotFoundPage;
