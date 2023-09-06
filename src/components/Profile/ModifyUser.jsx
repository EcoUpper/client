import { useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import uploadImage from "../../services/file-upload.service"

function ModifyUser(props) {

    const { user } = useContext(AuthContext)
    const { userId } = useParams();

    const [userInfo, setUserInfo] = useState(user)
    const [username, setUsername] = useState(user.username)
    const [image, setImage] = useState(user.image_url)

    const navigate = useNavigate()


    function handleFileUpload(e) {
        const formData = new FormData()
        formData.append("image_url", e.target.files[0])

        uploadImage(formData)
            .then((res) => {
                setImage(res.image_url)
            })
            .catch(err => console.log(err))
    }


    function handleUserChange(e, userId) {
        e.preventDefault();

        const modifyUserUrl = process.env.REACT_APP_SERVER_URL + "/db/users/" + userId;

        const body = {
            username: username,
            image_url: image
        }

        fetch(modifyUserUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((updatedUser) => {
                console.log(updatedUser)

                navigate(`/profile/${userId}`)
            })
            .catch((err) => {
                console.log(err);
            });
    }

   

    return (
        <>
            <div className="modifyForm">
                <form className="formContainer" onSubmit={handleUserChange} >

                    <div className="innerForm">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="innerForm">
                        <label>Image</label>
                        <input className="imgInput" type="file" onChange={(e) => handleFileUpload(e)} />
                    </div>

                    <button type="submit">Modify item</button>
                </form>
            </div>
        </>
    )
}

export default ModifyUser