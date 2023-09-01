import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log(user);

  return (
    <nav>
      <Link to="/">
      <img src="./images/test logo.png" style={{ width: 400, height: 70}} alt="Home" />
      </Link>

      <Link to="/market">
        <button>Market</button>
      </Link>

      <Link to="/events">
        <button>Events</button>
      </Link>

      <Link to="/posts">
        <button>Posts</button>
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>

          <Link to={`/profile/${user._id}`}>
            {/* <button>Profile</button> */}
            <img src={user.image_url} style={{ width: 100, height: 100, borderRadius: 25}} alt="Profile" />
          </Link>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
