import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import notifImage from "../../images/notif.png"
import logo from "../../images/test-logo.png"

function Navbar() {
  
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [items, setItems] = useState("")
  const [hasNotif, setHasNotif] = useState(false)
  const [event, setEvent] = useState(false)

  function settingEvent () {
    setEvent(!event)
  }
  
  useEffect(()=>{

    setHasNotif(false)
    
    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items" 
    
    itemUrl &&
    fetch(itemUrl)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log("owner items", data);
      setItems(data)
    })
    .catch(err => console.log(err))
  }, [event])
  
  useEffect(()=>{
    const newArr = [... items].filter((item)=>{
      return item.owner._id === user?._id
    })

    console.log("NEWARR",newArr);
    
    let propArr = []
    
    newArr.forEach((e)=>{
      propArr.push(e.proposals)
    })
    
    console.log("PROPARR",propArr);

    propArr.forEach((arr)=>{
      if (arr.find((prop)=> prop.status == "pending")){
         setHasNotif(true)
      }
    })


    console.log("HASNOTIFICATION",hasNotif);
    
  }, [event])

  return (
    <nav>
      <Link to="/" onClick={settingEvent}>
      <img className="bigLogo" src={logo} alt="Home" />
      {/* <img className="smallLogo" src={logo} alt="Home" /> */}
      </Link>

      <Link className="navLink" to="/market" onClick={settingEvent}>Market</Link>

      <Link className="navLink" to="/events" onClick={settingEvent}>Events</Link>

      <Link className="navLink" to="/posts" onClick={settingEvent}>Posts</Link>

      {isLoggedIn && (
        <>
          <button className="navLink" onClick={logOutUser}>Logout</button>

          <Link to={`/profile/${user?._id}`} onClick={settingEvent}>
            <img src={user?.image_url} style={{ width: 100, height: 100, borderRadius: 25}} alt="Profile" />
          </Link>
          {hasNotif ? <img src={notifImage} alt="" height="30px"/> : null}
          <span>{user && user?.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link className="navLink" to="/signup">Signup</Link>
          <Link className="navLink" to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
