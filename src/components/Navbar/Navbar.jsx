import "./Navbar.css"
import { Link, NavLink } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import notifImage from "../../images/notif.png"
import bigLogo from "../../images/long_logo_light.png"
import MobileNavBar from "./MobileNavBar"

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [items, setItems] = useState("")
  const [hasNotif, setHasNotif] = useState(false)
  const [event, setEvent] = useState(false)
  const [windowWidth, setWindowWidth]= useState(window.innerWidth)


  function settingEvent() {
    setEvent(!event)
  }

  useEffect(() => {

    setHasNotif(false)

    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items"

    itemUrl &&
      fetch(itemUrl)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setItems(data)
        })
        .catch(err => console.log(err))
  }, [event])

  useEffect(() => {
    const newArr = [...items].filter((item) => {
      return item.owner?._id === user?._id
    })
    let propArr = []

    newArr.forEach((e) => {
      propArr.push(e.proposals)
    })

    propArr.forEach((arr) => {
      if (arr.find((prop) => prop.status == "pending")) {
        setHasNotif(true)
      }
    })

  }, [event])


  useEffect(() => {
    function handleResize () {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  }, [windowWidth]);

  return (

    <>

      {windowWidth <= 768 ? <MobileNavBar settingEvent={settingEvent} hasNotif={hasNotif} notifImage={notifImage}/>
        :
        <nav>

          <div className="navDiv navLinks">
            <Link to="/" onClick={settingEvent}>
              <img className="bigLogo" src={bigLogo} alt="Home" />
            </Link>
              <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/market" onClick={settingEvent}>Market</NavLink>
              <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/events" onClick={settingEvent}>Events</NavLink>
              <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/posts" onClick={settingEvent}>Posts</NavLink>
          </div>

          <div className="navDiv navUser">
            {isLoggedIn && (
              <>
                <Link id="profileImg" to={`/profile/${user?._id}`} onClick={settingEvent}>
                  <img src={user?.image_url} alt="Profile picture" />
                </Link>
                <button className="navLink" onClick={logOutUser}>Logout</button>
                {hasNotif ? <img src={notifImage} alt="" height="30px" /> : null}
                <span>{user && user?.name}</span>
              </>
            )}

            {!isLoggedIn && (
              <>
                <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/signup">Signup</NavLink>
                <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/login">Login</NavLink>
              </>
            )}
          </div>
        </nav>
      }
    </>
  );
}

export default Navbar;
