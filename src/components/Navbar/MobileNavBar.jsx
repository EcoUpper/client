import Rodal from "rodal"
import "rodal/lib/rodal.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import smallLogo from "../../images/short_logo_light.png"
import { Link, NavLink } from "react-router-dom"

function MobileNavBar(props) {

    const { settingEvent, hasNotif, notifImage } = props
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [showRodal, setShowRodal] = useState(false)

    function openNavBar() {
        setShowRodal(true);
    }

    function closeNavBar() {
        setShowRodal(false);
    }

    return (

        <>
            <nav>
                <button onClick={() => { settingEvent(); openNavBar() }}><img className="smallLogo" src={smallLogo} alt="Home" /></button>
                <Rodal
                    id="dropdownNavBar"
                    visible={showRodal}
                    onClose={closeNavBar}
                    animation="slideLeft"
                    width={150}
                    height={400}
                >
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/" onClick={() => { settingEvent(); closeNavBar() }}>News</NavLink>
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/market" onClick={() => { settingEvent(); closeNavBar() }}>Market</NavLink>
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/events" onClick={() => { settingEvent(); closeNavBar() }}>Events</NavLink>
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/posts" onClick={() => { settingEvent(); closeNavBar() }}>Posts</NavLink>

                    {isLoggedIn && (
                        <>
                            <Link id="profileImg" to={`/profile/${user?._id}`} onClick={() => { settingEvent(); closeNavBar() }}>
                                <img src={user?.image_url} alt="Profile picture" />
                            </Link>
                            <button className="navLink" onClick={() => { logOutUser(); settingEvent(); closeNavBar() }}>Logout</button>
                            {hasNotif ? <img src={notifImage} alt="" height="30px" /> : null}
                            <span>{user && user?.name}</span>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/signup" onClick={() => { settingEvent(); closeNavBar() }}>Signup</NavLink>
                            <NavLink className={({ isActive, isPending }) => isPending ? "pending navLink" : isActive ? "active navLink" : "navLink"} to="/login" onClick={() => { settingEvent(); closeNavBar() }}>Login</NavLink>
                        </>
                    )}

                </Rodal>
            </nav>
        </>
    )
}

export default MobileNavBar