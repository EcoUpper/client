import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import uploadImage from "../../services/file-upload.service"
import "./ModifyUser.css"

function ModifyUser(props) {

    const { user } = useContext(AuthContext)
    const { setShowModifyRodal, setUsername, setImage, username, image } = props

    
    const userId = user._id
    const navigate = useNavigate()

    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/users/" + userId;

    function fetchUserInfo() {
        fetch(apiUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log("HERE", data)
                setUsername(data.username)
                setImage(data.image_url)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchUserInfo()
    }, [user])

    function handleFileUpload(e) {
        const formData = new FormData()
        formData.append("image_url", e.target.files[0])

        uploadImage(formData)
            .then((res) => {
                setImage(res.image_url)
            })
            .catch(err => console.log(err))
    }


    function handleUserChange(e) {
        e.preventDefault();
        console.log(userId)
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
                console.log("UPDATED USER", updatedUser)

                fetchUserInfo()
                setShowModifyRodal(false)
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
                    <div>
                    <button id="modif-btn" type="submit">Modify item</button>
                    <button onClick={(e) => setShowModifyRodal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ModifyUser