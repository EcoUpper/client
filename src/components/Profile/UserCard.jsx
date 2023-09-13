import { AuthContext } from "../../context/auth.context"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import Rodal from "rodal"
import ModifyUser from "./ModifyUser"
import "rodal/lib/rodal.css"

function UserCard (props) {

    const { user, logOutUser } = useContext(AuthContext)
    const {userParam} = props
    const [showModifyRodal, setShowModifyRodal] = useState(false) // Separate state for Modify modal
    const [showDeleteRodal, setShowDeleteRodal] = useState(false) // Separate state for Delete modal

    const [username, setUsername] = useState(user.username)
    const [image, setImage] = useState(user.image_url)

    const navigate = useNavigate()
    const userId = user._id

    const authToken = localStorage.getItem("authToken")


    function handleUserSubmit(e) {
        e.preventDefault()
      
        const deleteUserUrl = process.env.REACT_APP_SERVER_URL + "/db/users/" + userId
    
        fetch(deleteUserUrl, {
          headers: {Authorization: `Bearer ${authToken}`},
          method: "DELETE"
        })
          .then((res) => {
            res.json()

            logOutUser()
            setShowDeleteRodal(false)
            navigate("/")
          })
          .catch((err) => {
            console.log(err)
          })
      }

    return (
        user._id == userParam._id ?
        <>
        <div>
          <div className="profile-details">
            <h2>My Details</h2>
            <img src={image} alt={username} className="profile-img" />
            <h3>{username}</h3>
            <p>{userParam.email}</p>
          </div>
          <div>


            <button onClick={() => setShowModifyRodal(true)}>Modify your info</button>
            <Rodal visible={showModifyRodal} animation="fade" width={400} height={230} onClose={() => setShowModifyRodal(false)}>
                <ModifyUser setShowModifyRodal={setShowModifyRodal} setUsername={setUsername} setImage={setImage} username={username} image={image}/>
            </Rodal>


            <button className="delete-btn" onClick={() => setShowDeleteRodal(true)}>Delete profile</button>
            <Rodal visible={showDeleteRodal} animation="fade" width={350} height={230} onClose={() => setShowDeleteRodal(false)}>
                <p>If you delete your user, all your data will also be deleted and you won't have access to premium features.</p>
                <p>Are you sure you want to delete your user profile?</p>
                <button className="delete-btn" onClick={(e) => {handleUserSubmit(e, user._id)}}>Delete my user</button>
                <button onClick={(e) => setShowDeleteRodal(false)}>Cancel</button>
            </Rodal>

          </div>
        </div>
        </>
        : null

    )
}

export default UserCard 