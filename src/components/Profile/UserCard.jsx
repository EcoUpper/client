import { AuthContext } from "../../context/auth.context"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import Rodal from "rodal"
import ModifyUser from "./ModifyUser"
import "rodal/lib/rodal.css"

function UserCard (props) {

    const { user, logOutUser } = useContext(AuthContext)
    const {userParam} = props
    const [showRodal, setShowRodal] = useState(false)
    const navigate = useNavigate()

    function handleUserSubmit(e, userId) {
        e.preventDefault()
    
        const deleteUserUrl = process.env.REACT_APP_SERVER_URL + "/db/users/" + userId
    
        fetch(deleteUserUrl, {
          method: "DELETE"
        })
          .then((res) => {
            res.json()

            logOutUser()
            setShowRodal(false)
            navigate("/")
          })
          .catch((err) => {
            console.log(err)
          })
      }

    return (
        <>

        {user._id == userParam._id ?
        <div>
          <div className="profile-details">
            <h2>My Details</h2>
            <img src={userParam.image_url} alt={userParam.username} className="profile-img" />
            <h3>{userParam.username}</h3>
            <p>{userParam.email}</p>
          </div>
          <div>


            <button onClick={() => setShowRodal(true)}>Modify your info</button>
            <Rodal visible={showRodal} animation="fade" width={400} height={230}>
                <ModifyUser/>
                <h1>hello</h1>
                <button onClick={(e) => setShowRodal(false)}>Cancel</button>
            </Rodal>


            <button onClick={() => setShowRodal(true)}>Delete profile</button>
            <Rodal visible={showRodal} animation="fade" width={400} height={230}>
                <p>If you delete your user, all your data will also be deleted and you won't have access to premium features.</p>
                <p>Are you sure you want to delete your user profile?</p>
                <button onClick={(e) => {handleUserSubmit(e, user._id)}}>Delete my user</button>
                <button onClick={(e) => setShowRodal(false)}>Cancel</button>
            </Rodal>

          </div>
        </div>
          : null
        }
        </>
    )
}

export default UserCard 