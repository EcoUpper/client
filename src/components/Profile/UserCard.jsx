// import { AuthContext } from "../../context/auth.context"
// import { useContext } from "react"

// function UserCard (props) {

//     const { user } = useContext(AuthContext)
//     const {userParam} = props

//     function handleUserSubmit(e, userId) {
//         e.preventDefault()

//         const deleteUserUrl = process.env.REACT_APP_SERVER_URL + "/db/users/" + userId

//         fetch(deleteUserUrl, {
//             method: "DELETE"
//         })
//             .then((res) => {
//                 res.json()

//                 navigate(`/profile/${userId}`)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })

//     }

//     return (
//         <>

//         {user._id == userParam._id ?
//         <div>
//           <div className="profile-details">
//             <h2>My Details</h2>
//             <img src={userParam.image_url} alt={userParam.username} className="profile-img" />
//             <h3>{userParam.username}</h3>
//             <p>{userParam.email}</p>
//           </div>
//           <div>
//             <button>Modify profile</button>
//             <button>Delete profile</button>
//           </div>
//         </div>
//           : null
//         }
//         </>
//     )
// }

// export default UserCard 